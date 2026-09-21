import { Router, type IRouter } from "express";
import {
  askCopilot,
  getAsset,
  getAssetRiskList,
  getAssets,
  getBusinessUnitRisk,
  getCompliance,
  getComplianceFramework,
  getControl,
  getControls,
  getEnterpriseRisk,
  getIncidents,
  getNotifications,
  getOverview,
  getRiskDrivers,
  getRiskTrends,
  getServiceRisk,
  getThreats,
  getVulnerabilities,
  getVulnerability,
  ingestEvent,
  optimizeBudget,
  simulateScenario,
} from "../services/threat-quotient";

const router: IRouter = Router();

router.get("/overview", (_req, res) => res.json(getOverview()));
router.get("/risk/enterprise", (_req, res) => res.json(getEnterpriseRisk()));
router.get("/risk/business-units", (_req, res) => res.json(getBusinessUnitRisk()));
router.get("/risk/services", (_req, res) => res.json(getServiceRisk()));
router.get("/risk/assets", (req, res) =>
  res.json(
    getAssetRiskList({
      businessUnit: typeof req.query.businessUnit === "string" ? req.query.businessUnit : undefined,
      severity: typeof req.query.severity === "string" ? req.query.severity : undefined,
    }),
  ),
);
router.get("/risk/drivers", (_req, res) => res.json(getRiskDrivers()));
router.get("/risk/trends", (_req, res) => res.json(getRiskTrends()));
router.get("/assets", (_req, res) => res.json(getAssets()));
router.get("/assets/:id", (req, res) => {
  const result = getAsset(req.params.id);
  return result ? res.json(result) : res.status(404).json({ error: "Asset not found" });
});
router.get("/vulnerabilities", (_req, res) => res.json(getVulnerabilities()));
router.get("/vulnerabilities/:id", (req, res) => {
  const result = getVulnerability(req.params.id);
  return result ? res.json(result) : res.status(404).json({ error: "Vulnerability not found" });
});
router.get("/controls", (_req, res) => res.json(getControls()));
router.get("/controls/:id", (req, res) => {
  const result = getControl(req.params.id);
  return result ? res.json(result) : res.status(404).json({ error: "Control not found" });
});
router.get("/incidents", (_req, res) => res.json(getIncidents()));
router.get("/threats", (_req, res) => res.json(getThreats()));
router.post("/scenarios/simulate", (req, res) => res.json(simulateScenario(req.body)));
router.post("/optimization", (req, res) => {
  const budget = Number(req.body?.budget);
  if (!Number.isFinite(budget) || budget < 0) return res.status(400).json({ error: "Budget must be a non-negative number" });
  return res.json(optimizeBudget(budget));
});
router.get("/compliance", (_req, res) => res.json(getCompliance()));
router.get("/compliance/:framework", (req, res) => {
  const result = getComplianceFramework(req.params.framework);
  return result ? res.json(result) : res.status(404).json({ error: "Framework not found" });
});
router.post("/ingest/event", (req, res) => res.json(ingestEvent(req.body)));
router.post("/copilot/query", (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (!question) return res.status(400).json({ error: "Question is required" });
  return res.json(askCopilot(question));
});
router.get("/notifications", (_req, res) => res.json(getNotifications()));

export default router;