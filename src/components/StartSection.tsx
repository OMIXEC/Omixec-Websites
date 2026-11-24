import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface StartSectionProps {
  selectedPlan: string;
  onSelectPlan: (planName: string) => void;
}

const TIMELINE = [
  {
    step: 'Day 1',
    title: 'Connect systems & record one workflow',
    desc: 'Authorize scoped connectors and capture a single operator walkthrough.',
  },
  {
    step: 'Day 2',
    title: 'Verify accuracy in shadow mode',
    desc: 'Replay the agent graph against 500 historical tickets or invoices with zero side effects.',
  },
  {
    step: 'Day 3',
    title: 'Enable supervised production',
    desc: 'Turn on autonomous execution with Slack approval routing for edge exceptions.',
  },
];

export function StartSection({ selectedPlan, onSelectPlan }: StartSectionProps) {
  const [email, setEmail] = useState('');
  const [teamSize, setTeamSize] = useState('25-100');
  const [workflow, setWorkflow] = useState('Finance & AP reconciliation');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!validEmail) {
      setError('Please enter a valid work email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="start" className="site-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <div className="section-header !mb-8">
            <p className="section-kicker">Start for Free</p>
            <h2 className="section-title">
              Launch your first <span className="serif-italic">operational</span> agent today.
            </h2>
            <p className="section-lede">
              Provision an isolated Aion.ai workspace in minutes or book a guided architecture session with an operations engineer.
            </p>
          </div>

          <div className="space-y-6 border-t border-white/10 pt-7">
            {TIMELINE.map((item) => (
              <div key={item.step} className="grid grid-cols-[64px_1fr] gap-4 items-baseline">
                <span className="text-[13px] font-medium text-[#d8d8d8] tabular-nums">{item.step}</span>
                <div>
                  <h3 className="text-[15px] font-medium text-white tracking-[-0.015em]">{item.title}</h3>
                  <p className="text-[14px] text-[#9a9a9a] mt-1 leading-[1.55]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[13.5px] text-[#9a9a9a]">
            Direct engineering inquiries:{' '}
            <a href="mailto:ops@aion.ai" className="text-white underline underline-offset-4 hover:text-[#d8d8d8]">
              ops@aion.ai
            </a>
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="surface-card !p-7 md:!p-9">
            {submitted ? (
              <div className="py-8">
                <CheckCircle2 className="w-8 h-8 text-white mb-4" />
                <h3 className="text-[22px] font-medium tracking-[-0.03em] text-white mb-2">
                  Workspace request confirmed
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-[#9a9a9a] max-w-[480px] mb-6">
                  We have prepared your <span className="text-white">{selectedPlan}</span> provisioning link for{' '}
                  <span className="text-white">{email}</span> focused on{' '}
                  <span className="text-white">{workflow}</span>.
                </p>
                <div className="rounded-[8px] border border-white/10 bg-black/50 p-4 mb-6 text-[13px] text-[#d8d8d8] space-y-1.5 tabular-nums">
                  <div>Plan tier: {selectedPlan}</div>
                  <div>Team size: {teamSize} operators</div>
                  <div>Environment: Isolated sandbox + shadow trace replay</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                    setNotes('');
                  }}
                  className="btn btn-ghost"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <span className="text-[14px] font-medium text-white">Provision Workspace</span>
                  <div className="flex items-center gap-1.5">
                    {(['Starter', 'Operations', 'Enterprise'] as const).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => onSelectPlan(tier)}
                        className={`px-2.5 py-1 text-[12px] rounded-[5px] border transition-colors cursor-pointer ${
                          selectedPlan === tier
                            ? 'bg-white text-[#111111] border-white font-medium'
                            : 'bg-transparent text-[#9a9a9a] border-white/15 hover:text-white'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="work-email" className="block text-[13px] font-medium text-[#d8d8d8] mb-2">
                    Work email
                  </label>
                  <input
                    id="work-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="alex@company.com"
                    className="w-full h-11 px-3.5 rounded-[6px] bg-black/70 border border-white/15 text-[14.5px] text-white placeholder:text-[#666666] focus:border-white/50 transition-colors"
                  />
                  {error && <p className="mt-2 text-[13px] text-[#f87171]">{error}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="team-size" className="block text-[13px] font-medium text-[#d8d8d8] mb-2">
                      Operations team size
                    </label>
                    <select
                      id="team-size"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-[6px] bg-black/70 border border-white/15 text-[14.5px] text-white focus:border-white/50 transition-colors"
                    >
                      <option value="1-24">1–24 operators</option>
                      <option value="25-100">25–100 operators</option>
                      <option value="100-500">100–500 operators</option>
                      <option value="500+">500+ operators</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="primary-workflow" className="block text-[13px] font-medium text-[#d8d8d8] mb-2">
                      Primary workflow
                    </label>
                    <select
                      id="primary-workflow"
                      value={workflow}
                      onChange={(e) => setWorkflow(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-[6px] bg-black/70 border border-white/15 text-[14.5px] text-white focus:border-white/50 transition-colors"
                    >
                      <option value="Finance & AP reconciliation">Finance & AP reconciliation</option>
                      <option value="Customer & enterprise triage">Customer & enterprise triage</option>
                      <option value="Vendor onboarding & compliance">Vendor onboarding & compliance</option>
                      <option value="Logistics & supply chain ops">Logistics & supply chain ops</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="workflow-notes" className="block text-[13px] font-medium text-[#d8d8d8] mb-2">
                    Target systems (optional)
                  </label>
                  <textarea
                    id="workflow-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. NetSuite, Zendesk, Slack approval channels..."
                    className="w-full p-3.5 rounded-[6px] bg-black/70 border border-white/15 text-[14.5px] text-white placeholder:text-[#666666] focus:border-white/50 transition-colors resize-none"
                  />
                </div>

                <button type="submit" className="btn btn-solid w-full !h-[46px]">
                  Create Aion.ai Workspace
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
