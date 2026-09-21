type Severity = "Critical" | "High" | "Moderate" | "Low";

const money = (value: number) => Math.round(value);
const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

const state = {
  eal: 82_000_000,
  eventCount: 12,
  lastUpdated: "2 min ago",
  latestEvent: "Baseline modeled from simulated telemetry",
};

const businessUnits = [
  { id: "payments", name: "Payments", baseEal: 27_500_000, assets: 410, critical: 12 },
  { id: "digital", name: "Digital Banking", baseEal: 18_400_000, assets: 520, critical: 9 },
  { id: "corporate", name: "Corporate Banking", baseEal: 12_600_000, assets: 360, critical: 6 },
  { id: "retail", name: "Retail Banking", baseEal: 9_800_000, assets: 440, critical: 4 },
  { id: "wealth", name: "Wealth Management", baseEal: 7_100_000, assets: 260, critical: 3 },
  { id: "infrastructure", name: "Infrastructure", baseEal: 5_900_000, assets: 390, critical: 2 },
  { id: "security", name: "Security Operations", baseEal: 700_000, assets: 120, critical: 1 },
];

const services = [
  ["payment-processing", "Payment Processing", "Payments", 91, 14_200_000],
  ["internet-banking", "Internet Banking", "Digital Banking", 88, 12_400_000],
  ["mobile-banking", "Mobile Banking", "Digital Banking", 86, 9_600_000],
  ["customer-identity", "Customer Identity", "Digital Banking", 94, 8_800_000],
  ["core-banking", "Core Banking", "Retail Banking", 95, 8_100_000],
  ["transaction-processing", "Transaction Processing", "Payments", 93, 7_900_000],
  ["card-management", "Card Management", "Payments", 89, 6_300_000],
  ["data-warehouse", "Data Warehouse", "Infrastructure", 76, 4_800_000],
].map(([id, name, businessUnit, criticality, eal]) => ({
  id: String(id),
  name: String(name),
  businessUnit: String(businessUnit),
  criticality: Number(criticality),
  eal: Number(eal),
}));

const assetSeeds = [
  ["asset-payment-api", "Payment API Server 01", "Payment Processing", "Payments", "API Server", 96, 7_400_000, 0.187, 68, "Critical", true, "Priya Menon"],
  ["asset-payment-db", "Payment Ledger Database", "Payment Processing", "Payments", "Database", 98, 5_900_000, 0.145, 74, "High", false, "Arjun Rao"],
  ["asset-mobile-gateway", "Mobile Banking Gateway", "Mobile Banking", "Digital Banking", "Gateway", 92, 4_800_000, 0.162, 71, "High", true, "Maya Shah"],
  ["asset-identity", "Customer Identity Provider", "Customer Identity", "Digital Banking", "Identity", 97, 5_200_000, 0.176, 63, "Critical", true, "Neha Kulkarni"],
  ["asset-core-ledger", "Core Banking Ledger", "Core Banking", "Retail Banking", "Mainframe", 99, 4_100_000, 0.113, 81, "High", false, "Vikram Singh"],
  ["asset-card-auth", "Card Authorization Cluster", "Card Management", "Payments", "Cluster", 94, 3_700_000, 0.151, 66, "High", true, "Rohan Kapoor"],
  ["asset-corp-vpn", "Corporate Remote Access", "Corporate Banking", "Corporate Banking", "VPN", 86, 2_600_000, 0.118, 58, "High", true, "Sanjay Iyer"],
  ["asset-data-lake", "Customer Data Lake", "Data Warehouse", "Infrastructure", "Cloud Storage", 90, 3_500_000, 0.096, 79, "Moderate", false, "Ananya Bose"],
  ["asset-wealth-api", "Wealth Advisory API", "Internet Banking", "Wealth Management", "API Server", 84, 2_700_000, 0.084, 76, "Moderate", true, "Karan Bhat"],
  ["asset-soc-siem", "SOC SIEM Cluster", "Security Operations", "Security Operations", "SIEM", 72, 900_000, 0.046, 88, "Low", false, "Nikhil Thomas"],
].map((row) => ({
  id: String(row[0]),
  name: String(row[1]),
  service: String(row[2]),
  businessUnit: String(row[3]),
  assetType: String(row[4]),
  criticality: Number(row[5]),
  eal: Number(row[6]),
  likelihood: Number(row[7]),
  controlEffectiveness: Number(row[8]),
  severity: row[9] as Severity,
  internetExposed: Boolean(row[10]),
  owner: String(row[11]),
}));

const vulnerabilities = [
  ["vuln-001", "CVE-2026-1847", "Apache edge request smuggling", 9.8, "Critical", true, true, 43, 7_200_000, "Overdue", 41],
  ["vuln-002", "CVE-2026-2093", "Identity provider auth bypass", 9.6, "Critical", true, true, 12, 5_800_000, "In remediation", 18],
  ["vuln-003", "CVE-2025-5512", "OpenSSL certificate validation flaw", 8.7, "High", true, false, 78, 4_300_000, "In remediation", 112],
  ["vuln-004", "CVE-2025-7741", "Kubernetes ingress privilege escalation", 8.9, "High", true, false, 31, 2_900_000, "Open", 87],
  ["vuln-005", "CVE-2024-8110", "Legacy Java deserialization issue", 7.8, "High", false, false, 18, 1_100_000, "Open", 384],
  ["vuln-006", "CVE-2026-3320", "Redis unauthenticated command injection", 9.1, "Critical", true, true, 9, 2_600_000, "Open", 7],
  ["vuln-007", "CVE-2025-0912", "Linux kernel use-after-free", 7.2, "High", false, false, 94, 1_500_000, "In remediation", 226],
].map((row) => ({
  id: String(row[0]),
  cve: String(row[1]),
  title: String(row[2]),
  cvss: Number(row[3]),
  severity: row[4] as Severity,
  exploitAvailable: Boolean(row[5]),
  activelyExploited: Boolean(row[6]),
  affectedAssets: Number(row[7]),
  ealContribution: Number(row[8]),
  remediationStatus: String(row[9]),
  ageDays: Number(row[10]),
}));

const controls = [
  ["ctrl-mfa", "Privileged Access MFA", "Identity", 62, 91, 86, 94],
  ["ctrl-edr", "Endpoint Detection & Response", "Detect", 78, 88, 82, 97],
  ["ctrl-seg", "Network Segmentation", "Protect", 55, 84, 79, 89],
  ["ctrl-backup", "Immutable Backups", "Recover", 71, 92, 88, 83],
  ["ctrl-pam", "Privileged Access Management", "Identity", 49, 81, 75, 91],
  ["ctrl-vm", "Vulnerability Management", "Identify", 74, 87, 79, 95],
  ["ctrl-siem", "Security Monitoring", "Detect", 89, 93, 91, 98],
].map((row) => {
  const [id, name, category, coverage, configuration, compliance, telemetry] = row;
  const effectiveness = money((Number(coverage) * Number(configuration) * Number(compliance) * Number(telemetry)) / 1_000_000);
  return {
    id: String(id),
    name: String(name),
    category: String(category),
    coverage: Number(coverage),
    configuration: Number(configuration),
    compliance: Number(compliance),
    telemetry: Number(telemetry),
    effectiveness,
    status: effectiveness >= 75 ? "Strong" : effectiveness >= 55 ? "Needs attention" : "Gap",
  };
});

const actions = [
  { id: "mfa", name: "MFA expansion", category: "Identity", cost: 4_000_000, reduction: 11_000_000, days: 21, description: "Move privileged account MFA coverage from 62% to 100%." },
  { id: "patch", name: "Critical patch campaign", category: "Vulnerability", cost: 2_000_000, reduction: 7_000_000, days: 14, description: "Remediate actively exploited CVEs on internet-facing services." },
  { id: "edr", name: "EDR expansion", category: "Detect", cost: 3_500_000, reduction: 8_000_000, days: 30, description: "Extend high-fidelity endpoint detection to remaining server fleets." },
  { id: "segment", name: "Network segmentation", category: "Protect", cost: 5_500_000, reduction: 15_000_000, days: 45, description: "Isolate payment and identity paths from shared infrastructure." },
  { id: "backup", name: "Immutable backup", category: "Recover", cost: 2_500_000, reduction: 9_000_000, days: 18, description: "Protect core banking recovery points from ransomware tampering." },
  { id: "pam", name: "PAM deployment", category: "Identity", cost: 5_000_000, reduction: 12_000_000, days: 40, description: "Reduce standing privilege and broker privileged sessions." },
  { id: "monitoring", name: "Monitoring uplift", category: "Detect", cost: 1_500_000, reduction: 4_000_000, days: 12, description: "Increase telemetry confidence for cloud and identity events." },
];

const notifications = [
  { id: "n-1", type: "critical", title: "Active exploitation detected", detail: "3 internet-facing assets now carry actively exploited vulnerabilities.", time: "8 min ago" },
  { id: "n-2", type: "high", title: "Privileged access risk increased", detail: "38% of privileged accounts remain outside MFA coverage.", time: "24 min ago" },
  { id: "n-3", type: "opportunity", title: "MFA expansion opportunity", detail: "Modeled EAL reduction of ₹1.1 Cr for a ₹40 L investment.", time: "1 hr ago" },
  { id: "n-4", type: "compliance", title: "Evidence refresh due", detail: "7 NIST controls require evidence refresh this week.", time: "3 hrs ago" },
];

const frameworkSeeds = [
  ["nist", "NIST CSF", "2.0", 84, 4],
  ["cis", "CIS Controls", "v8", 78, 7],
  ["iso", "ISO/IEC 27001", "2022", 81, 5],
  ["rbi", "RBI Cybersecurity", "2024", 74, 9],
  ["sebi", "SEBI Cyber Resilience", "2025", 79, 6],
];

const toCr = (value: number) => `₹${(value / 10_000_000).toFixed(1)} Cr`;
const toLakh = (value: number) => `₹${(value / 100_000).toFixed(0)} L`;

function enterpriseRisk() {
  const delta = state.eal - 82_000_000;
  return {
    eal: money(state.eal),
    var95: money(state.eal * 1.88),
    cvar95: money(state.eal * 2.7),
    likelihood: Number((0.148 + state.eventCount * 0.002).toFixed(3)),
    riskScore: clamp(Math.round(62 + state.eventCount * 0.7)),
    delta: money(delta),
    eventCount: state.eventCount,
  };
}

function riskDrivers() {
  const uplift = state.eal - 82_000_000;
  const drivers = [
    ["privileged-access", "Privileged access exposure", "Identity", 21_000_000, 26, "38% of privileged accounts lack MFA and 14 high-criticality assets retain standing access."],
    ["internet-exposure", "Internet exposure", "Attack surface", 18_000_000, 22, "Three payment and identity services are internet-facing with known exploit paths."],
    ["segmentation", "Network segmentation", "Protect", 14_000_000, 17, "Payment processing still shares a trust zone with two lower-criticality services."],
    ["critical-vulns", "Critical vulnerabilities", "Vulnerability", 12_000_000 + uplift, 15, "Actively exploited CVEs are concentrated on payment and identity infrastructure."],
    ["backup", "Backup resilience", "Recover", 9_000_000, 11, "Immutable recovery coverage is incomplete for core banking workloads."],
    ["third-party", "Third-party dependencies", "Supply chain", 8_000_000, 9, "Two high-revenue services inherit risk from external identity and fraud providers."],
  ];
  return drivers.map(([id, name, category, contribution, share, explanation]) => ({
    id: String(id),
    name: String(name),
    category: String(category),
    contribution: Number(contribution),
    share: Number(share),
    severity: Number(share) >= 20 ? "Critical" : Number(share) >= 15 ? "High" : "Moderate",
    affectedAssets: Number(share) === 26 ? 38 : Number(share) === 22 ? 31 : Number(share) === 17 ? 24 : Number(share) === 15 ? 43 : 18,
    explanation: String(explanation),
  }));
}

function assetRisk(asset: (typeof assetSeeds)[number]) {
  return { ...asset, eal: money(asset.eal + (state.eal - 82_000_000) * (asset.criticality / 700)), likelihood: Number((asset.likelihood + (state.eventCount - 12) * 0.004).toFixed(3)) };
}

function requirementsFor(id: string) {
  const templates = [
    ["PR.AC-01", "Identities and credentials are issued, managed, verified, revoked, and audited", "Privileged Access MFA", "Implemented", "IAM export verified", "2026-09-18", "Coverage is 62% for privileged accounts", "Complete MFA rollout"],
    ["DE.CM-01", "Networks and network services are monitored", "Security Monitoring", "Partially Implemented", "SIEM coverage report", "2026-09-17", "Cloud telemetry has lower confidence", "Extend monitoring uplift"],
    ["PR.DS-01", "Data-at-rest is protected", "Immutable Backups", "Partially Implemented", "Backup control evidence", "2026-09-12", "Core banking recovery points need immutability", "Deploy immutable backup"],
    ["RS.MA-01", "Incident management plan is executed", "Incident Response", "Implemented", "IR tabletop record", "2026-09-11", "No current gap", "Maintain quarterly exercise"],
  ];
  return templates.map(([code, title, control, status, evidence, lastVerified, gap, remediation], index) => ({
    code: `${id.toUpperCase()}-${index + 1}-${code}`,
    title,
    control,
    status,
    evidence,
    lastVerified,
    gap,
    remediation,
  }));
}

export function getOverview() {
  return {
    organization: "NovaBank Financial Services",
    enterprise: enterpriseRisk(),
    criticalAssets: 37,
    controlEffectiveness: 78,
    lastUpdated: state.lastUpdated,
    eventCount: state.eventCount,
  };
}

export function getEnterpriseRisk() {
  return enterpriseRisk();
}

export function getBusinessUnitRisk() {
  return businessUnits.map((unit) => ({
    id: unit.id,
    name: unit.name,
    eal: money(unit.baseEal + (state.eal - 82_000_000) * (unit.baseEal / 82_000_000)),
    riskScore: clamp(Math.round(unit.baseEal / 400_000)),
    assetCount: unit.assets,
    criticalAssets: unit.critical,
    delta: money((state.eal - 82_000_000) * (unit.baseEal / 82_000_000)),
  }));
}

export function getServiceRisk() {
  return services.map((service) => ({
    id: service.id,
    name: service.name,
    businessUnit: service.businessUnit,
    eal: money(service.eal + (state.eal - 82_000_000) * (service.eal / 82_000_000)),
    riskScore: clamp(Math.round(service.criticality * 0.82)),
    criticality: service.criticality,
  }));
}

export function getAssetRiskList(filters?: { businessUnit?: string; severity?: string }) {
  return assetSeeds
    .map(assetRisk)
    .filter((asset) => !filters?.businessUnit || asset.businessUnit === filters.businessUnit)
    .filter((asset) => !filters?.severity || asset.severity === filters.severity)
    .sort((a, b) => b.eal - a.eal);
}

export function getRiskDrivers() {
  return riskDrivers();
}

export function getRiskTrends() {
  const base = [74, 75, 73, 77, 76, 79, 82];
  return base.map((score, index) => ({
    label: `Sep ${15 + index}`,
    eal: money(state.eal - (base.length - 1 - index) * 1_150_000 + (state.eventCount > 12 && index === 6 ? 2_000_000 : 0)),
    riskScore: score + (state.eventCount > 12 && index === 6 ? 4 : 0),
    eventCount: Math.max(2, state.eventCount - (base.length - 1 - index)),
  }));
}

export function getAssets() {
  return getAssetRiskList();
}

export function getAsset(id: string) {
  const asset = assetSeeds.find((item) => item.id === id);
  if (!asset) return undefined;
  const risk = assetRisk(asset);
  return {
    ...risk,
    environment: risk.internetExposed ? "Production / internet-facing" : "Production / private",
    dataSensitivity: risk.criticality >= 90 ? "Restricted customer data" : "Confidential",
    vulnerabilities: vulnerabilities.slice(0, risk.severity === "Critical" ? 3 : 2),
    controls: controls.slice(0, 4),
    dependencies: risk.service === "Payment Processing" ? ["Customer Identity Provider", "Fraud Decisioning", "Core Banking Ledger"] : ["Central IAM", "Security Monitoring"],
    contributions: [
      { label: "Known exploit", value: 8.4, direction: "up" },
      { label: "Internet exposure", value: 6.2, direction: "up" },
      { label: "Asset criticality", value: 5.8, direction: "up" },
      { label: "Weak segmentation", value: 4.7, direction: "up" },
      { label: "Vulnerability age", value: 3.2, direction: "up" },
      { label: "Strong EDR", value: -2.4, direction: "down" },
      { label: "MFA coverage", value: -1.7, direction: "down" },
    ],
    recommendations: [actions[0], actions[1], actions[3]],
  };
}

export function getVulnerabilities() {
  return vulnerabilities;
}

export function getVulnerability(id: string) {
  const vulnerability = vulnerabilities.find((item) => item.id === id);
  if (!vulnerability) return undefined;
  return {
    ...vulnerability,
    affectedServices: vulnerability.id === "vuln-001" ? ["Payment Processing", "Mobile Banking"] : ["Customer Identity", "Internet Banking"],
    affectedBusinessUnits: vulnerability.id === "vuln-001" ? ["Payments", "Digital Banking"] : ["Digital Banking"],
    controls: controls.slice(0, 3),
    recommendation: vulnerability.activelyExploited ? "Patch within 7 days and route residual exposure through compensating WAF rules." : "Include in the next prioritized remediation sprint.",
  };
}

export function getControls() {
  return controls;
}

export function getControl(id: string) {
  return controls.find((control) => control.id === id);
}

export function getIncidents() {
  return [
    { id: "inc-001", type: "Credential stuffing", severity: "High", date: "2026-09-19", asset: "Customer Identity Provider", totalLoss: 1_200_000, status: "Contained" },
    { id: "inc-002", type: "Ransomware simulation", severity: "Moderate", date: "2026-09-16", asset: "Core Banking Ledger", totalLoss: 420_000, status: "Closed" },
    { id: "inc-003", type: "Suspicious privileged login", severity: "High", date: "2026-09-14", asset: "Payment API Server 01", totalLoss: 780_000, status: "Investigating" },
  ];
}

export function getThreats() {
  return [
    { id: "threat-1", name: "FIN12", category: "Ransomware", activityLevel: 86, exploitability: 78, targetSector: "Financial services" },
    { id: "threat-2", name: "Scattered Spider", category: "Identity compromise", activityLevel: 82, exploitability: 74, targetSector: "Financial services" },
    { id: "threat-3", name: "Operation Silverfish", category: "Web exploitation", activityLevel: 69, exploitability: 81, targetSector: "Banking and payments" },
  ];
}

export function simulateScenario(input: { actionIds?: string[]; mfaCoverage?: number; delayDays?: number }) {
  const selected = actions.filter((action) => input.actionIds?.includes(action.id));
  const actionReduction = selected.reduce((sum, action) => sum + action.reduction, 0);
  const mfaAdjustment = input.mfaCoverage !== undefined ? Math.max(0, (input.mfaCoverage - 62) / 38) * 11_000_000 : 0;
  const delayPenalty = (input.delayDays ?? 0) * 120_000;
  const reduction = Math.min(state.eal - 4_000_000, actionReduction + mfaAdjustment - delayPenalty);
  const projectedEal = money(state.eal - Math.max(0, reduction));
  const cost = selected.reduce((sum, action) => sum + action.cost, 0);
  return {
    baselineEal: money(state.eal),
    projectedEal,
    reduction: money(state.eal - projectedEal),
    cost: money(cost),
    rosi: cost > 0 ? Number((((state.eal - projectedEal) / cost) * 100).toFixed(1)) : 0,
    actionIds: selected.map((action) => action.id),
    exposureCurve: [
      { label: "Current", value: state.eal },
      { label: "7 days", value: state.eal + (input.delayDays ? 7 * 120_000 : 0) },
      { label: "15 days", value: state.eal + (input.delayDays ? 15 * 120_000 : 0) },
      { label: "30 days", value: projectedEal },
    ],
  };
}

export function optimizeBudget(budget: number) {
  const eligible = [...actions].sort((a, b) => b.reduction / b.cost - a.reduction / a.cost);
  const chosen: typeof actions = [];
  let totalCost = 0;
  for (const action of eligible) {
    if (totalCost + action.cost <= budget) {
      chosen.push(action);
      totalCost += action.cost;
    }
  }
  const reduction = chosen.reduce((sum, action) => sum + action.reduction, 0);
  return {
    budget,
    totalCost,
    reduction,
    remainingBudget: budget - totalCost,
    actions: chosen,
    curve: [
      { label: "₹0", value: state.eal },
      { label: toLakh(Math.min(budget, budget * 0.25)), value: state.eal - reduction * 0.25 },
      { label: toLakh(Math.min(budget, budget * 0.5)), value: state.eal - reduction * 0.5 },
      { label: toLakh(totalCost), value: state.eal - reduction },
    ],
  };
}

export function getCompliance() {
  return frameworkSeeds.map(([id, name, version, posture, gaps]) => ({
    id: String(id),
    name: String(name),
    version: String(version),
    posture: Number(posture),
    gaps: Number(gaps),
    requirements: requirementsFor(String(id)),
  }));
}

export function getComplianceFramework(id: string) {
  return getCompliance().find((framework) => framework.id === id);
}

export function ingestEvent(input: { type?: string; assetId?: string; severity?: string }) {
  const before = state.eal;
  const increments: Record<string, number> = {
    critical_vulnerability: 5_000_000,
    siem_alert: 1_200_000,
    mfa_change: 2_400_000,
    new_asset: 900_000,
    threat_update: 1_500_000,
    incident: 7_000_000,
    resolve_vulnerability: -4_000_000,
  };
  const increment = increments[input.type ?? "critical_vulnerability"] ?? 1_000_000;
  state.eal = Math.max(45_000_000, state.eal + increment);
  state.eventCount += 1;
  state.lastUpdated = "just now";
  state.latestEvent = input.type ?? "critical_vulnerability";
  const after = state.eal;
  const driver = riskDrivers().find((item) => input.type === "critical_vulnerability" ? item.id === "critical-vulns" : item.id === "privileged-access") ?? riskDrivers()[0];
  return {
    message: increment >= 0 ? "Event ingested. Risk recalculation completed." : "Remediation event ingested. Risk recalculation completed.",
    eventType: input.type ?? "critical_vulnerability",
    ealBefore: before,
    ealAfter: after,
    delta: after - before,
    driver,
    timeline: [
      "Security event detected",
      "Telemetry normalized",
      "Risk recalculation completed",
      `Enterprise EAL ${toCr(before)} → ${toCr(after)}`,
      `${driver.name} is now the leading driver`,
    ],
  };
}

export function getNotifications() {
  return notifications;
}

export function askCopilot(question: string) {
  const normalized = question.toLowerCase();
  const risk = enterpriseRisk();
  const drivers = riskDrivers();
  const optimizer = optimizeBudget(10_000_000);
  if (normalized.includes("board") || normalized.includes("explain")) {
    return {
      answer: `NovaBank currently carries ${toCr(risk.eal)} of modeled Expected Annual Loss. The largest contributor is privileged access exposure at ${toCr(drivers[0].contribution)}, driven by incomplete MFA coverage across critical assets. A ₹1 Cr portfolio focused on MFA, patching, and immutable backup is modeled to reduce exposure by ${toCr(optimizer.reduction)}. This is a decision-support estimate based on simulated telemetry, not a forecast of realized loss.`,
      citations: ["Enterprise EAL", "Privileged access exposure", "₹1 Cr optimization run"],
      tool: "get_enterprise_risk → get_top_risk_drivers → optimize_budget",
    };
  }
  if (normalized.includes("mfa") || normalized.includes("privileged")) {
    return {
      answer: `Privileged access exposure is the largest modeled contributor at ${toCr(drivers[0].contribution)}. Expanding MFA coverage to 100% is modeled to reduce EAL by ₹1.1 Cr for a ₹40 L investment, producing 275% ROSI.`,
      citations: ["Privileged access exposure", "MFA expansion scenario"],
      tool: "get_top_risk_drivers → run_scenario",
    };
  }
  if (normalized.includes("budget") || normalized.includes("priorit")) {
    return {
      answer: `With a ₹1 Cr budget, prioritize ${optimizer.actions.map((action) => action.name).join(", ")}. The selected portfolio invests ${toCr(optimizer.totalCost)} and reduces modeled EAL by ${toCr(optimizer.reduction)}, leaving ${toLakh(optimizer.remainingBudget)} unallocated.`,
      citations: ["Budget optimization", "Modeled EAL reduction", "Remaining budget"],
      tool: "optimize_budget",
    };
  }
  if (normalized.includes("business unit") || normalized.includes("exposure")) {
    const top = getBusinessUnitRisk()[0];
    return {
      answer: `${top.name} carries the highest modeled business-unit exposure at ${toCr(top.eal)}, driven by payment processing concentration and critical internet-facing services.`,
      citations: ["Business unit risk aggregation", "Payment Processing service"],
      tool: "get_business_unit_risk",
    };
  }
  return {
    answer: `The current enterprise view is ${toCr(risk.eal)} modeled EAL, ${toCr(risk.var95)} 95% VaR, and a ${Math.round(risk.likelihood * 100)}% estimated annual incident likelihood. Ask about drivers, MFA, a budget, or the board explanation for a more focused answer.`,
    citations: ["Enterprise risk summary"],
    tool: "get_enterprise_risk",
  };
}