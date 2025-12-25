import { GoogleGenAI, Type } from "@google/genai";
import { CaseData, PolicySnippet, RuleMatch, ComplianceCheckResult } from '../types';
import { POLICY_KNOWLEDGE_BASE, SYSTEM_PROMPT_MAGIC_BOOK, SYSTEM_PROMPT_MISTAKE_STOPPER } from '../constants';

const apiKey = process.env.API_KEY || '';

// Initialize client safely (avoiding crash if key is missing during initial render, handled in call)
const getClient = () => {
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

// MODE 1: Magic Rule Book - Proactive Retrieval
export const analyzeCaseRules = async (caseData: CaseData): Promise<RuleMatch[]> => {
  try {
    const ai = getClient();
    
    // In a real app, we would use vector search here to get the top K snippets.
    // For this MVP, we send the "Knowledge Base" to the context window (small enough).
    const contextPrompt = `
      CASE DETAILS:
      ${JSON.stringify(caseData, null, 2)}

      AVAILABLE POLICY SNIPPETS:
      ${JSON.stringify(POLICY_KNOWLEDGE_BASE, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contextPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT_MAGIC_BOOK,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              ruleId: { type: Type.STRING },
              title: { type: Type.STRING },
              explanation: { type: Type.STRING },
              sourceId: { type: Type.STRING },
              severity: { type: Type.STRING, enum: ["CRITICAL", "WARNING", "INFO"] }
            },
            required: ["ruleId", "title", "explanation", "sourceId", "severity"]
          }
        }
      }
    });

    const rawRules = JSON.parse(response.text || "[]");

    // Hydrate the response with the full source object for the UI
    const hydratedRules: RuleMatch[] = rawRules.map((r: any) => {
      const source = POLICY_KNOWLEDGE_BASE.find(p => p.id === r.sourceId);
      if (!source) return null;
      return {
        ...r,
        source
      };
    }).filter(Boolean);

    return hydratedRules;

  } catch (error) {
    console.error("Magic Rule Book Error:", error);
    return [];
  }
};

// MODE 2: Mistake Stopper - Action Validation
export const validateAction = async (
  action: string, 
  caseData: CaseData, 
  activeRules: RuleMatch[]
): Promise<ComplianceCheckResult> => {
  try {
    const ai = getClient();

    const contextPrompt = `
      CASE DETAILS:
      ${JSON.stringify(caseData, null, 2)}

      INTENDED ACTION:
      "${action}"

      ACTIVE RULES IDENTIFIED:
      ${JSON.stringify(activeRules, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contextPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT_MISTAKE_STOPPER,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            allowed: { type: Type.BOOLEAN },
            reason: { type: Type.STRING },
            violationRuleId: { type: Type.STRING, nullable: true }
          },
          required: ["allowed", "reason"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    // If there is a violation ID, find the rule object to pass back
    let violationRule: RuleMatch | undefined;
    if (result.violationRuleId) {
      violationRule = activeRules.find(r => r.ruleId === result.violationRuleId);
    }

    return {
      allowed: result.allowed,
      reason: result.reason,
      violation: violationRule
    };

  } catch (error) {
    console.error("Mistake Stopper Error:", error);
    // Fail safe: If AI is down, prompt manual review, don't auto-allow blindly.
    return {
      allowed: false,
      reason: "System error during compliance check. Manual review required."
    };
  }
};