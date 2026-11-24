/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type CSSProperties } from 'react';
import { FaqSection } from './components/FaqSection';
import {
  AionLogoMark,
  DownloadTileIcon,
  SparkleIcon,
  TeamAvatarsIcon,
  WorkflowPillIcon,
} from './components/Icons';
import { PricingSection } from './components/PricingSection';
import { StartSection } from './components/StartSection';
import { WorkflowDemo } from './components/WorkflowDemo';

const delay = (seconds: string): CSSProperties => ({ '--d': seconds } as CSSProperties);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Operations');

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const desktopMq = window.matchMedia('(min-width: 901px)');
    const onResize = () => {
      if (desktopMq.matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    if (typeof desktopMq.addEventListener === 'function') {
      desktopMq.addEventListener('change', onResize);
    }
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (typeof desktopMq.removeEventListener === 'function') {
        desktopMq.removeEventListener('change', onResize);
      }
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const appearEls = Array.from(document.querySelectorAll('.appear'));
    const heroPhoto = document.querySelector('.hero-photo');

    const listeners: Array<() => void> = [];
    appearEls.forEach((el) => {
      const handleEnd = () => el.classList.add('is-in');
      el.addEventListener('animationend', handleEnd, { once: true });
      listeners.push(() => el.removeEventListener('animationend', handleEnd));
    });

    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const anyActive = appearEls.some((el) => {
          if (typeof el.getAnimations !== 'function') return false;
          return el.getAnimations().some(
            (anim) => anim.playState === 'running' || anim.playState === 'finished'
          );
        });
        if (!anyActive) {
          appearEls.forEach((el) => el.classList.add('is-in'));
          if (heroPhoto) heroPhoto.classList.add('is-in');
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      listeners.forEach((cleanup) => cleanup());
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <div className="menu-backdrop" aria-hidden="true" onClick={closeMenu} />

      <header className={`header ${isScrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="logo appear appear--scale" style={delay('0.08s')} aria-label="Aion.ai">
          <AionLogoMark />
          <span>
            Aion<span className="logo-suffix">.ai</span>
          </span>
        </a>

        <nav id="site-nav" className="nav" aria-label="Primary">
          <a href="#benefits" className="nav-link appear appear--scale" style={delay('0.16s')} onClick={closeMenu}>
            Benefits
          </a>
          <a href="#how-it-works" className="nav-link appear appear--soft" style={delay('0.28s')} onClick={closeMenu}>
            How It Works
          </a>
          <a href="#faqs" className="nav-link appear appear--scale" style={delay('0.40s')} onClick={closeMenu}>
            FAQs
          </a>
          <a href="#pricing" className="nav-link appear appear--soft" style={delay('0.52s')} onClick={closeMenu}>
            Pricing
          </a>
        </nav>

        <a href="#start" className="btn btn-solid header-cta appear appear--scale" style={delay('0.34s')}>
          Start for Free
        </a>

        <button
          type="button"
          className="burger appear appear--scale"
          style={delay('0.34s')}
          aria-controls="site-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <section className="hero-stage" id="top">
        <div className="hero-photo" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
          />
        </div>

        <div className="header-spacer" aria-hidden="true" />

        <main className="hero">
          <div className="hero-copy">
            <div className="badge appear appear--pop" style={delay('0.22s')}>
              <SparkleIcon />
              <span>Operational AI Infrastructure</span>
            </div>

            <h1>
              <span className="headline-line">
                <span className="headline-inner appear appear--mask" style={delay('0.42s')}>
                  Train <em>AI agents</em> on your
                </span>
              </span>
              <span className="headline-line">
                <span className="headline-inner appear appear--mask" style={delay('0.62s')}>
                  workflows in minutes.
                </span>
              </span>
            </h1>

            <p className="lede appear appear--soft" style={delay('0.82s')}>
              Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.
            </p>

            <div className="hero-actions">
              <a href="#start" className="btn btn-solid appear appear--btn" style={delay('0.96s')}>
                Start for Free
              </a>
              <a href="#demo" className="btn btn-ghost appear appear--side" style={delay('1.10s')}>
                See it in action
              </a>
            </div>
          </div>
        </main>

        <div className="stats" aria-label="Operational metrics">
          <div className="stat appear appear--stat" style={delay('1.12s')}>
            <WorkflowPillIcon />
            <span className="tabular-nums">4.2M+ workflows automated</span>
          </div>

          <div className="stat appear appear--stat" style={delay('1.28s')}>
            <DownloadTileIcon />
            <span className="tabular-nums">92% reduction in manual operations</span>
          </div>

          <div className="stat appear appear--stat" style={delay('1.44s')}>
            <TeamAvatarsIcon />
            <span className="tabular-nums">180+ operational teams onboarded</span>
          </div>
        </div>
      </section>

      <div className="site-sections">
        {/* Benefits & Measured Proof */}
        <section id="benefits" className="site-section">
          <div className="section-header">
            <p className="section-kicker">Operational Capabilities</p>
            <h2 className="section-title">
              Built for teams that cannot afford <span className="serif-italic">fragile</span> automation.
            </h2>
            <p className="section-lede">
              Replace brittle UI scripts and manual spreadsheet handoffs with policy-bound agents that verify every step against your systems of record.
            </p>
          </div>

          <div className="bento-grid">
            <div className="surface-card bento-span-2 flex flex-col justify-between gap-8">
              <div>
                <div className="text-xs font-medium text-[#9a9a9a] tabular-nums mb-3">01.</div>
                <h3 className="text-[22px] font-medium tracking-[-0.03em] text-white mb-3">
                  Deterministic Execution Under Guardrails
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#9a9a9a] max-w-[580px]">
                  Every agent action passes through typed parameter validation, spend caps, and read-before-write assertions. If external state drifts, execution pauses cleanly before any record is mutated.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="text-[26px] font-medium tracking-[-0.03em] text-white tabular-nums">99.94%</div>
                  <div className="text-[13px] text-[#9a9a9a] mt-1">Policy compliance across 4.2M runs</div>
                </div>
                <div>
                  <div className="text-[26px] font-medium tracking-[-0.03em] text-white tabular-nums">&lt; 800 ms</div>
                  <div className="text-[13px] text-[#9a9a9a] mt-1">Median step verification latency</div>
                </div>
                <div>
                  <div className="text-[26px] font-medium tracking-[-0.03em] text-white tabular-nums">100%</div>
                  <div className="text-[13px] text-[#9a9a9a] mt-1">Immutable trace log coverage</div>
                </div>
              </div>
            </div>

            <div className="surface-card flex flex-col justify-between gap-6">
              <div>
                <div className="text-xs font-medium text-[#9a9a9a] tabular-nums mb-3">02.</div>
                <h3 className="text-[20px] font-medium tracking-[-0.025em] text-white mb-3">
                  Zero-Script Workflow Capture
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[#9a9a9a]">
                  Record an operator completing a process once across ERP, email, and internal portals. Aion compiles the recording into a versioned agent graph with reusable branches.
                </p>
              </div>
              <div className="pt-5 border-t border-white/10 text-[13px] text-[#d8d8d8]">
                Average setup time: 18 minutes per workflow
              </div>
            </div>

            <div className="surface-card flex flex-col justify-between gap-6">
              <div>
                <div className="text-xs font-medium text-[#9a9a9a] tabular-nums mb-3">03.</div>
                <h3 className="text-[20px] font-medium tracking-[-0.025em] text-white mb-3">
                  Human-in-the-Loop Escalation
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[#9a9a9a]">
                  Ambiguous edge cases never fail silently. Aion routes structured approval cards into Slack or Microsoft Teams with extracted evidence and one-click sign-off.
                </p>
              </div>
              <div className="pt-5 border-t border-white/10 text-[13px] text-[#d8d8d8]">
                Native Slack, Teams, and email approval queues
              </div>
            </div>

            <div className="surface-card bento-span-2">
              <div className="text-xs font-medium text-[#9a9a9a] mb-4">Verified Production Outcomes</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-white/10 rounded-[8px] p-5 bg-black/40">
                  <div className="text-[13px] text-[#9a9a9a] mb-1">Meridian Freight Logistics</div>
                  <div className="text-[24px] font-medium tracking-[-0.03em] text-white tabular-nums mb-2">
                    84% faster invoice close
                  </div>
                  <p className="text-[14px] leading-[1.6] text-[#9a9a9a]">
                    Automated three-way carrier bill reconciliation against NetSuite POs, reclaiming 1,420 operator hours per quarter with zero duplicate payouts.
                  </p>
                </div>

                <div className="border border-white/10 rounded-[8px] p-5 bg-black/40">
                  <div className="text-[13px] text-[#9a9a9a] mb-1">Northstar Health Operations</div>
                  <div className="text-[24px] font-medium tracking-[-0.03em] text-white tabular-nums mb-2">
                    6.2x faster vendor onboarding
                  </div>
                  <p className="text-[14px] leading-[1.6] text-[#9a9a9a]">
                    Validated SOC 2 attestations, TIN registries, and bank routing records automatically, cutting cycle time from 9 days to 34 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WorkflowDemo />

        <PricingSection selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />

        <FaqSection />

        <StartSection selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />

        <footer className="border-t border-white/10 bg-black">
          <div className="max-w-[1240px] mx-auto px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
              <a href="#top" className="logo" aria-label="Aion.ai">
                <AionLogoMark />
                <span>
                  Aion<span className="logo-suffix">.ai</span>
                </span>
              </a>
              <p className="text-[13px] text-[#9a9a9a]">
                Operational AI Infrastructure · SOC 2 Type II · ISO 27001
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-6 text-[13.5px] text-[#9a9a9a]" aria-label="Footer">
              <a href="#benefits" className="hover:text-white transition-colors">
                Benefits
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#demo" className="hover:text-white transition-colors">
                Live Demo
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#faqs" className="hover:text-white transition-colors">
                FAQs
              </a>
              <a href="#start" className="hover:text-white transition-colors">
                Start for Free
              </a>
            </nav>

            <div className="text-[13px] text-[#9a9a9a]">© 2026 Aion.ai Inc.</div>
          </div>
        </footer>
      </div>
    </>
  );
}
