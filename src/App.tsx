import { useState, useEffect } from "react";

// ── Real links ────────────────────────────────────────────────────────────────
const LINKS = {
  amazon:   "https://a.co/d/h1iLPQF",
  linkedin: "https://www.linkedin.com/in/ridhi-jain-709/",
  email:    "mailto:ridhijain709@gmail.com?subject=Hello Ridhi",
  whatsapp: `https://wa.me/918449825146?text=${encodeURIComponent("Hi Ridhi! I'd like to order a signed copy of 'Aks – Reflections of the Soul'. Please share details.")}`,
};

const AUTHOR_PHOTO = `${import.meta.env.BASE_URL}author.jpg`;
const BOOK_PHOTO   = `${import.meta.env.BASE_URL}book.jpg`;

const track = (name: string, params?: Record<string, string>) => {
  try { (window as any).gtag?.("event", name, params); } catch {}
};

function BtnGold({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
        letterSpacing: "0.14em", textTransform: "uppercase",
        background: h ? "#b8943f" : "#c9a96e", color: "#0a0906",
        border: "1px solid #c9a96e", padding: "12px 28px",
        cursor: "pointer", transition: "all 0.25s", whiteSpace: "nowrap",
      }}>{children}</button>
  );
}

function BtnOutline({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
        letterSpacing: "0.14em", textTransform: "uppercase",
        background: h ? "rgba(201,169,110,0.08)" : "transparent",
        color: "#c9a96e", border: "1px solid #c9a96e",
        padding: "12px 28px", cursor: "pointer", transition: "all 0.25s", whiteSpace: "nowrap",
      }}>{children}</button>
  );
}

function Eyebrow({ text, center }: { text: string; center?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: center ? "center" : "flex-start",
      gap: "10px", marginBottom: "22px",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.62rem", letterSpacing: "0.2em",
      color: "#c9a96e", textTransform: "uppercase",
    }}>
      <span style={{ width: 30, height: 1, background: "#c9a96e", display: "block", flexShrink: 0 }} />
      {text}
      {center && <span style={{ width: 30, height: 1, background: "#c9a96e", display: "block", flexShrink: 0 }} />}
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive]   = useState("home");

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.2, rootMargin: "-80px 0px 0px 0px" }
    );
    document.querySelectorAll("section[id]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    track("nav_click", { section: id });
  };

  const openAmazon   = () => { track("amazon_click");   window.open(LINKS.amazon,   "_blank"); };
  const openLinkedIn = () => { track("linkedin_click"); window.open(LINKS.linkedin, "_blank"); };
  const openEmail    = () => { track("email_click");    window.open(LINKS.email,    "_blank"); };
  const openWhatsApp = () => { track("whatsapp_click"); window.open(LINKS.whatsapp, "_blank"); };

  const navLinks = ["home", "about", "book", "consulting", "contact"];
  const scrolled = scrollY > 60;

  return (
    <>
      {/* ─── NAV ─────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 5vw",
        background: scrolled ? "rgba(10,9,6,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.1)" : "none",
        transition: "all 0.35s", gap: "12px",
      }}>
        <button onClick={() => goTo("home")} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'Noto Serif Devanagari', serif",
          fontSize: "1rem", color: "#c9a96e", letterSpacing: "0.08em", flexShrink: 0,
        }}>रिधि जैन</button>

        {/* Page section links */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
          {navLinks.map(n => (
            <button key={n} onClick={() => goTo(n)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: active === n ? "#c9a96e" : "rgba(232,224,208,0.4)",
              borderBottom: active === n ? "1px solid #c9a96e" : "1px solid transparent",
              paddingBottom: "2px", transition: "all 0.25s",
            }}>{n}</button>
          ))}
        </div>

        {/* External links */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
          <NavIconBtn label="LinkedIn" onClick={openLinkedIn} />
          <NavIconBtn label="Amazon"   onClick={openAmazon}   />
          <NavIconBtn label="Email"    onClick={openEmail}     />
          <BtnGold onClick={openAmazon}>Buy Aks</BtnGold>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section id="home" style={{
        minHeight: "100vh", display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center", padding: "110px 8vw 60px", gap: "60px",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", right: "-4vw", top: "50%", transform: "translateY(-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(100px,22vw,300px)", fontWeight: 300,
          color: "rgba(201,169,110,0.04)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none", letterSpacing: "-0.04em",
        }}>AKS</div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow text="AI Strategist · IBM Intern · Author" />
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(46px,7vw,92px)", fontWeight: 300,
            lineHeight: 1.05, margin: "0 0 10px", letterSpacing: "-0.02em",
          }}>
            Ridhi<br /><em style={{ color: "#c9a96e", fontStyle: "italic" }}>Jain</em>
          </h1>
          <p style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            fontSize: "clamp(13px,1.8vw,18px)",
            color: "rgba(232,224,208,0.4)", marginBottom: "28px", letterSpacing: "0.04em",
          }}>रूह के अक्स — Reflections of the Soul</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px,1.7vw,19px)", fontWeight: 300,
            lineHeight: 1.75, color: "rgba(232,224,208,0.68)",
            maxWidth: "480px", marginBottom: "44px",
          }}>
            AI strategist who has helped recover{" "}
            <strong style={{ color: "#c9a96e", fontWeight: 400 }}>₹6,100 Cr in EBITDA</strong>{" "}
            across India's largest enterprises. IBM intern. Between strategy decks — a poet
            writing about love, longing, and the quiet parts of life.
          </p>
          <div style={{ display: "flex", gap: "32px", marginBottom: "44px", flexWrap: "wrap" }}>
            {[
              { val: "₹6,100 Cr", lbl: "EBITDA Impact" },
              { val: "30+",       lbl: "Deliverables"  },
              { val: "8.3 GPA",   lbl: "Academic"      },
            ].map(s => (
              <div key={s.lbl}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 600, color: "#c9a96e", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(232,224,208,0.35)", textTransform: "uppercase", marginTop: 4 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <BtnGold onClick={openAmazon}>Buy on Amazon</BtnGold>
            <BtnOutline onClick={() => goTo("book")}>About the Book</BtnOutline>
            <BtnOutline onClick={() => goTo("consulting")}>AI Consulting</BtnOutline>
          </div>
        </div>

        {/* Author photo */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#c9a96e,#6b4f10,#c9a96e)", zIndex: 0, padding: "3px" }}>
              <div style={{ width: "100%", height: "100%", background: "#0a0906" }} />
            </div>
            <img src={AUTHOR_PHOTO} alt="Ridhi Jain — AI Strategist and Author"
              width={400} height={500} loading="eager"
              style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400, height: 500, objectFit: "cover", objectPosition: "top center" }}
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{ position: "absolute", bottom: -16, left: -20, zIndex: 10, background: "#0d0b08", border: "1px solid rgba(201,169,110,0.4)", padding: "10px 16px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: "#c9a96e", textTransform: "uppercase" }}>IBM Intern</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#e8e0d0", marginTop: 2 }}>AI Strategy</div>
            </div>
            <div style={{ position: "absolute", top: -16, right: -20, zIndex: 10, background: "#c9a96e", padding: "10px 16px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: "#0a0906", textTransform: "uppercase" }}>Published Author</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600, color: "#0a0906", marginTop: 2 }}>Aks · 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ───────────────────────────────────────── */}
      <section id="about" style={{ padding: "120px 8vw", borderTop: "1px solid rgba(232,224,208,0.06)", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", left: "-2vw", top: "50%", transform: "translateY(-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(80px,16vw,220px)", fontWeight: 300, color: "rgba(201,169,110,0.03)", pointerEvents: "none", userSelect: "none" }}>RIDHI</div>
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Eyebrow text="About" />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 300, lineHeight: 1.2, marginBottom: "28px", letterSpacing: "-0.02em" }}>
            From Muzaffarnagar to boardrooms<br /><em style={{ color: "#c9a96e" }}>and bookstores</em>
          </h2>
          {[
            "I'm Ridhi Jain — an AI strategist who believes the most powerful tool in any boardroom is not a model or dataset, but the ability to think clearly about what truly matters.",
            "As an IBM intern, I've worked across India's largest enterprises, helping leadership teams identify and recover value hidden inside operational complexity. My work has contributed to ₹6,100 Cr in EBITDA recovery — through rigorous first-principles thinking applied with AI.",
            "And then — between strategy decks — I write poetry. Aks (रूह के अक्स) is my debut book published in 2025, a bilingual collection in Hindi and English exploring love, longing, silence, and the quiet parts of life.",
            "I hold an 8.3 GPA and come from Muzaffarnagar, Uttar Pradesh — a city that taught me early that ambition and sensitivity are not opposites.",
          ].map((p, i) => (
            <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.85, fontWeight: 300, color: "rgba(232,224,208,0.7)", marginBottom: "18px" }}>{p}</p>
          ))}
          <div style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
            <BtnGold onClick={openLinkedIn}>Connect on LinkedIn</BtnGold>
            <BtnOutline onClick={openEmail}>Send an Email</BtnOutline>
          </div>
        </div>
      </section>

      {/* ─── BOOK ────────────────────────────────────────── */}
      <section id="book" style={{ padding: "120px 8vw", borderTop: "1px solid rgba(232,224,208,0.06)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", fontFamily: "'Noto Serif Devanagari', serif", fontSize: "clamp(60px,14vw,180px)", fontWeight: 300, color: "rgba(201,169,110,0.04)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>अक्स</div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 14, left: 14, right: -14, bottom: -14, background: "rgba(201,169,110,0.1)", zIndex: 0 }} />
            <div style={{ position: "absolute", top: 7, left: 7, right: -7, bottom: -7, background: "rgba(201,169,110,0.06)", zIndex: 0 }} />
            <img src={BOOK_PHOTO} alt="Aks — Reflections of the Soul by Ridhi Jain" width={320} height={460} loading="lazy"
              style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 320, boxShadow: "0 40px 100px rgba(0,0,0,0.7),-4px 4px 20px rgba(201,169,110,0.12)", transform: "perspective(900px) rotateY(-5deg)", transition: "transform 0.4s ease" }}
              onMouseEnter={e => (e.target as HTMLElement).style.transform = "perspective(900px) rotateY(0deg)"}
              onMouseLeave={e => (e.target as HTMLElement).style.transform = "perspective(900px) rotateY(-5deg)"}
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow text="The Book" />
          <div style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: "clamp(15px,2.2vw,24px)", color: "rgba(232,224,208,0.45)", marginBottom: "6px" }}>रूह के अक्स</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 300, lineHeight: 1, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Aks</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.8vw,20px)", fontStyle: "italic", color: "#c9a96e", marginBottom: "28px" }}>Reflections of the Soul</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.8, color: "rgba(232,224,208,0.68)", fontWeight: 300, marginBottom: "32px", maxWidth: 460 }}>
            A bilingual collection of poetry in Hindi and English exploring love, longing, silence, melancholy, and the unwritten chapters of the soul. <em style={{ color: "#c9a96e" }}>Aks</em> means reflection. Every poem is a mirror.
          </p>
          <div style={{ display: "flex", gap: "24px", marginBottom: "36px", flexWrap: "wrap" }}>
            {[
              { lbl: "Published", val: "2025"            },
              { lbl: "Language",  val: "Hindi · English"  },
              { lbl: "Genre",     val: "Poetry"           },
              { lbl: "Available", val: "Amazon India"     },
            ].map(i => (
              <div key={i.lbl} style={{ borderLeft: "2px solid #c9a96e", paddingLeft: 12 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.15em", color: "rgba(232,224,208,0.35)", textTransform: "uppercase", marginBottom: 3 }}>{i.lbl}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#e8e0d0" }}>{i.val}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "20px" }}>
            <BtnGold onClick={openAmazon}>Buy on Amazon</BtnGold>
            <BtnOutline onClick={openWhatsApp}>Order via WhatsApp</BtnOutline>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", color: "rgba(232,224,208,0.25)", textTransform: "uppercase" }}>
            Amazon India · a.co/d/h1iLPQF
          </div>
        </div>
      </section>

      {/* ─── CONSULTING ──────────────────────────────────── */}
      <section id="consulting" style={{ padding: "120px 8vw", borderTop: "1px solid rgba(232,224,208,0.06)", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(40px,9vw,140px)", fontWeight: 300, color: "rgba(201,169,110,0.03)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", letterSpacing: "0.1em" }}>STRATEGY</div>
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Eyebrow text="AI Consulting" />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 300, lineHeight: 1.2, marginBottom: "48px", letterSpacing: "-0.02em" }}>
            Where AI meets<br /><em style={{ color: "#c9a96e" }}>enterprise transformation</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "1px", background: "rgba(232,224,208,0.06)" }}>
            {[
              { n: "01", t: "EBITDA Recovery",     d: "Identify hidden value in operational complexity. Using AI to map, quantify, and recover margin leakage across large-scale enterprises." },
              { n: "02", t: "AI Strategy",          d: "Build AI roadmaps aligned to business objectives — not technology trends. From use-case identification to deployment governance." },
              { n: "03", t: "Process Intelligence", d: "Apply intelligent automation and data analysis to transform how organizations execute their highest-value workflows." },
              { n: "04", t: "Leadership Advisory",  d: "Partner with C-suite to build organizational AI literacy and first-principles decision-making frameworks." },
            ].map(s => <ServiceCard key={s.n} num={s.n} title={s.t} desc={s.d} />)}
          </div>
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <BtnOutline onClick={openEmail}>Discuss a Project</BtnOutline>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─────────────────────────────────────── */}
      <section id="contact" style={{ padding: "120px 8vw", borderTop: "1px solid rgba(232,224,208,0.06)", textAlign: "center", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(60px,16vw,240px)", fontWeight: 300, color: "rgba(201,169,110,0.03)", pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>HELLO</div>
        <div style={{ maxWidth: 560, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Eyebrow text="Contact" center />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,5vw,60px)", fontWeight: 300, lineHeight: 1.1, marginBottom: "20px", letterSpacing: "-0.02em" }}>
            Let's build<br /><em style={{ color: "#c9a96e" }}>something meaningful</em>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.6vw,18px)", color: "rgba(232,224,208,0.6)", marginBottom: "44px", lineHeight: 1.75, fontWeight: 300 }}>
            For AI consulting, book orders, or just to connect — reach out through any of these channels.
          </p>

          {/* 4 contact cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "rgba(232,224,208,0.06)", marginBottom: "36px", textAlign: "left" }}>
            <ContactCard icon="✉" label="Email"    sub="ridhijain709@gmail.com"  fn={openEmail}    />
            <ContactCard icon="💼" label="LinkedIn" sub="Connect professionally"  fn={openLinkedIn} />
            <ContactCard icon="📦" label="Amazon"   sub="Buy Aks · a.co/d/h1iLPQF" fn={openAmazon} />
            <ContactCard icon="💬" label="WhatsApp" sub="Order signed copy"       fn={openWhatsApp} />
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <BtnGold onClick={openAmazon}>Buy Aks on Amazon</BtnGold>
            <BtnOutline onClick={openLinkedIn}>LinkedIn</BtnOutline>
            <BtnOutline onClick={openEmail}>Email Me</BtnOutline>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <footer style={{ padding: "32px 5vw", borderTop: "1px solid rgba(232,224,208,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: "0.85rem", color: "rgba(232,224,208,0.3)", letterSpacing: "0.05em" }}>रिधि जैन · Ridhi Jain · 2025</div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {[
            { l: "LinkedIn", fn: openLinkedIn },
            { l: "Amazon",   fn: openAmazon   },
            { l: "Email",    fn: openEmail     },
          ].map(x => (
            <button key={x.l} onClick={x.fn} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: "rgba(232,224,208,0.25)", textTransform: "uppercase", transition: "color 0.25s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#c9a96e"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(232,224,208,0.25)"}
            >{x.l}</button>
          ))}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", color: "rgba(232,224,208,0.15)", textTransform: "uppercase" }}>
          AI Strategist · IBM · Author · Muzaffarnagar, India
        </div>
      </footer>

      <style>{`
        @media(max-width:900px){
          #home,#book{grid-template-columns:1fr!important;gap:40px!important}
          #home{padding-top:90px!important}
          nav > div:nth-child(2){display:none}
        }
        @media(max-width:600px){
          nav > div:last-child .btn-outline{display:none}
        }
      `}</style>
    </>
  );
}

function NavIconBtn({ label, onClick }: { label: string; onClick: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem",
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: h ? "#c9a96e" : "rgba(232,224,208,0.4)",
        transition: "color 0.25s", padding: "4px 6px",
      }}>{label}</button>
  );
}

function ServiceCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  const [h, setH] = useState(false);
  return (
    <div style={{ background: h ? "#0e0c09" : "#0a0906", padding: "36px 28px", transition: "background 0.25s" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.56rem", color: "#c9a96e", letterSpacing: "0.15em", marginBottom: 14 }}>{num}</div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(232,224,208,0.52)", fontWeight: 300 }}>{desc}</p>
    </div>
  );
}

function ContactCard({ icon, label, sub, fn }: { icon: string; label: string; sub: string; fn: () => void }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={fn} style={{ background: h ? "#0e0c09" : "#0a0906", padding: "24px 20px", cursor: "pointer", transition: "background 0.25s" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ fontSize: "1.2rem", marginBottom: "8px" }}>{icon}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 400, marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(232,224,208,0.35)", textTransform: "uppercase" }}>{sub}</div>
    </div>
  );
}
