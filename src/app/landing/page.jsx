'use client';

export default function LandingPage() {
  const APP_URL = 'https://content-forge-ten-peach.vercel.app';

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8C96A;
          --bg: #0A0A0A;
          --bg2: #111111;
          --text: #F0EDE8;
          --text-dim: #9A9490;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; overflow-x: hidden; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .a0 { animation: fadeUp 0.8s ease both; }
        .a1 { animation: fadeUp 0.8s ease 0.15s both; }
        .a2 { animation: fadeUp 0.8s ease 0.30s both; }
        .a3 { animation: fadeUp 0.8s ease 0.45s both; }
        .a4 { animation: fadeUp 0.8s ease 0.60s both; }

        .gold-shimmer {
          background: linear-gradient(90deg, #C9A84C 0%, #F5D780 50%, #C9A84C 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear infinite;
        }

        .btn-gold {
          background: linear-gradient(135deg, #C9A84C, #E8C96A);
          color: #0A0A0A !important;
          border: none;
          padding: 16px 44px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.06em;
          transition: all 0.3s ease;
          text-decoration: none !important;
          display: inline-block;
        }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,168,76,0.38); }

        .btn-outline {
          padding: 16px 44px;
          border: 1px solid rgba(201,168,76,0.30);
          color: #C9A84C;
          text-decoration: none;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s;
          display: inline-block;
        }
        .btn-outline:hover { border-color: #C9A84C; background: rgba(201,168,76,0.05); }

        .feature-card {
          border: 1px solid rgba(201,168,76,0.12);
          padding: 34px;
          background: rgba(255,255,255,0.015);
          transition: all 0.35s ease;
        }
        .feature-card:hover {
          border-color: rgba(201,168,76,0.38);
          background: rgba(201,168,76,0.04);
          transform: translateY(-5px);
        }

        .pricing-card {
          border: 1px solid rgba(201,168,76,0.18);
          padding: 44px 34px;
          background: rgba(255,255,255,0.015);
          transition: all 0.35s ease;
          position: relative;
        }
        .pricing-card.star {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.07);
        }
        .pricing-card:hover { transform: translateY(-7px); box-shadow: 0 24px 64px rgba(0,0,0,0.55); }

        .nav-link {
          color: #9A9490;
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #C9A84C; }

        .section-tag {
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #C9A84C;
          margin-bottom: 20px;
          display: block;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 5vw, 62px);
          font-weight: 700;
          line-height: 1.08;
          margin-bottom: 20px;
        }

        .check-item {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
          align-items: flex-start;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '18px 52px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        background: 'rgba(10,10,10,0.93)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg,#C9A84C,#E8C96A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#0A0A0A',
          }}>✦</div>
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            Content<span style={{ color: '#C9A84C' }}>Forge</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#features"    className="nav-link">Features</a>
          <a href="#how"         className="nav-link">How It Works</a>
          <a href="#pricing"     className="nav-link">Pricing</a>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer"
            className="btn-gold" style={{ padding: '10px 24px', fontSize: 13 }}>
            Try Free →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '150px 40px 110px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 38%, rgba(201,168,76,0.08) 0%, transparent 62%)',
          pointerEvents: 'none',
        }} />

        <div className="a0" style={{
          fontSize: 11, letterSpacing: '0.22em', color: '#C9A84C',
          border: '1px solid rgba(201,168,76,0.25)',
          padding: '6px 20px', display: 'inline-block', marginBottom: 28,
        }}>
          AI-POWERED · MARKETING CONTENT GENERATOR
        </div>

        <h1 className="a1" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(54px, 8.5vw, 100px)',
          fontWeight: 700, lineHeight: 1.04,
          maxWidth: 900, marginBottom: 30,
        }}>
          Generate Content<br />
          That <span className="gold-shimmer">Actually Converts.</span>
        </h1>

        <p className="a2" style={{
          fontSize: 18, color: '#9A9490', maxWidth: 560,
          lineHeight: 1.82, marginBottom: 54,
        }}>
          Stop spending hours writing marketing copy. ContentForge creates professional
          posts, emails, and ads for your business in seconds — in English, Arabic,
          French, or Darija.
        </p>

        <div className="a3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Generate Free Content →
          </a>
          <a href="#how" className="btn-outline">See How It Works</a>
        </div>

        <div className="a4" style={{
          display: 'flex', gap: 72, marginTop: 96,
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {[
            { num: '6+',   label: 'Content Types' },
            { num: '4',    label: 'Languages' },
            { num: '10s',  label: 'Generation Time' },
            { num: '100%', label: 'Free to Start' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 54, fontWeight: 700, color: '#C9A84C', lineHeight: 1,
              }}>{s.num}</div>
              <div style={{ fontSize: 12, color: '#9A9490', marginTop: 7, letterSpacing: '0.09em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{
        padding: '120px 52px',
        maxWidth: 1260, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 76 }}>
          <span className="section-tag">FEATURES</span>
          <h2 className="section-title">Everything You Need<br />to Sell More</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {[
            { icon: '✦', title: '6 Content Formats',   desc: 'Social posts, marketing emails, ad copy, product descriptions, blog intros, and sales pitches — all in one tool.' },
            { icon: '◈', title: 'Multi-Platform',       desc: 'Output optimized for Instagram, LinkedIn, Twitter/X, Facebook, and TikTok. Right tone, right length.' },
            { icon: '◎', title: '4 Languages',          desc: 'Generate in English, Arabic, French, or Darija. Reach every Algerian client in their language.' },
            { icon: '⟐', title: '6 Tones of Voice',    desc: 'Professional, casual, luxury, urgent, friendly, bold — match your brand voice with one click.' },
            { icon: '▶', title: 'Real-Time Streaming', desc: 'Content appears word-by-word. No loading spinner, no waiting — instant creative flow.' },
            { icon: '◇', title: 'One-Click Copy',      desc: 'Built-in copy button. Paste straight into Instagram, your email platform, or any other tool.' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div style={{
                fontSize: 22, color: '#C9A84C', marginBottom: 22,
                fontFamily: "'Cormorant Garamond', serif",
              }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{f.title}</h3>
              <p style={{ color: '#9A9490', fontSize: 14, lineHeight: 1.82 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{
        padding: '120px 52px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        background: 'rgba(201,168,76,0.025)',
      }}>
        <div style={{ maxWidth: 1260, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 96 }}>
            <span className="section-tag">HOW IT WORKS</span>
            <h2 className="section-title">3 Steps to Perfect Content</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 64 }}>
            {[
              { n: '01', title: 'Describe Your Business', desc: 'Enter your business name, product or service, and who your target audience is. Takes 30 seconds.' },
              { n: '02', title: 'Choose Your Format',     desc: 'Pick content type, platform (Instagram, LinkedIn…), tone, and language. Maximum 4 clicks.' },
              { n: '03', title: 'Generate & Publish',     desc: 'AI creates polished, ready-to-use content in under 10 seconds. Hit copy and you\'re done.' },
            ].map(s => (
              <div key={s.n}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 96, fontWeight: 700,
                  color: 'rgba(201,168,76,0.11)', lineHeight: 1, marginBottom: 22,
                }}>{s.n}</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 14 }}>{s.title}</h3>
                <p style={{ color: '#9A9490', lineHeight: 1.82, fontSize: 15 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '120px 52px', maxWidth: 1260, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 76 }}>
          <span className="section-tag">PRICING</span>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p style={{ color: '#9A9490', fontSize: 16, marginTop: 12 }}>
            Order content generation as a service — no subscription needed
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            {
              name: 'Starter', price: '$15', period: 'per order',
              desc: 'Perfect for small businesses',
              features: ['5 content pieces', '1 language of choice', '2 content types', 'Delivered in 24 hrs', 'Copy-ready format'],
              star: false,
            },
            {
              name: 'Professional', price: '$35', period: 'per order',
              desc: 'Most popular for growing businesses',
              features: ['15 content pieces', 'All 4 languages', 'All 6 content types', 'All platforms supported', 'Delivered in 12 hrs', 'One revision included'],
              star: true,
            },
            {
              name: 'Business', price: '$75', period: 'per order',
              desc: 'For agencies & large brands',
              features: ['40 content pieces', 'All languages & tones', 'All types & platforms', 'Priority delivery', 'Rush 6-hr option', 'Multiple revisions'],
              star: false,
            },
          ].map(p => (
            <div key={p.name} className={`pricing-card ${p.star ? 'star' : ''}`}>
              {p.star && (
                <div style={{
                  position: 'absolute', top: -1, left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#C9A84C', color: '#0A0A0A',
                  padding: '5px 24px', fontSize: 10,
                  fontWeight: 700, letterSpacing: '0.14em', whiteSpace: 'nowrap',
                }}>MOST POPULAR</div>
              )}
              <div style={{ fontSize: 11, color: '#9A9490', marginBottom: 8, letterSpacing: '0.08em' }}>
                {p.name.toUpperCase()}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 70, fontWeight: 700, color: '#C9A84C', lineHeight: 1,
                }}>{p.price}</span>
                <span style={{ color: '#9A9490', fontSize: 13 }}>{p.period}</span>
              </div>
              <p style={{ color: '#9A9490', fontSize: 13, marginBottom: 34 }}>{p.desc}</p>
              <div style={{
                borderTop: '1px solid rgba(201,168,76,0.1)',
                paddingTop: 24, marginBottom: 34,
              }}>
                {p.features.map(f => (
                  <div key={f} className="check-item">
                    <span style={{ color: '#C9A84C', fontSize: 12, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#F0EDE8', lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', textAlign: 'center', padding: '15px',
                  fontSize: 14, fontWeight: 600, textDecoration: 'none',
                  transition: 'all 0.3s', letterSpacing: '0.05em',
                  background: p.star ? 'linear-gradient(135deg,#C9A84C,#E8C96A)' : 'transparent',
                  border: p.star ? 'none' : '1px solid rgba(201,168,76,0.30)',
                  color: p.star ? '#0A0A0A' : '#C9A84C',
                }}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: '120px 52px', textAlign: 'center',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 68%)',
      }}>
        <span className="section-tag">GET STARTED TODAY</span>
        <h2 className="section-title">
          Ready to Create<br />
          <span className="gold-shimmer">Better Content?</span>
        </h2>
        <p style={{
          color: '#9A9490', fontSize: 18, lineHeight: 1.78,
          maxWidth: 480, margin: '0 auto 56px',
        }}>
          Businesses across Algeria are using ContentForge to save time and win more clients.
        </p>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer"
          className="btn-gold" style={{ fontSize: 18, padding: '22px 68px' }}>
          Start Generating Free →
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '30px 52px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <span style={{ fontSize: 16, fontWeight: 600 }}>
          Content<span style={{ color: '#C9A84C' }}>Forge</span>
        </span>
        <span style={{ color: '#9A9490', fontSize: 13 }}>
          © 2026 ContentForge · Made in Algeria 🇩🇿
        </span>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="nav-link">
          Launch App →
        </a>
      </footer>
    </>
  );
}
