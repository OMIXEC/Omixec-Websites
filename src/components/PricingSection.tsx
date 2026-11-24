import { useState } from 'react';
import { Check } from 'lucide-react';

export interface PlanOption {
  id: string;
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}

const PLANS: PlanOption[] = [
  {
    id: 'Starter',
    name: 'Starter',
    monthlyPrice: '$0',
    annualPrice: '$0',
    description: 'For operations teams validating their first automated workflows in sandbox and staging.',
    features: [
      'Up to 2,500 workflow runs per month',
      '3 active operational agents',
      'Slack, Gmail, and webhook triggers',
      '7-day immutable execution trace logs',
    ],
    ctaLabel: 'Start with Starter',
  },
  {
    id: 'Operations',
    name: 'Operations',
    monthlyPrice: '$590',
    annualPrice: '$490',
    description: 'For scaling teams running production finance, support, and procurement pipelines.',
    features: [
      'Up to 50,000 workflow runs per month',
      'Unlimited operational agents & branches',
      'Human-in-the-loop approval queues',
      'NetSuite, Salesforce, Rippling & Jira connectors',
      '90-day SOC 2 audit log retention',
    ],
    highlighted: true,
    ctaLabel: 'Choose Operations',
  },
  {
    id: 'Enterprise',
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    description: 'Dedicated infrastructure, private model endpoints, and custom compliance guarantees.',
    features: [
      'Unlimited runs & dedicated VPC runner',
      'SAML SSO, SCIM, and granular RBAC',
      'Custom SLA with 15-minute response',
      'Forward-deployed workflow engineers',
      'Zero-retention model inference guarantees',
    ],
    ctaLabel: 'Request Enterprise Access',
  },
];

interface PricingSectionProps {
  selectedPlan: string;
  onSelectPlan: (planName: string) => void;
}

export function PricingSection({ selectedPlan, onSelectPlan }: PricingSectionProps) {
  const [annual, setAnnual] = useState(true);

  const handlePickPlan = (planName: string) => {
    onSelectPlan(planName);
    const startEl = document.getElementById('start');
    if (startEl) {
      startEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="site-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="section-header !mb-0">
          <p className="section-kicker">Pricing</p>
          <h2 className="section-title">
            Predictable pricing scaled to <span className="serif-italic">executed</span> workflows.
          </h2>
          <p className="section-lede">
            Start free in shadow mode. Upgrade only when your agents move into production queues.
          </p>
        </div>

        <div
          className="inline-flex items-center p-1 rounded-[8px] border border-white/15 bg-white/[0.03] self-start"
          role="group"
          aria-label="Billing interval"
        >
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 text-[13px] font-medium rounded-[6px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              !annual ? 'bg-white text-[#111111]' : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 text-[13px] font-medium rounded-[6px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              annual ? 'bg-white text-[#111111]' : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            Annual (Save 17%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {PLANS.map((plan) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice;
          const isCustom = price === 'Custom';
          const isChosen = selectedPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-[10px] p-8 flex flex-col justify-between border transition-colors ${
                plan.highlighted
                  ? 'bg-white/[0.045] border-white/30'
                  : 'bg-white/[0.015] border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="text-[18px] font-medium tracking-[-0.02em] text-white">{plan.name}</h3>
                  {plan.highlighted && (
                    <span className="text-[12px] text-[#d8d8d8]">Most deployed</span>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-[38px] font-medium tracking-[-0.04em] text-white tabular-nums">
                    {price}
                  </span>
                  {!isCustom && (
                    <span className="text-[13.5px] text-[#9a9a9a]">
                      / month{annual && price !== '$0' ? ' billed annually' : ''}
                    </span>
                  )}
                </div>

                <p className="text-[14px] leading-[1.6] text-[#9a9a9a] mb-7">{plan.description}</p>

                <ul className="space-y-3 mb-8 border-t border-white/10 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[14px] text-[#d8d8d8]">
                      <Check className="w-4 h-4 text-white/80 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handlePickPlan(plan.id)}
                className={`btn w-full ${plan.highlighted || isChosen ? 'btn-solid' : 'btn-ghost'}`}
              >
                {isChosen ? `Selected: ${plan.name}` : plan.ctaLabel}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
