import { useEffect, useState } from 'react';
import { Check, Play, RotateCcw, ShieldCheck } from 'lucide-react';

interface TraceStep {
  label: string;
  system: string;
  durationMs: number;
  detail: string;
  policyResult: string;
}

interface Scenario {
  id: string;
  title: string;
  trigger: string;
  summary: string;
  steps: TraceStep[];
  outcome: string;
}

const PROCESS_STEPS = [
  {
    number: '01.',
    title: 'Observe & Map',
    description:
      'Capture a live walkthrough once across browser tools, ERP screens, and inbox queues. Aion extracts decision branches and field schemas automatically.',
  },
  {
    number: '02.',
    title: 'Bind Policies & Tools',
    description:
      'Attach typed API connectors, spend limits, and confidence thresholds. Every write operation is validated against your schema before execution.',
  },
  {
    number: '03.',
    title: 'Deploy & Audit',
    description:
      'Run in shadow mode against historical queues, promote to autonomous execution, and review full step-by-step traces with instant rollback.',
  },
];

const SCENARIOS: Scenario[] = [
  {
    id: 'invoice',
    title: 'Invoice Reconciliation',
    trigger: 'Trigger: PDF invoice received in AP inbox',
    summary: 'Matches carrier freight bills against NetSuite POs and flags rate discrepancies above 2%.',
    steps: [
      {
        label: 'Extract line items & carrier reference',
        system: 'Document Parser',
        durationMs: 210,
        detail: 'Parsed PO-48291 · 14 line items · Total $18,420.00',
        policyResult: 'Schema valid',
      },
      {
        label: 'Cross-check purchase order & BOL weight',
        system: 'NetSuite ERP',
        durationMs: 340,
        detail: 'PO balance $18,420.00 · Variance 0.00% (within 2.0% tolerance)',
        policyResult: 'Tolerance passed',
      },
      {
        label: 'Schedule ACH settlement batch',
        system: 'Treasury API',
        durationMs: 185,
        detail: 'Queued payment batch #2026-11-24B · Amount below $25k auto-cap',
        policyResult: 'Approved autonomously',
      },
    ],
    outcome: 'Reconciled in 735 ms without human intervention.',
  },
  {
    id: 'triage',
    title: 'Enterprise Ticket Triage',
    trigger: 'Trigger: Priority webhook from Zendesk queue',
    summary: 'Classifies billing and provisioning incidents, queries account telemetry, and drafts verified resolutions.',
    steps: [
      {
        label: 'Inspect workspace entitlement & SSO logs',
        system: 'Auth Directory',
        durationMs: 165,
        detail: 'Detected expired SAML cert on tenant acme-eu-west · 42 affected seats',
        policyResult: 'Read scope verified',
      },
      {
        label: 'Generate renewal certificate payload',
        system: 'Provisioner',
        durationMs: 290,
        detail: 'Prepared rotation draft · Requires customer admin confirmation',
        policyResult: 'Guarded action',
      },
      {
        label: 'Route one-click approval to on-call lead',
        system: 'Slack Escalation',
        durationMs: 140,
        detail: 'Dispatched summary card to #ops-escalations with pre-filled response',
        policyResult: 'Human checkpoint',
      },
    ],
    outcome: 'Triaged & pre-staged in 595 ms; awaiting 1-click sign-off.',
  },
  {
    id: 'vendor',
    title: 'Vendor Security Onboarding',
    trigger: 'Trigger: Procurement request submitted in Rippling',
    summary: 'Verifies SOC 2 attestation dates, runs sanctions screening, and provisions scoped vendor records.',
    steps: [
      {
        label: 'Validate SOC 2 Type II report & bridge letter',
        system: 'Compliance Vault',
        durationMs: 260,
        detail: 'Period valid through 2027-03-31 · Zero qualified exceptions found',
        policyResult: 'Control verified',
      },
      {
        label: 'Verify tax W-9 & banking micro-deposit',
        system: 'OFAC & TIN Check',
        durationMs: 310,
        detail: 'EIN matched IRS registry · Bank routing verified via Plaid',
        policyResult: 'Cleared',
      },
      {
        label: 'Create active vendor profile & PO limit',
        system: 'Coupa Procurement',
        durationMs: 195,
        detail: 'Vendor ID VND-9034 created · Net-30 terms locked',
        policyResult: 'Committed',
      },
    ],
    outcome: 'Vendor onboarded in 765 ms with immutable audit trail.',
  },
];

export function WorkflowDemo() {
  const [activeProcess, setActiveProcess] = useState(0);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIOS[0].id);
  const [completedSteps, setCompletedSteps] = useState<number>(SCENARIOS[0].steps.length);
  const [isRunning, setIsRunning] = useState(false);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) ?? SCENARIOS[0];

  useEffect(() => {
    if (!isRunning) return;
    if (completedSteps >= scenario.steps.length) {
      setIsRunning(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setCompletedSteps((prev) => prev + 1);
    }, 420);
    return () => window.clearTimeout(timer);
  }, [isRunning, completedSteps, scenario.steps.length]);

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setIsRunning(false);
    const next = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
    setCompletedSteps(next.steps.length);
  };

  const handleRunTrace = () => {
    setCompletedSteps(0);
    setIsRunning(true);
  };

  return (
    <section id="how-it-works" className="site-section">
      <div className="section-header">
        <p className="section-kicker">Workflow Architecture</p>
        <h2 className="section-title">
          From recording to <span className="serif-italic">production</span> in three steps.
        </h2>
        <p className="section-lede">
          Aion replaces brittle browser scripts with typed agent graphs that respect spending caps, schemas, and human approval checkpoints.
        </p>
      </div>

      {/* 3-Step Interactive Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {PROCESS_STEPS.map((step, idx) => {
          const isActive = activeProcess === idx;
          return (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveProcess(idx)}
              className={`text-left rounded-[10px] p-7 border transition-colors cursor-pointer ${
                isActive
                  ? 'bg-white/[0.06] border-white/30'
                  : 'bg-white/[0.015] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-xs font-medium text-[#9a9a9a] tabular-nums mb-3">{step.number}</div>
              <h3 className="text-[19px] font-medium tracking-[-0.025em] text-white mb-2.5">{step.title}</h3>
              <p className="text-[14.5px] leading-[1.6] text-[#9a9a9a]">{step.description}</p>
            </button>
          );
        })}
      </div>

      {/* Interactive Live Execution Preview (#demo) */}
      <div
        id="demo"
        className="scroll-mt-24 rounded-[12px] border border-white/15 bg-[#070707] overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div>
            <h3 className="text-[16px] font-medium tracking-[-0.02em] text-white">
              Interactive Execution Trace
            </h3>
            <p className="text-[13.5px] text-[#9a9a9a] mt-0.5">{scenario.trigger}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {SCENARIOS.map((item) => {
              const selected = item.id === scenario.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectScenario(item.id)}
                  className={`px-3.5 py-2 text-[13px] font-medium rounded-[6px] border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selected
                      ? 'bg-white text-[#111111] border-white'
                      : 'bg-white/[0.03] text-[#d8d8d8] border-white/15 hover:border-white/30'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleRunTrace}
              disabled={isRunning}
              className="btn btn-ghost ml-1 !h-[36px] !px-4 !text-[13px] disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Run Sample Trace
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-[14.5px] text-[#b8b8b8] mb-6">{scenario.summary}</p>

          <div className="space-y-3">
            {scenario.steps.map((step, idx) => {
              const visible = idx < completedSteps;
              const runningNow = isRunning && idx === completedSteps;
              return (
                <div
                  key={step.label}
                  className={`flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-[8px] px-5 py-4 border transition-all duration-300 ${
                    visible
                      ? 'bg-white/[0.035] border-white/20 opacity-100'
                      : runningNow
                        ? 'bg-white/[0.02] border-white/30 opacity-85'
                        : 'bg-white/[0.01] border-white/[0.06] opacity-40'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border text-[11px] tabular-nums ${
                        visible
                          ? 'bg-white text-[#111111] border-white'
                          : 'bg-transparent text-[#9a9a9a] border-white/20'
                      }`}
                    >
                      {visible ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <div>
                      <div className="text-[14.5px] font-medium text-white tracking-[-0.01em]">
                        {step.label}
                      </div>
                      <div className="text-[13px] text-[#9a9a9a] mt-1">{step.detail}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pl-9 md:pl-0 shrink-0 text-[12.5px] tabular-nums">
                    <span className="text-[#9a9a9a]">{step.system}</span>
                    <span className="text-[#d8d8d8] inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-white/75" />
                      {step.policyResult}
                    </span>
                    <span className="text-[#9a9a9a] min-w-[52px] text-right">{step.durationMs} ms</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13.5px]">
            <span className="text-[#d8d8d8]">
              {completedSteps >= scenario.steps.length
                ? scenario.outcome
                : 'Executing deterministic policy graph...'}
            </span>
            <span className="text-[#9a9a9a] tabular-nums">
              {completedSteps} / {scenario.steps.length} steps verified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
