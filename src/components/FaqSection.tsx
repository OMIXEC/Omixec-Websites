import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How does Aion.ai learn an existing operational workflow?',
    a: 'Your operators perform the task once with our desktop or browser recorder while Aion observes API requests, form validations, and decision rules. Within minutes, Aion compiles those actions into a deterministic state graph you can inspect and test before enabling live execution.',
  },
  {
    q: 'What happens when an agent encounters an ambiguous edge case?',
    a: 'Every step runs under strict confidence and policy thresholds. If an invoice variance exceeds your tolerance or an unfamiliar exception occurs, the agent pauses cleanly and sends a structured Slack or Teams approval card with full context so an operator can resolve it in one click.',
  },
  {
    q: 'Which tools, ERPs, and internal APIs are supported?',
    a: 'Aion ships with native connectors for NetSuite, SAP, Salesforce, Zendesk, Rippling, Coupa, Jira, Slack, Google Workspace, and Postgres. Any internal REST or GraphQL endpoint can also be bound via an OpenAPI spec in under five minutes.',
  },
  {
    q: 'How are data privacy, SOC 2, and tool permissions enforced?',
    a: 'Agents operate with scoped OAuth tokens and explicit read/write allowlists. Every tool call is validated against a typed JSON schema prior to execution, logged with immutable cryptographic timestamps, and covered by our SOC 2 Type II and ISO 27001 controls.',
  },
  {
    q: 'Can we run Aion.ai inside our own VPC?',
    a: 'Yes. Enterprise customers can deploy the Aion execution runner inside AWS, GCP, or Azure VPCs so sensitive payloads and credentials never leave your network perimeter, while keeping zero data retention on inference calls.',
  },
  {
    q: 'How long does onboarding take for a typical operations team?',
    a: 'Most teams record and validate their first workflow in shadow mode on day one, verify accuracy against historical queues on day two, and promote to supervised production by day three.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="site-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="section-header !mb-0">
            <p className="section-kicker">FAQs</p>
            <h2 className="section-title">
              Questions teams ask before <span className="serif-italic">deploying</span> to production.
            </h2>
            <p className="section-lede">
              Clear answers on determinism, permission boundaries, and enterprise deployment.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            return (
              <div key={item.q}>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-6 flex items-center justify-between gap-6 text-left cursor-pointer group"
                >
                  <span className="text-[16px] font-medium tracking-[-0.02em] text-white group-hover:text-[#d8d8d8] transition-colors">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#9a9a9a] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pb-6 pr-8 text-[14.5px] leading-[1.65] text-[#9a9a9a]"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
