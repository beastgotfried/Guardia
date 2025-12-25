
export enum CaseStatus {
  NEW = 'New',
  IN_REVIEW = 'In Review',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  ESCALATED = 'Escalated'
}

export interface CaseData {
  id: string;
  type: string;
  region: string;
  amount: number;
  currency: string;
  claimant: string;
  dateFiled: string;
  status: CaseStatus;
  description: string;
  riskScore: number; // 0-100
  fraudProbability: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface PolicySnippet {
  id: string;
  documentName: string;
  page: number;
  paragraph: string;
  text: string;
  relevanceScore?: number; // 0-1
}

export interface RuleMatch {
  ruleId: string;
  title: string;
  explanation: string;
  source: PolicySnippet;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface ComplianceCheckResult {
  allowed: boolean;
  reason: string;
  violation?: RuleMatch;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: 'System' | 'AI' | 'Agent' | 'Claimant';
  action: string;
  details?: string;
}
