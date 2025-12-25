
import { CaseData, CaseStatus, PolicySnippet, AuditLogEntry } from './types';

// ------------------------------------------------------------------
// CASE DATABASE - 12 CASES (3 Regions x 4 Risk Levels)
// ------------------------------------------------------------------

export const SCENARIOS_BY_REGION: Record<string, CaseData[]> = {
  "North America": [
    {
      id: "NA-AUTO-101",
      type: "Windshield Replacement",
      region: "Texas, USA",
      amount: 450,
      currency: "USD",
      claimant: "John Smith",
      dateFiled: "2024-06-10",
      status: CaseStatus.NEW,
      description: "Crack in front windshield caused by highway debris. Policy holder used preferred vendor Safelite. Invoice attached.",
      riskScore: 5,
      fraudProbability: 'LOW'
    },
    {
      id: "NA-PROP-205",
      type: "Residential Theft",
      region: "Chicago, IL",
      amount: 4200,
      currency: "USD",
      claimant: "Emily Davis",
      dateFiled: "2024-06-08",
      status: CaseStatus.NEW,
      description: "Burglary of garage. Stolen items: 2 Mountain Bikes, Power Tools. Police Report #CHI-9922 filed and attached.",
      riskScore: 35,
      fraudProbability: 'LOW'
    },
    {
      id: "NA-LIAB-310",
      type: "Slip and Fall",
      region: "New York, NY",
      amount: 45000,
      currency: "USD",
      claimant: "Marcus Johnson",
      dateFiled: "2024-06-05",
      status: CaseStatus.NEW,
      description: "Claimant slipped on wet floor in retail insured premises. Medical bills for fractured wrist attached. CCTV footage requested but not yet received.",
      riskScore: 65,
      fraudProbability: 'MEDIUM'
    },
    {
      id: "NA-COMM-999",
      type: "Commercial Fire",
      region: "Florida, USA",
      amount: 1200000, 
      currency: "USD",
      claimant: "Global Logistics Warehousing",
      dateFiled: "2024-05-30",
      status: CaseStatus.NEW,
      description: "Total loss of Warehouse B due to electrical fire. Claim includes structural rebuilding and inventory loss. Preliminary fire marshal report mentions 'undetermined origin'.",
      riskScore: 92,
      fraudProbability: 'HIGH'
    }
  ],
  "EMEA": [
    {
      id: "EU-TRV-102",
      type: "Train Delay",
      region: "Berlin, Germany",
      amount: 120,
      currency: "EUR",
      claimant: "Hans Weber",
      dateFiled: "2024-06-11",
      status: CaseStatus.NEW,
      description: "ICE train delay > 120 minutes. Automatic compensation request. Ticket verified.",
      riskScore: 2,
      fraudProbability: 'LOW'
    },
    {
      id: "EU-PROP-215",
      type: "Water Damage",
      region: "London, UK",
      amount: 3500,
      currency: "GBP",
      claimant: "Sarah Jenkins",
      dateFiled: "2024-06-09",
      status: CaseStatus.NEW,
      description: "Leaking pipe in upstairs bathroom caused ceiling damage in living room. Plumber invoice and photos of drywall damage included.",
      riskScore: 28,
      fraudProbability: 'LOW'
    },
    {
      id: "EU-AUTO-350",
      type: "Auto Collision",
      region: "Paris, France",
      amount: 15000,
      currency: "EUR",
      claimant: "Jean-Luc Picard",
      dateFiled: "2024-06-07",
      status: CaseStatus.NEW,
      description: "Multi-vehicle pileup on A4. Claimant rear-ended. Dispute over liability with third party. Dashcam footage corrupted.",
      riskScore: 72,
      fraudProbability: 'MEDIUM'
    },
    {
      id: "EU-CYBER-900",
      type: "Corporate Cyber",
      region: "Zurich, Switzerland",
      amount: 5000000,
      currency: "CHF",
      claimant: "FinTech Secure Corp",
      dateFiled: "2024-06-01",
      status: CaseStatus.NEW,
      description: "Ransomware attack affecting customer database. Claim covers ransom demand (unpaid), forensic IT services, and GDPR legal counsel notification costs.",
      riskScore: 95,
      fraudProbability: 'HIGH'
    }
  ],
  "Asia Pacific": [
    {
      id: "AP-GAD-105",
      type: "Gadget Protection",
      region: "Mumbai, India",
      amount: 12500,
      currency: "INR",
      claimant: "Priya Sharma",
      dateFiled: "2024-06-10",
      status: CaseStatus.NEW,
      description: "Screen damage to iPhone 13 due to accidental drop. Photo evidence provided matches IMEI. Device within warranty period.",
      riskScore: 5,
      fraudProbability: 'LOW'
    },
    {
      id: "AP-TRV-220",
      type: "Medical Evacuation",
      region: "Bali, Indonesia",
      amount: 850000,
      currency: "IDR",
      claimant: "Liam O'Connor",
      dateFiled: "2024-06-08",
      status: CaseStatus.NEW,
      description: "Surfing accident requiring stitches. Local clinic bill attached. Standard travel insurance claim.",
      riskScore: 25,
      fraudProbability: 'LOW'
    },
    {
      id: "AP-MED-380",
      type: "Health Insurance",
      region: "Singapore",
      amount: 45000,
      currency: "SGD",
      claimant: "Tan Wei Ming",
      dateFiled: "2024-06-06",
      status: CaseStatus.NEW,
      description: "Elective knee surgery. Bill amount is 20% higher than average network rates. Pre-authorization ref is older than 7 days.",
      riskScore: 68,
      fraudProbability: 'MEDIUM'
    },
    {
      id: "AP-MAR-999",
      type: "Marine Cargo",
      region: "Tokyo, Japan",
      amount: 150000000,
      currency: "JPY",
      claimant: "Oceanic Trade Ltd",
      dateFiled: "2024-05-28",
      status: CaseStatus.NEW,
      description: "Loss of 4 containers overboard during typhoon. Bill of Lading discrepancies found against manifest. High value electronics.",
      riskScore: 98,
      fraudProbability: 'HIGH'
    }
  ]
};

// Flattened list for fallback
export const ALL_SCENARIOS = Object.values(SCENARIOS_BY_REGION).flat();

// ------------------------------------------------------------------
// MOCK AUDIT LOGS
// ------------------------------------------------------------------

export const MOCK_AUDIT_LOGS: Record<string, AuditLogEntry[]> = {
  // NA Cases
  "NA-AUTO-101": [
    { id: "1", timestamp: "10:00 AM", actor: "System", action: "Vendor Verified", details: "Safelite is a Preferred Partner" },
    { id: "2", timestamp: "10:01 AM", actor: "AI", action: "Cost Check", details: "Quote is within regional average ($400-$500)" },
    { id: "3", timestamp: "10:02 AM", actor: "AI", action: "Risk Scored", details: "5/100 (Auto-Approve Eligible)" },
  ],
  "NA-PROP-205": [
    { id: "1", timestamp: "09:15 AM", actor: "System", action: "Police Report", details: "Verified against Chicago PD database" },
    { id: "2", timestamp: "09:20 AM", actor: "AI", action: "Inventory Match", details: "Items listed match policy coverage B" },
  ],
  "NA-LIAB-310": [
    { id: "1", timestamp: "14:00 PM", actor: "System", action: "Policy Check", details: "Premises liability active" },
    { id: "2", timestamp: "14:05 PM", actor: "AI", action: "Missing Evidence", details: "Flagged: CCTV footage not present" },
    { id: "3", timestamp: "14:10 PM", actor: "AI", action: "Risk Scored", details: "65/100 (Manual Review Required)" },
  ],
  "NA-COMM-999": [
    { id: "1", timestamp: "09:00 AM", actor: "System", action: "Limit Alert", details: "Claim exceeds $1M threshold" },
    { id: "2", timestamp: "09:05 AM", actor: "AI", action: "Keyword Alert", details: "Detected 'Undetermined Origin' in report" },
    { id: "3", timestamp: "09:10 AM", actor: "AI", action: "CRITICAL STOP", details: "Mandatory L3 Escalation Triggered" },
  ],

  // EMEA Cases
  "EU-TRV-102": [
    { id: "1", timestamp: "11:20 AM", actor: "System", action: "DB API", details: "Deutsche Bahn confirms delay" },
    { id: "2", timestamp: "11:21 AM", actor: "AI", action: "Auto-Process", details: "Compensation calculated per EU 261/2004" },
  ],
  "EU-PROP-215": [
    { id: "1", timestamp: "08:30 AM", actor: "System", action: "Coverage Check", details: "Water escape included in policy" },
    { id: "2", timestamp: "08:35 AM", actor: "AI", action: "Photo Analysis", details: "Damage consistent with water leak description" },
  ],
  "EU-AUTO-350": [
    { id: "1", timestamp: "16:45 PM", actor: "System", action: "Party Check", details: "3rd Party insurance identified" },
    { id: "2", timestamp: "16:50 PM", actor: "AI", action: "Liability Flag", details: "Contested liability requires adjuster review" },
  ],
  "EU-CYBER-900": [
    { id: "1", timestamp: "02:00 AM", actor: "System", action: "Crisis Mode", details: "Priority 1 Incident Created" },
    { id: "2", timestamp: "02:05 AM", actor: "AI", action: "Policy Limit", details: "Ransom payment excluded from std coverage" },
    { id: "3", timestamp: "02:10 AM", actor: "AI", action: "Escalation", details: "Refer to Cyber Response Unit (L4)" },
  ],

  // APAC Cases
  "AP-GAD-105": [
    { id: "1", timestamp: "10:00 AM", actor: "System", action: "IMEI Verified", details: "Device active on network" },
    { id: "2", timestamp: "10:01 AM", actor: "AI", action: "Image Analysis", details: "Crack detected, consistent with description" },
    { id: "3", timestamp: "10:02 AM", actor: "AI", action: "Risk Scored", details: "5/100 (Eligible for Auto-Approve)" },
  ],
  "AP-TRV-220": [
    { id: "1", timestamp: "13:15 PM", actor: "System", action: "Geo Check", details: "Location matches travel dates" },
    { id: "2", timestamp: "13:20 PM", actor: "AI", action: "Currency Conv", details: "Converted IDR to Policy Base Currency" },
  ],
  "AP-MED-380": [
    { id: "1", timestamp: "09:30 AM", actor: "System", action: "Network Check", details: "Hospital is In-Network Tier 2" },
    { id: "2", timestamp: "09:35 AM", actor: "AI", action: "Cost Analysis", details: "Bill exceeds cohort avg by 20%" },
    { id: "3", timestamp: "09:36 AM", actor: "AI", action: "Flag Raised", details: "Pre-auth expired" },
  ],
  "AP-MAR-999": [
    { id: "1", timestamp: "08:00 AM", actor: "System", action: "Weather Data", details: "Typhoon confirmed in shipping lane" },
    { id: "2", timestamp: "08:05 AM", actor: "AI", action: "Doc Audit", details: "Manifest vs BoL discrepancy detected" },
    { id: "3", timestamp: "08:10 AM", actor: "AI", action: "CRITICAL STOP", details: "Fraud Indicator: Weight mismatch" },
  ]
};

// ------------------------------------------------------------------
// KNOWLEDGE BASE (Policies)
// ------------------------------------------------------------------

export const POLICY_KNOWLEDGE_BASE: PolicySnippet[] = [
  // GLOBAL RISK RULE
  {
    id: "DOC-RISK-GLOBAL",
    documentName: "Enterprise Risk Management Framework",
    page: 1,
    paragraph: "1.0",
    text: "Automated or Level 1 Agent Approval is STRICTLY PROHIBITED for any case where the Risk Score exceeds 10. All cases with Risk Score > 10 must be Escalated for L2/L3 review."
  },
  // GADGET / SMALL CLAIMS
  {
    id: "DOC-GAD-01",
    documentName: "Consumer Electronics Fast-Track",
    page: 3,
    paragraph: "2.1",
    text: "Screen damage claims under $500 (or local equivalent) for verified devices may be auto-approved without manual review if the Fraud Score is LOW (<10)."
  },
  // TRAVEL RULES
  {
    id: "DOC-TRV-05",
    documentName: "Global Travel Compensation Policy",
    page: 12,
    paragraph: "4.3",
    text: "For flight/train delays exceeding 6 hours, reimbursement for reasonable accommodation is permitted. Evidence of delay (carrier certificate) is mandatory."
  },
  // MEDICAL
  {
    id: "DOC-MED-09",
    documentName: "Medical Billing Guidelines",
    page: 22,
    paragraph: "7.B",
    text: "Any procedure billing exceeding the network average by more than 15% requires a manual audit of line items. Pre-authorization validity is strictly 48 hours pre-admission."
  },
  // COMMERCIAL / HIGH VALUE
  {
    id: "DOC-GEN-01",
    documentName: "Global Authority Matrix",
    page: 18,
    paragraph: "12.4",
    text: "For all claims exceeding $100,000 USD (or equivalent), a Level 3 Senior Adjuster review is mandatory prior to approval. Direct approval by Level 1 or Level 2 agents is strictly prohibited."
  },
  {
    id: "DOC-PROP-02",
    documentName: "Fire & Arson Protocols",
    page: 8,
    paragraph: "3.1",
    text: "Claims involving total structure loss or fire reports citing 'undetermined' or 'suspicious' origins must be referred to the Special Investigations Unit (SIU) before any payment."
  },
  {
    id: "DOC-CYBER-01",
    documentName: "Cyber Incident Response Plan",
    page: 5,
    paragraph: "2.2",
    text: "Ransomware payments are excluded from standard coverage unless authorized by the Board. All Cyber claims > $1M must be routed to the Cyber Response Unit immediately."
  }
];

export const SYSTEM_PROMPT_MAGIC_BOOK = `
You are an expert Compliance Officer for an insurance enterprise named "Guardia". 
Your task is to analyze a specific Case and a set of Policy Documents.
Identify which policies are MOST relevant to the case.
You must be strict. Only return policies that directly impact the handling of this specific case based on Amount, Region, and Type.

Return a JSON array of objects with the following schema:
{
  "ruleId": "string (create a short slug)",
  "title": "string (short, action-oriented title)",
  "explanation": "string (one sentence explaining why this applies to this specific case)",
  "sourceId": "string (id from the provided policy snippet)",
  "severity": "CRITICAL" | "WARNING" | "INFO"
}
`;

export const SYSTEM_PROMPT_MISTAKE_STOPPER = `
You are 'Guardia Mistake Stopper' - a fail-safe AI for enterprise workflows.
The user is attempting an ACTION on a CASE.
You have the RELEVANT RULES.

CRITICAL RULE:
If the user attempts to "Approve" and the Case Risk Score is greater than 10, YOU MUST BLOCK THE ACTION.
The only allowed action for Risk Score > 10 is "Escalate" or "Reject".

Determine if the ACTION violates any Rules.

If Violation:
- allowed: false
- reason: A clear, professional explanation of why it is blocked (Cite the Risk Score > 10 rule if applicable).
- violationRuleId: The ID of the rule being violated (Prioritize DOC-RISK-GLOBAL for risk score violations).

If Allowed:
- allowed: true
- reason: "Action is compliant."

Response must be strict JSON.
`;
