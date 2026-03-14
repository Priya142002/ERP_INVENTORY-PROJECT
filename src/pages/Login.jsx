import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, login as doLogin } from "../utils/auth";

export default function ERPLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  const handleLogin = () => {
    const e = {};
    if (!email.trim())    e.email    = "Email or username is required";
    if (!password.trim()) e.password = "Password is required";
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      doLogin({ remember });
      const redirectPath = from === '/' ? '/dashboard' : from;
      navigate(redirectPath, { replace: true });
    }, 800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .erp-root {
          position: fixed; inset: 0;
          display: flex;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        /* ── full-screen, no gaps ── */
        .erp-frame {
          display: flex;
          width: 100%; height: 100%;
          position: relative;
          overflow: hidden;
        }

        /* ══════════════════════════
           LEFT — dark hero panel
        ══════════════════════════ */
        .hero {
          flex: 0 0 54%;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
          padding: 32px 36px;
        }
        .hero-top {
          position: absolute !important;
          top: 32px; left: 36px; z-index: 4;
        }

        /* deep navy base */
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #050d20 0%, #0a1a3a 40%, #0d2155 70%, #0a2060 100%);
          z-index: 0;
        }

        /* blue atmospheric glow */
        .hero::after {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 60% 35%, rgba(30,100,255,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 20% 70%, rgba(10,60,180,0.18) 0%, transparent 60%);
          z-index: 1;
        }

        /* tech grid lines */
        .hero-grid {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image:
            linear-gradient(rgba(60,130,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(60,130,255,0.07) 1px, transparent 1px);
          background-size: 44px 44px;
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* floating dashboard mockup cards */
        .hero-mock {
          position: absolute;
          z-index: 3;
          bottom: 80px; right: -30px;
          width: 340px; opacity: 0.55;
          transform: perspective(700px) rotateY(-12deg) rotateX(6deg);
          pointer-events: none;
        }
        .mock-card {
          background: rgba(10,30,80,0.75);
          border: 1px solid rgba(60,130,255,0.25);
          border-radius: 10px;
          backdrop-filter: blur(8px);
          padding: 12px 14px;
          margin-bottom: 8px;
        }
        .mock-card-title { font-size: 9px; color: rgba(150,190,255,0.7); margin-bottom: 8px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
        .mock-bars { display: flex; gap: 5px; align-items: flex-end; height: 40px; }
        .mock-bar { flex: 1; border-radius: 3px 3px 0 0; background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%); opacity: 0.85; }
        .mock-line-row { display: flex; gap: 8px; margin-top: 6px; }
        .mock-stat { flex: 1; }
        .mock-stat-val { font-size: 13px; font-weight: 700; color: #93c5fd; }
        .mock-stat-lbl { font-size: 8px; color: rgba(150,190,255,0.55); }
        .mock-card2 { display: flex; gap: 10px; align-items: center; }
        .mock-donut { width: 38px; height: 38px; flex-shrink: 0; }
        .mock-table { flex: 1; }
        .mock-row { display: flex; gap: 6px; padding: 3px 0; border-bottom: 1px solid rgba(60,130,255,0.1); font-size: 7.5px; color: rgba(150,190,255,0.6); }
        .mock-row:last-child { border-bottom: none; }

        /* hero-top is now absolute, defined above */
        .hero-logo {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 0;
        }
        .hero-logo-box {
          width: 36px; height: 36px; border-radius: 8px;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(59,130,246,0.4);
        }
        .hero-logo-text { line-height: 1.15; }
        .hero-logo-text .erp  { font-size: 15px; font-weight: 800; color: #fff; display: block; }
        .hero-logo-text .sys  { font-size: 12px; font-weight: 500; color: rgba(180,210,255,0.8); display: block; }

        .hero-main { position: relative; z-index: 4; }
        .hero-title {
          font-size: clamp(24px, 2.6vw, 34px);
          font-weight: 800; color: #fff;
          line-height: 1.18; letter-spacing: -0.5px;
        }



        /* ══════════════════════════
           RIGHT — login card
        ══════════════════════════ */
        .login-panel {
          flex: 0 0 46%;
          background: #f0f4fa;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          position: relative;
        }

        .login-card {
          width: 100%; max-width: 360px;
          background: #fff;
          border-radius: 18px;
          padding: 36px 32px 32px;
          box-shadow: 0 8px 36px rgba(10,30,100,0.12), 0 1px 3px rgba(0,0,0,0.06);
          border: 1px solid rgba(200,210,230,0.6);
          animation: fadeUp 0.4s ease both;
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .card-title {
          font-size: 22px; font-weight: 800; color: #0f172a;
          letter-spacing: -0.4px; margin-bottom: 4px;
          text-align: center;
        }
        .card-sub {
          font-size: 13px; font-weight: 600;
          color: #2563eb;
          text-align: center; margin-bottom: 24px;
          width: 100%;
        }

        /* fields */
        .field { margin-bottom: 15px; }
        .field-label {
          display: block; font-size: 11px; font-weight: 700;
          color: #334155; letter-spacing: 0.4px; text-transform: uppercase;
          margin-bottom: 6px;
        }
        .input-wrap { position: relative; }
        .field-input {
          width: 100%; padding: 10px 38px 10px 12px;
          border: 1.5px solid #e2e8f0; border-radius: 8px;
          font-size: 13px; color: #0f172a; background: #f8fafc;
          font-family: 'Inter', sans-serif;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .field-input::placeholder { color: #b0bec5; }
        .field-input:focus {
          outline: none; border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
          background: #fff;
        }
        .field-input.err { border-color: #ef4444; }
        .input-icon {
          position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
          color: #94a3b8; line-height: 0; cursor: pointer;
          transition: color .2s;
        }
        .input-icon:hover { color: #3b82f6; }
        .field-err { font-size: 10.5px; color: #ef4444; margin-top: 3px; }

        /* meta row */
        .meta-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 18px;
        }
        .remember-label {
          display: flex; align-items: center; gap: 7px;
          font-size: 12px; color: #475569; cursor: pointer;
        }
        .remember-label input { accent-color: #3b82f6; width: 14px; height: 14px; cursor: pointer; }
        .forgot { font-size: 12px; font-weight: 600; color: #3b82f6; text-decoration: none; transition: color .2s; }
        .forgot:hover { color: #1d4ed8; }

        /* login button */
        .login-btn {
          width: 100%; padding: 12px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: #fff; border: none; border-radius: 9px;
          font-size: 14px; font-weight: 700; letter-spacing: 0.3px;
          font-family: 'Inter', sans-serif; cursor: pointer;
          box-shadow: 0 4px 14px rgba(37,99,235,0.35);
          transition: all .2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 12px;
        }
        .login-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(37,99,235,0.45);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: .72; cursor: not-allowed; }

        .contact-help {
          font-size: 11px; color: #94a3b8;
          text-align: center; margin-bottom: 16px;
        }



        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 13px; height: 13px; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff;
          border-radius: 50%; animation: spin .7s linear infinite; display: inline-block;
        }
      `}</style>

      <div className="erp-root">
        <div className="erp-frame">

          {/* ══ LEFT HERO ══ */}
          <div className="hero">
            <div className="hero-grid" />

            {/* floating dashboard mockup */}
            <div className="hero-mock">
              <div className="mock-card">
                <div className="mock-card-title">Sales Overview</div>
                <div className="mock-bars">
                  {[55,70,40,85,60,90,45,75,65,80].map((h,i) => (
                    <div key={i} className="mock-bar" style={{ height: `${h}%`, opacity: i===7?1:0.6 }} />
                  ))}
                </div>
                <div className="mock-line-row">
                  {[["$189K","Revenue"],["6,248","Units"],["$25K","Profit"]].map(([v,l]) => (
                    <div key={l} className="mock-stat">
                      <div className="mock-stat-val">{v}</div>
                      <div className="mock-stat-lbl">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mock-card mock-card2">
                <svg className="mock-donut" viewBox="0 0 38 38">
                  <circle cx="19" cy="19" r="15" fill="none" stroke="rgba(30,60,140,0.6)" strokeWidth="6"/>
                  <circle cx="19" cy="19" r="15" fill="none" stroke="#3b82f6" strokeWidth="6"
                    strokeDasharray="56 38" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 19 19)"/>
                  <circle cx="19" cy="19" r="15" fill="none" stroke="#93c5fd" strokeWidth="6"
                    strokeDasharray="28 66" strokeDashoffset="-56" strokeLinecap="round" transform="rotate(-90 19 19)"/>
                </svg>
                <div className="mock-table">
                  {[["INV-001","Apple MacBook","₹82,500"],["INV-002","Dell Monitor","₹24,000"],["INV-003","HP Printer","₹12,800"]].map(([id,n,p])=>(
                    <div key={id} className="mock-row"><span>{id}</span><span style={{flex:1}}>{n}</span><span>{p}</span></div>
                  ))}
                </div>
              </div>
            </div>

            {/* logo top-left */}
            <div className="hero-top">
              <div className="hero-logo">
                <div className="hero-logo-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="hero-logo-text">
                  <span className="erp">ERP</span>
                  <span className="sys">Inventory System</span>
                </div>
              </div>
            </div>

            {/* centre headline */}
            <div className="hero-main">
              <h2 className="hero-title">
                Integrated Business<br />Management Platform
              </h2>
            </div>


          </div>

          {/* ══ RIGHT LOGIN ══ */}
          <div className="login-panel">
            <div className="login-card">

              <h1 className="card-title">Welcome Back</h1>
                <p className="card-sub">Sign in to continue to ERP</p>

                {/* Email / Username */}
                <div className="field">
                  <label className="field-label">EMAIL or Username</label>
                  <div className="input-wrap">
                    <input
                      className={`field-input${errors.email ? " err" : ""}`}
                      type="text" placeholder="Enter your email or username"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email:""})); }}
                    />
                    <span className="input-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </span>
                  </div>
                  {errors.email && <p className="field-err">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="field">
                  <label className="field-label">PASSWORD</label>
                  <div className="input-wrap">
                    <input
                      className={`field-input${errors.password ? " err" : ""}`}
                      type={showPw ? "text" : "password"} placeholder="Enter your password"
                      value={password}
                      onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password:""})); }}
                    />
                    <span className="input-icon" onClick={() => setShowPw(v => !v)}>
                      {showPw
                        ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      }
                    </span>
                  </div>
                  {errors.password && <p className="field-err">{errors.password}</p>}
                </div>

                {/* Remember / Forgot */}
                <div className="meta-row">
                  <label className="remember-label">
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                    Remember Me
                  </label>
                  <a href="#" className="forgot" onClick={e => e.preventDefault()}>Forgot Password?</a>
                </div>

                {/* Submit */}
                <button className="login-btn" onClick={handleLogin} disabled={loading}>
                  {loading ? <><span className="spinner" /> Signing in…</> : "Login"}
                </button>

              

            </div>
          </div>

        </div>
      </div>
    </>
  );
}