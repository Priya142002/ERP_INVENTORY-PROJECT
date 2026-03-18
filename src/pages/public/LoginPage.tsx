import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

interface LoginPageProps {
  user: User | null;
  onLogin: (role: 'super_admin' | 'admin', remember: boolean) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ user, onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      navigate(user.role === 'super_admin' ? '/superadmin/dashboard' : '/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eps: { email?: string; password?: string } = {};
    if (!email.trim()) eps.email = 'Email is required';
    if (!password.trim()) eps.password = 'Password is required';
    setErrors(eps);
    if (Object.keys(eps).length) return;
    setLoading(true);
    
    // Determine role based on email for the plug-and-play demo
    const role = email.toLowerCase().includes('superadmin') ? 'super_admin' : 'admin';
    
    setTimeout(() => {
      setLoading(false);
      onLogin(role, rememberMe);
      navigate(role === 'super_admin' ? '/superadmin/dashboard' : '/admin/dashboard');
    }, 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .lp-root *, .lp-root *::before, .lp-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        /* Fixed full viewport — zero scroll */
        html, body { margin: 0; padding: 0; overflow: hidden; height: 100%; width: 100%; }

        .lp-root {
          font-family: 'Outfit', sans-serif;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          overflow: hidden;
        }

        /* ═══════════════════════════
           LEFT PANEL — fills 55%
        ═══════════════════════════ */
        .lp-left {
          flex: 0 0 55%;
          height: 100vh;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 44px 56px;
          background: linear-gradient(
            148deg,
            #060c1e 0%,
            #091630 18%,
            #0c2050 36%,
            #0f2d72 54%,
            #123494 72%,
            #153ba2 90%,
            #1640b0 100%
          );
        }

        /* Grid overlay */
        .lp-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(70,130,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(70,130,255,0.07) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* Glow blobs */
        .lp-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .lp-blob-1 {
          width: 480px; height: 480px; top: -130px; left: -100px;
          background: radial-gradient(circle, rgba(20,62,195,0.32) 0%, transparent 65%);
          animation: lp-breathe 7s ease-in-out infinite;
        }
        .lp-blob-2 {
          width: 360px; height: 360px; bottom: -40px; right: -60px;
          background: radial-gradient(circle, rgba(12,50,170,0.24) 0%, transparent 65%);
          animation: lp-breathe 9s ease-in-out infinite reverse;
        }
        .lp-blob-3 {
          width: 250px; height: 250px; top: 50%; left: 42%;
          background: radial-gradient(circle, rgba(35,90,235,0.14) 0%, transparent 65%);
          animation: lp-breathe 6s ease-in-out infinite 2s;
        }
        @keyframes lp-breathe {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.12); }
        }

        /* Floating monitor / dashboard graphic */
        .lp-monitor-outer {
          position: absolute; right: -20px; top: 50%;
          transform: translateY(-50%);
          width: 320px; opacity: 0.20; pointer-events: none;
        }
        .lp-monitor {
          background: linear-gradient(145deg, rgba(16,42,120,0.92), rgba(7,20,68,0.96));
          border: 1px solid rgba(65,115,255,0.25);
          border-radius: 12px; padding: 12px 12px 8px;
        }
        .lm-topbar { display: flex; gap: 5px; margin-bottom: 10px; }
        .lm-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(75,135,255,0.4); }
        .lm-row { display: flex; gap: 7px; margin-bottom: 7px; }
        .lm-panel {
          flex: 1; border-radius: 5px;
          background: linear-gradient(135deg, rgba(32,75,185,0.45), rgba(16,42,128,0.3));
          border: 1px solid rgba(50,105,255,0.18); overflow: hidden;
        }
        .lm-bars { display: flex; align-items: flex-end; gap: 3px; height: 52px; padding: 5px 6px 0; }
        .lm-bar  { flex: 1; border-radius: 2px 2px 0 0; background: linear-gradient(to top, rgba(42,95,255,0.88), rgba(78,148,255,0.4)); }
        .lm-lines { padding: 6px; }
        .lm-line  { height: 3px; border-radius: 2px; background: rgba(75,138,255,0.28); margin-bottom: 5px; }
        .lm-pie   { width: 40px; height: 40px; margin: 7px auto; }
        .lm-foot  { padding: 6px 6px 4px; }

        /* Left inner content */
        .lp-lc { position: relative; z-index: 2; }

        .lp-brand { display: flex; align-items: center; gap: 14px; margin-bottom: 48px; }
        .lp-brand-icon {
          width: 48px; height: 48px; flex-shrink: 0;
          background: #002147;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 18px rgba(0,33,71,0.3);
          overflow: hidden;
        }
        .lp-brand-icon img { width: 32px; height: 32px; object-fit: contain; }
        .lp-brand-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px; font-weight: 700;
          color: #fff; letter-spacing: 0.5px; line-height: 1.15;
        }
        .lp-brand-sub { font-size: 13px; color: rgba(155,200,255,0.65); font-weight: 300; }

        .lp-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 46px; font-weight: 700;
          color: #fff; line-height: 1.15;
          margin-bottom: 14px; letter-spacing: 0.3px;
        }
        .lp-subtitle {
          font-size: 15px; color: rgba(155,200,255,0.7);
          line-height: 1.65; font-weight: 300; margin-bottom: 44px;
        }

        /* Stats */
        .lp-stats { display: flex; gap: 48px; margin-bottom: 0; }
        .lp-stat-val {
          font-family: 'Rajdhani', sans-serif;
          font-size: 30px; font-weight: 700; color: #fff;
        }
        .lp-stat-lbl {
          font-size: 11px; color: rgba(155,200,255,0.6);
          text-transform: uppercase; letter-spacing: 0.8px; font-weight: 300; margin-top: 2px;
        }

        .lp-left-foot {
          position: relative; z-index: 2;
          font-size: 12px; color: rgba(88,128,200,0.42); line-height: 1.7;
        }

        /* ═══════════════════════════
           RIGHT PANEL — fills 45%
        ═══════════════════════════ */
        .lp-right {
          flex: 0 0 45%;
          height: 100vh;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          background: #f8fafc;
        }
        .lp-right::before {
          content: ''; position: absolute; top: -40px; right: -40px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(185,215,255,0.55) 0%, transparent 70%);
          pointer-events: none;
        }
        .lp-right::after {
          content: ''; position: absolute; bottom: -20px; left: 0px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(165,205,255,0.38) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Form Card ── */
        .lp-card {
          position: relative; z-index: 1;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 22px;
          padding: 44px 38px 34px;
          width: 100%; max-width: 400px;
          border: 1px solid rgba(255,255,255,0.96);
          box-shadow:
            0 24px 64px rgba(8,28,85,0.11),
            0 6px 18px rgba(8,28,85,0.07),
            inset 0 1px 0 rgba(255,255,255,0.95);
        }

        .lp-card-hd { text-align: center; margin-bottom: 30px; }
        .lp-card-logo {
          width: 64px; height: 64px; margin: 0 auto 20px;
          background: #f1f5f9; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .lp-card-logo img { width: 40px; height: 40px; object-fit: contain; }
        .lp-card-hd h2 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 28px; font-weight: 700;
          color: #0f172a; margin-bottom: 6px; letter-spacing: 0.3px;
        }
        .lp-card-hd p { font-size: 13px; color: #64748b; }

        .lp-field { margin-bottom: 20px; }
        .lp-field label {
          display: block; font-size: 11px; font-weight: 600;
          color: #475569; letter-spacing: 0.8px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .lp-iw { position: relative; }
        .lp-iw input {
          width: 100%; padding: 13px 42px 13px 16px;
          border: 1.5px solid #dce8f2; border-radius: 10px;
          font-size: 13.5px; font-family: 'Outfit', sans-serif;
          color: #1e293b; background: rgba(246,250,255,0.9);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .lp-iw input::placeholder { color: #a8b8cc; }
        .lp-iw input:focus {
          border-color: #002147; background: #fff;
          box-shadow: 0 0 0 3px rgba(0,33,71,0.05);
        }
        .lp-iw input.lp-err-input { border-color: #fca5a5; background: rgba(255,245,245,0.9); }
        .lp-ico {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          color: #9bafc4; display: flex; align-items: center;
          background: none; border: none; cursor: pointer; padding: 0;
        }
        .lp-ico svg { width: 16px; height: 16px; }
        .lp-err { font-size: 12px; color: #ef4444; margin-top: 5px; }

        .lp-row {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 22px;
        }
        .lp-rem { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .lp-rem input[type="checkbox"] { width: 15px; height: 15px; accent-color: #3b82f6; cursor: pointer; }
        .lp-rem span { font-size: 13px; color: #475569; }
        .lp-fgt {
          font-size: 13px; color: #002147; font-weight: 600;
          cursor: pointer; background: none; border: none;
          font-family: 'Outfit', sans-serif; padding: 0;
        }
        .lp-fgt:hover { text-decoration: underline; }

        .lp-submit {
          width: 100%; padding: 14px;
          background: #002147;
          color: #fff; border: none; border-radius: 10px;
          font-size: 15.5px; font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer; letter-spacing: 0.3px;
          transition: all 0.2s;
          box-shadow: 0 5px 18px rgba(0,33,71,0.25);
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .lp-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 55%, #2563eb 100%);
          box-shadow: 0 7px 24px rgba(29,78,216,0.55);
          transform: translateY(-1px);
        }
        .lp-submit:active:not(:disabled) { transform: translateY(0); }
        .lp-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        @keyframes lp-spin { to { transform: rotate(360deg); } }
        .lp-spinner {
          width: 17px; height: 17px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
        }

        .lp-hr { height: 1px; background: rgba(200,215,230,0.5); margin: 18px 0; }
        .lp-foot { text-align: center; }
        .lp-foot-help { font-size: 12px; color: #94a3b8; margin-bottom: 6px; }
        .lp-foot-copy { font-size: 11.5px; color: #aab8cc; line-height: 1.7; }
        .lp-foot-copy strong { color: #5a7096; font-weight: 600; }

        @media (max-width: 900px) {
          .lp-left { display: none; }
          .lp-right { flex: 1; }
        }
      `}</style>

      <div className="lp-root">

        {/* ══════════════ LEFT PANEL ══════════════ */}
        <div className="lp-left">
          <div className="lp-grid" />
          <div className="lp-blob lp-blob-1" />
          <div className="lp-blob lp-blob-2" />
          <div className="lp-blob lp-blob-3" />

          {/* Floating monitor graphic */}
          <div className="lp-monitor-outer">
            <div className="lp-monitor">
              <div className="lm-topbar">
                {[1,2,3].map(i => <div key={i} className="lm-dot" />)}
              </div>
              <div className="lm-row">
                <div className="lm-panel" style={{ flex: 1.4 }}>
                  <div className="lm-bars">
                    {[38,62,48,78,55,88,68,58].map((h, i) => (
                      <div key={i} className="lm-bar" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="lm-panel">
                  <div className="lm-lines" style={{ paddingTop: 6 }}>
                    {[100,75,55,88,65,42].map((w, i) => (
                      <div key={i} className="lm-line" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="lm-row">
                <div className="lm-panel">
                  <div className="lm-lines" style={{ paddingTop: 8 }}>
                    {[85,60,72,50].map((w, i) => (
                      <div key={i} className="lm-line" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
                <div className="lm-panel">
                  <div className="lm-pie">
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                      <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(50,100,220,0.4)" strokeWidth="5" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(80,150,255,0.7)"
                        strokeWidth="5" strokeDasharray="55 44" strokeLinecap="round"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="lm-foot">
                {[90,70,55].map((w, i) => (
                  <div key={i} className="lm-line" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Brand + Hero */}
          <div className="lp-lc">
            <div className="lp-brand">
              <div>
                <div className="lp-brand-name">ERP</div>
                <div className="lp-brand-sub">Inventory System</div>
              </div>
            </div>

            <h1 className="lp-title">
              Integrated Business<br />Management Platform
            </h1>
            <p className="lp-subtitle">
              Streamline your operations with our<br />comprehensive ERP solution
            </p>

            <div className="lp-stats">
              {[
                { value: '$189K', label: 'Revenue' },
                { value: '6,248', label: 'Orders'  },
                { value: '$25K',  label: 'Profit'  },
              ].map(s => (
                <div key={s.label}>
                  <div className="lp-stat-val">{s.value}</div>
                  <div className="lp-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lp-left-foot">
            © 2026 ERP Inventory System<br />All rights reserved
          </div>
        </div>

        {/* ══════════════ RIGHT PANEL ══════════════ */}
        <div className="lp-right">
          <div className="lp-card">

            <div className="lp-card-hd">
              <h2>Welcome Back</h2>
              <p>Sign in to continue to ERP</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div className="lp-field">
                <label htmlFor="lp-email">EMAIL OR USERNAME</label>
                <div className="lp-iw">
                  <input
                    id="lp-email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={errors.email ? 'lp-err-input' : ''}
                    placeholder="Enter your email or username"
                    autoComplete="email"
                  />
                  <span className="lp-ico" style={{ cursor: 'default' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                </div>
                {errors.email && <p className="lp-err">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="lp-field">
                <label htmlFor="lp-password">PASSWORD</label>
                <div className="lp-iw">
                  <input
                    id="lp-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={errors.password ? 'lp-err-input' : ''}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="lp-ico"
                    onClick={() => setShowPassword(p => !p)}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="lp-err">{errors.password}</p>}
              </div>

              {/* Remember + Forgot */}
              <div className="lp-row">
                <label className="lp-rem">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <span>Remember Me</span>
                </label>
                <button type="button" className="lp-fgt">Forgot Password?</button>
              </div>

              {/* Submit */}
              <button type="submit" className="lp-submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="lp-spinner" />
                    Signing in...
                  </>
                ) : 'Login'}
              </button>
            </form>

            <div className="lp-hr" />
            <div className="lp-foot">
              <p className="lp-foot-help">Contact admin for help</p>
              <p className="lp-foot-copy">
                © 2026 <strong>ERP Inventory System</strong><br />
                All rights reserved
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default LoginPage;