import { useState, useEffect } from "react";
import {
  Menu, X, Spade, Dice5, Trophy, Gem, Crown, Sparkles, ShieldCheck, Lock,
  HeartHandshake, Gift, Coins, Percent, Zap, Play, Flame, Radio, Club, Star,
  Mail, Headphones, Layers, Eye, Copy,
} from "lucide-react";

/* ---------- Design tokens ---------- */
const C = { ink: "#07100c", pine: "#0f1d16", moss: "#183024", gold: "#e6b94a", cream: "#fff1c2", ember: "#c4502f" };
const goldGrad = { background: "linear-gradient(135deg,#fff1c2 0%,#e6b94a 45%,#b98a1f 100%)" };
const display = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const panel = { background: `linear-gradient(160deg, ${C.moss}, ${C.pine})`, border: "1px solid rgba(230,185,74,.18)" };

/* ---------- Sample data (fictional) ---------- */
const NAV = ["Home", "Casino", "Sports", "Promotions", "VIP"];
const CATEGORIES = [
  { name: "Slots", count: "1,200+ titles", icon: Spade },
  { name: "Live Casino", count: "80 live tables", icon: Radio },
  { name: "Table Games", count: "150+ variants", icon: Layers },
  { name: "Jackpots", count: "42 progressive", icon: Gem },
  { name: "Sports", count: "30 sports", icon: Trophy },
  { name: "New Games", count: "Added weekly", icon: Sparkles },
];
const GAMES = [
  { title: "Archer's Fortune", cat: "Slots", icon: Star, from: "#1f5c3a", to: "#0b2a1a", tag: "Hot" },
  { title: "Gilded Blackjack", cat: "Table Games", icon: Club, from: "#6b4a10", to: "#1c1305", tag: "Live" },
  { title: "Crown Roulette", cat: "Live Casino", icon: Dice5, from: "#7a2a1a", to: "#1d0a06", tag: "Live" },
  { title: "Emerald Vault", cat: "Jackpots", icon: Gem, from: "#0f6a5a", to: "#04211c", tag: "Jackpot" },
  { title: "Wild Oak Deluxe", cat: "Slots", icon: Flame, from: "#3d5a1b", to: "#0f1a08", tag: "New" },
  { title: "Midnight Baccarat", cat: "Live Casino", icon: Spade, from: "#33306b", to: "#0c0b22", tag: "Live" },
  { title: "Golden Hart", cat: "Slots", icon: Crown, from: "#8a6414", to: "#241803", tag: "Hot" },
  { title: "Lucky Longbow", cat: "New Games", icon: Zap, from: "#1b5570", to: "#06202c", tag: "New" },
];
const PROMOS = [
  { title: "Welcome Package", big: "200% up to $500", text: "Spread across your first three demo deposits. Wagering terms apply.", icon: Gift },
  { title: "Reload Friday", big: "75% up to $250", text: "Top up every Friday and get a boosted balance for the weekend.", icon: Coins },
  { title: "Weekly Cashback", big: "Up to 15% back", text: "Net losses returned every Monday, no wagering on cashback under $50.", icon: Percent },
  { title: "Free Spins Fest", big: "100 free spins", text: "Fresh spins on a featured slot every week. Choose your game.", icon: Sparkles },
  { title: "VIP Rewards", big: "Earn Sherwood Points", text: "Every play earns points you can swap for bonuses and perks.", icon: Crown },
];
const TIERS = [
  { name: "Bronze Bow", perk: "Weekly reload offers", pts: "0 pts" },
  { name: "Silver Quiver", perk: "5% cashback", pts: "2,500 pts" },
  { name: "Gold Stag", perk: "10% cashback, priority support", pts: "10,000 pts" },
  { name: "Emerald Crown", perk: "Personal host, custom bonuses", pts: "50,000 pts" },
];
const TRUST = [
  { title: "Play responsibly", text: "Set deposit, loss and time limits, take a break, or self-exclude from your account settings at any time.", icon: HeartHandshake },
  { title: "Bank-grade security", text: "256-bit encryption protects every session, and game results are tested by independent auditors.", icon: ShieldCheck },
  { title: "Your data stays yours", text: "We never sell personal data. Two-step sign-in and login alerts keep your account protected.", icon: Lock },
  { title: "Fair play checks", text: "Random number generators are certified and re-tested every quarter.", icon: Eye },
];

/* ---------- Reusable UI ---------- */
function Logo({ className = "" }) {
  return (
    <a href="#top" className={`flex items-center gap-2 rounded focus-visible:ring-2 focus-visible:ring-yellow-300 ${className}`} aria-label="SherwinGamble home">
      <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
        <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff1c2" /><stop offset=".5" stopColor="#e6b94a" /><stop offset="1" stopColor="#b98a1f" /></linearGradient></defs>
        <path d="M20 2 36 9v12c0 9-6 15-16 18C10 36 4 30 4 21V9z" fill="#07100c" stroke="url(#lg)" strokeWidth="2" />
        <path d="M26 13c-2-2-8-3-10 1-2 5 8 4 8 9 0 4-7 4-10 1" fill="none" stroke="url(#lg)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M9 31 31 9M31 9h-6M31 9v6" fill="none" stroke="#e6b94a" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
      </svg>
      <span className="text-2xl font-bold tracking-tight" style={display}>
        <span className="text-white">Sherwin</span><span style={{ ...goldGrad, WebkitBackgroundClip: "text", color: "transparent" }}>Gamble</span>
      </span>
    </a>
  );
}

function Button({ children, variant = "gold", onClick, className = "", ...rest }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
  const styles = {
    gold: "text-black hover:scale-105 hover:brightness-110",
    ghost: "border text-yellow-200 hover:bg-yellow-500 hover:bg-opacity-10",
  };
  const st = variant === "gold" ? { ...goldGrad, boxShadow: "0 0 24px rgba(230,185,74,.35)" } : { borderColor: "rgba(230,185,74,.5)" };
  return <button type="button" onClick={onClick} style={st} className={`${base} ${styles[variant]} ${className}`} {...rest}>{children}</button>;
}

function Section({ id, title, intro, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="mb-10 max-w-2xl">
        <h2 id={`${id}-h`} className="text-4xl font-semibold text-white sm:text-5xl" style={display}>{title}</h2>
        {intro && <p className="mt-3 text-gray-400">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

/* ---------- Navigation ---------- */
function Navbar({ onDemo }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur" style={{ background: "rgba(7,16,12,.88)", borderColor: "rgba(230,185,74,.15)" }}>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n, i) => (
            <li key={n}><a href={`#${n.toLowerCase()}`} aria-current={i === 0 ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:text-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-300 ${i === 0 ? "text-yellow-300" : "text-gray-300"}`}>{n}</a></li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" onClick={() => onDemo("Login is disabled in this demo.")}>Login</Button>
          <Button onClick={() => onDemo("Registration is disabled in this demo.")}>Register</Button>
        </div>
        <button className="rounded p-2 text-yellow-200 focus-visible:ring-2 focus-visible:ring-yellow-300 lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t px-4 pb-5 lg:hidden" style={{ borderColor: "rgba(230,185,74,.15)" }}>
          <ul className="py-3">{NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)} className="block py-3 font-semibold text-gray-200">{n}</a></li>)}</ul>
          <div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => onDemo("Login is disabled in this demo.")}>Login</Button><Button className="flex-1" onClick={() => onDemo("Registration is disabled in this demo.")}>Register</Button></div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero: monthly leaderboard ---------- */
const PODIUM = [
  { rank: 2, name: "NightArcher", pts: "182,400", prize: "$7,500", lift: "md:mt-10" },
  { rank: 1, name: "LadyMarian", pts: "247,900", prize: "$12,000", lift: "" },
  { rank: 3, name: "OakenBluff", pts: "141,250", prize: "$4,500", lift: "md:mt-16" },
];
function useMonthCountdown() {
  const calc = () => {
    const d = new Date();
    const s = Math.max(0, Math.floor((new Date(d.getFullYear(), d.getMonth() + 1, 1) - d) / 1000));
    return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}
function PodiumCard({ rank, name, pts, prize, lift }) {
  const first = rank === 1;
  return (
    <li className={`flex flex-col items-center rounded-2xl px-3 py-5 text-center ${lift}`} style={{ ...panel, ...(first ? { border: "1px solid #e6b94a", boxShadow: "0 0 50px rgba(230,185,74,.3)" } : {}) }}>
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-black" style={goldGrad} aria-hidden="true">
        {name[0]}{first && <Crown size={22} className="absolute -top-4 text-yellow-300" />}
      </span>
      <p className="mt-3 text-xs text-gray-400">Rank {rank}</p>
      <h3 className="font-semibold text-white">{name}</h3>
      <p className="text-xs text-gray-400">{pts} pts</p>
      <p className="mt-2 text-xl font-bold text-yellow-300" style={display}>{prize}</p>
    </li>
  );
}
function Hero({ onDemo }) {
  const t = useMonthCountdown();
  const labels = ["Days", "Hours", "Minutes", "Seconds"];
  return (
    <section id="home" aria-labelledby="hero-h" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(230,185,74,.22), transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(24,48,36,.9), transparent 60%)` }} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:py-20">
        <div className="lg:col-span-2">
          <h1 id="hero-h" className="text-5xl font-bold leading-none text-white sm:text-7xl" style={display}>
            The Sherwood Cup
          </h1>
          <p className="mt-2 text-3xl font-semibold text-yellow-300 sm:text-4xl" style={display}>$30K monthly leaderboard</p>
          <p className="mt-5 max-w-md text-gray-300">Earn points on every demo game, climb the ranks and take a share of the prize pool. Standings refresh once a day.</p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm" style={panel}>
            <span className="text-gray-400">Code</span><strong className="tracking-wider text-yellow-200">ROBIN</strong>
            <button aria-label="Copy code (demo)" onClick={() => onDemo("Code copied. This is a demo, so it does nothing.")} className="flex h-9 w-9 items-center justify-center rounded-full text-black transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-yellow-300" style={goldGrad}><Copy size={15} /></button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button onClick={() => onDemo("Registration is disabled in this demo.")}>Join the Cup</Button>
            <Button variant="ghost" onClick={() => document.getElementById("casino")?.scrollIntoView({ behavior: "smooth" })}>Browse games</Button>
          </div>
        </div>
        <div className="lg:col-span-3">
          <ol className="grid grid-cols-3 items-start gap-3 sm:gap-5" aria-label="Current top three players">
            {PODIUM.map((p) => <PodiumCard key={p.rank} {...p} />)}
          </ol>
          <div className="mt-8 rounded-2xl p-5" style={panel}>
            <p className="mb-3 text-center text-sm text-gray-400" id="cd-h">Leaderboard ends in</p>
            <div className="grid grid-cols-4 gap-3 text-center" role="timer" aria-labelledby="cd-h">
              {t.map((v, i) => (
                <div key={labels[i]} className="rounded-xl py-3" style={{ background: C.ink, border: "1px solid rgba(230,185,74,.3)" }}>
                  <p className="text-3xl font-bold text-white sm:text-4xl" style={display}>{String(v).padStart(2, "0")}</p>
                  <p className="text-xs text-gray-400">{labels[i]}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center"><Button variant="ghost" className="!py-2" onClick={() => onDemo("Full standings are not part of this demo.")}>View full leaderboard</Button></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Categories / Games ---------- */
function CategoryTile({ name, count, icon: Icon }) {
  return (
    <a href="#casino" className="group flex flex-col items-center rounded-2xl p-5 text-center transition duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-yellow-300" style={panel}>
      <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full text-black transition duration-300 group-hover:scale-110" style={goldGrad}><Icon size={26} aria-hidden="true" /></span>
      <span className="font-semibold text-white">{name}</span>
      <span className="text-xs text-gray-400">{count}</span>
    </a>
  );
}

function GameCard({ title, cat, icon: Icon, from, to, tag, onDemo }) {
  return (
    <article className="group overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ ...panel, boxShadow: "0 10px 30px rgba(0,0,0,.4)" }}>
      <div className="relative flex h-44 items-center justify-center overflow-hidden" style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}>
        <div aria-hidden="true" className="absolute h-56 w-56 rounded-full opacity-20 transition duration-500 group-hover:scale-125" style={{ border: "1px solid #e6b94a", boxShadow: "0 0 0 24px rgba(230,185,74,.06), 0 0 0 48px rgba(230,185,74,.04)" }} />
        <Icon size={64} className="relative text-yellow-300 transition duration-500 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true" />
        <span className="absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold text-black" style={goldGrad}>{tag}</span>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{cat}</p>
        </div>
        <Button className="shrink-0 !px-4 !py-2" onClick={() => onDemo(`"${title}" is a demo tile, so no game launches.`)} aria-label={`Play ${title} (demo)`}><Play size={14} /> Play</Button>
      </div>
    </article>
  );
}

/* ---------- Promotions / VIP / Trust ---------- */
function PromoCard({ title, big, text, icon: Icon, onDemo }) {
  return (
    <article className="flex flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1" style={panel}>
      <Icon className="mb-4 text-yellow-300" size={30} aria-hidden="true" />
      <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
      <p className="mt-1 text-3xl font-bold text-white" style={display}>{big}</p>
      <p className="mt-2 flex-1 text-sm text-gray-400">{text}</p>
      <button onClick={() => onDemo("Promotions are illustrative in this demo.")} className="mt-5 self-start rounded text-sm font-bold text-yellow-300 underline decoration-yellow-600 underline-offset-4 hover:text-yellow-200 focus-visible:ring-2 focus-visible:ring-yellow-300">Get offer details</button>
    </article>
  );
}

function VipClub({ onDemo }) {
  return (
    <section id="vip" aria-labelledby="vip-h" className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.ink}, #1a1405 50%, ${C.ink})` }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Crown size={40} className="text-yellow-300" aria-hidden="true" />
          <h2 id="vip-h" className="mt-4 text-4xl font-semibold sm:text-6xl" style={{ ...display, ...goldGrad, WebkitBackgroundClip: "text", color: "transparent" }}>The Sherwood Circle</h2>
          <p className="mt-4 text-gray-300">Our invite-free VIP program. Every bet earns Sherwood Points, and points move you up four tiers, each with better cashback, faster payouts and a dedicated host at the top.</p>
          <Button className="mt-8" onClick={() => onDemo("VIP enrolment is disabled in this demo.")}>Join The Sherwood Circle</Button>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          {TIERS.map((t, i) => (
            <li key={t.name} className="rounded-2xl p-6" style={{ background: "linear-gradient(160deg,#2a2008,#120d03)", border: "1px solid rgba(230,185,74,.45)", boxShadow: i === 3 ? "0 0 40px rgba(230,185,74,.25)" : "none" }}>
              <p className="text-xs text-yellow-500">Unlocks at {t.pts}</p>
              <h3 className="mt-1 text-2xl font-bold text-yellow-200" style={display}>{t.name}</h3>
              <p className="mt-2 text-sm text-gray-300">{t.perk}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TrustItem({ title, text, icon: Icon }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-yellow-300" style={panel}><Icon aria-hidden="true" /></span>
      <div><h3 className="font-semibold text-white">{title}</h3><p className="mt-1 text-sm text-gray-400">{text}</p></div>
    </li>
  );
}

/* ---------- Milestones & stream ---------- */
const MILESTONES = [
  { title: "Monthly milestones", text: "Hit point targets during the month and claim each reward from your dashboard.", stat: "Up to $12K" },
  { title: "Rank-up bonuses", text: "Every new tier you reach pays out an extra bonus.", stat: "Up to $20K" },
  { title: "Daily refresh", text: "Standings and points update every 24 hours.", stat: "Every day" },
];
function Milestones() {
  return (
    <Section id="milestones" title="Milestones and rank-ups" intro="Every point counts toward the next reward. All figures are fictional.">
      <ol className="grid gap-5 md:grid-cols-3">
        {MILESTONES.map((m, i) => (
          <li key={m.title} className="relative rounded-2xl p-6" style={panel}>
            <span className="absolute right-5 top-4 text-5xl font-bold opacity-20 text-yellow-300" style={display} aria-hidden="true">{i + 1}</span>
            <h3 className="text-lg font-semibold text-white">{m.title}</h3>
            <p className="mt-2 text-sm text-gray-400">{m.text}</p>
            <p className="mt-4 text-3xl font-bold text-yellow-300" style={display}>{m.stat}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
function LiveStream({ onDemo }) {
  return (
    <Section id="live" title="Watch the tables live" intro="Catch dealer sessions and big spins on our channel.">
      <div className="relative flex aspect-video max-h-96 w-full items-center justify-center overflow-hidden rounded-3xl" style={{ ...panel, background: `radial-gradient(circle at 50% 40%, ${C.moss}, ${C.ink})` }}>
        <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: C.ember }}><Radio size={12} /> Live preview</span>
        <div className="text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-black" style={goldGrad}><Play size={30} aria-hidden="true" /></span>
          <p className="mt-4 text-gray-400">Stream player placeholder</p>
          <Button variant="ghost" className="mt-4" onClick={() => onDemo("No stream is connected in this demo.")}>Open channel</Button>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const cols = {
    Play: ["Casino", "Live Casino", "Sports", "Jackpots"],
    Company: ["About us", "Promotions", "VIP", "Affiliates"],
    Help: ["Contact us", "Responsible gambling", "FAQ", "Self-exclusion"],
  };
  return (
    <footer className="border-t" style={{ background: "#050b08", borderColor: "rgba(230,185,74,.15)" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-gray-400">A fictional premium casino concept. No real-money gambling takes place on this site.</p>
          <address className="mt-4 space-y-1 text-sm not-italic text-gray-400">
            <p className="flex items-center gap-2"><Mail size={14} /> support@sherwingamble.example</p>
            <p className="flex items-center gap-2"><Headphones size={14} /> Live chat, 24/7</p>
          </address>
        </div>
        {Object.entries(cols).map(([h, links]) => (
          <nav key={h} aria-label={h}>
            <h3 className="font-semibold text-yellow-300">{h}</h3>
            <ul className="mt-3 space-y-2 text-sm">{links.map((l) => <li key={l}><a href="#top" className="text-gray-400 transition hover:text-white focus-visible:ring-2 focus-visible:ring-yellow-300">{l}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="border-t px-4 py-8 text-xs text-gray-500" style={{ borderColor: "rgba(230,185,74,.1)" }}>
        <div className="mx-auto max-w-7xl space-y-3">
          <p className="flex items-start gap-3"><span className="rounded border border-yellow-600 px-1.5 py-0.5 font-bold text-yellow-400">18+</span><span>Gambling can be addictive. Play responsibly and only with money you can afford to lose. If gambling stops being fun, seek free confidential help from your local support service.</span></p>
          <p className="flex flex-wrap gap-x-5 gap-y-1"><a href="#top" className="underline hover:text-white">Terms &amp; Conditions</a><a href="#top" className="underline hover:text-white">Privacy Policy</a><a href="#top" className="underline hover:text-white">Cookie Policy</a></p>
          <p>© 2026 SherwinGamble. All rights reserved. Demo concept for design purposes only.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- App ---------- */
export default function SherwinGamble() {
  const [toast, setToast] = useState(null);
  const onDemo = (m) => { setToast(m); clearTimeout(window.__sgT); window.__sgT = setTimeout(() => setToast(null), 3200); };
  return (
    <div id="top" className="min-h-screen text-gray-100" style={{ background: C.ink, fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;600;800&display=swap');
        html{scroll-behavior:smooth}
        @keyframes sgSpin{0%{transform:translateY(0)}50%{transform:translateY(-14px);filter:blur(3px)}100%{transform:translateY(0)}}
        .sg-spin{animation:sgSpin .3s linear infinite}
        @media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
      `}</style>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-yellow-400 focus:p-3 focus:text-black">Skip to content</a>
      <Navbar onDemo={onDemo} />
      <main id="main">
        <Hero onDemo={onDemo} />
        <Section id="categories" title="Choose your table" intro="Six ways in, from spinning reels to live dealers.">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{CATEGORIES.map((c) => <CategoryTile key={c.name} {...c} />)}</div>
        </Section>
        <Section id="casino" title="Featured games" intro="Handpicked titles players are spinning right now. All tiles are demo-only.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{GAMES.map((g) => <GameCard key={g.title} {...g} onDemo={onDemo} />)}</div>
        </Section>
        <Section id="promotions" title="Promotions" intro="Bonuses are illustrative. Real offers would carry full terms and wagering requirements.">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{PROMOS.map((p) => <PromoCard key={p.title} {...p} onDemo={onDemo} />)}</div>
        </Section>
        <Milestones />
        <VipClub onDemo={onDemo} />
        <LiveStream onDemo={onDemo} />
        <Section id="sports" title="Safe, fair and in your control" intro="Your protection comes first, always.">
          <ul className="grid gap-8 md:grid-cols-2">{TRUST.map((t) => <TrustItem key={t.title} {...t} />)}</ul>
        </Section>
      </main>
      <Footer />
      {toast && <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 py-3 text-sm font-bold text-black shadow-2xl" style={goldGrad}>{toast}</div>}
    </div>
  );
}
