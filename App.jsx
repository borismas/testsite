import { useState, useEffect } from "react";

const C = {
  bg:    "#0d0d0d",
  bg2:   "#111111",
  bg3:   "#161616",
  green: "#39ff14",
  gdim:  "#1f6b0a",
  gmid:  "#2aaa00",
  cyan:  "#5fafff",
  yellow:"#e0d060",
  red:   "#cc4444",
  white: "#c0c0c0",
  grey:  "#444444",
  grey2: "#666666",
  bd:    "#1c1c1c",
};

const mono = "'Courier New', Courier, monospace";

function Prompt({ path = "~", cmd }) {
  return (
    <div style={{ fontSize: 12, marginBottom: 10, color: C.grey2 }}>
      <span style={{ color: C.green }}>wtap</span>
      <span style={{ color: C.grey }}>@</span>
      <span style={{ color: C.cyan }}>arch</span>
      <span style={{ color: C.grey }}>:</span>
      <span style={{ color: C.gmid }}>{path}</span>
      <span style={{ color: C.grey2 }}> % </span>
      <span style={{ color: C.white }}>{cmd}</span>
    </div>
  );
}

function Block({ path, cmd, children }) {
  return (
    <div style={{
      background: C.bg2, border: `1px solid ${C.bd}`,
      padding: "14px 16px", marginBottom: 14,
    }}>
      <Prompt path={path} cmd={cmd} />
      {children}
    </div>
  );
}

function Out({ children, style }) {
  return <div style={{ color: C.white, fontSize: 12, lineHeight: 1.8, ...style }}>{children}</div>;
}

function Kv({ k, v, vc }) {
  return (
    <div style={{ fontSize: 12, marginBottom: 2 }}>
      <span style={{ color: C.grey2, display: "inline-block", minWidth: 110 }}>{k}</span>
      <span style={{ color: vc || C.white }}>{v}</span>
    </div>
  );
}

function Bar({ name, pct }) {
  const filled = Math.round(pct / 5);
  const empty = 20 - filled;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, fontSize: 12 }}>
      <span style={{ color: C.white, minWidth: 150 }}>{name}</span>
      <span style={{ color: C.gdim, letterSpacing: 1 }}>{"█".repeat(filled)}</span>
      <span style={{ color: C.bg3, letterSpacing: 1 }}>{"░".repeat(empty)}</span>
      <span style={{ color: C.grey, minWidth: 30 }}>{pct}%</span>
    </div>
  );
}

function Tag({ t }) {
  return (
    <span style={{
      fontSize: 10, color: C.grey2, border: `1px solid ${C.bd}`,
      padding: "1px 6px", marginRight: 5, marginTop: 6, display: "inline-block",
    }}>{t}</span>
  );
}

function ProjCard({ name, lang, link, desc, tags }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        borderLeft: `1px solid ${hov ? C.green : C.gdim}`,
        paddingLeft: 14, marginBottom: 20,
        transition: "border-color 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
        <span style={{ color: C.green, fontSize: 13, fontWeight: 700 }}>{name}</span>
        <span style={{ color: C.yellow, fontSize: 11 }}>{lang}</span>
        {link && (
          <a href={link} target="_blank" rel="noreferrer"
            style={{ color: C.cyan, fontSize: 11, marginLeft: "auto", textDecoration: "none" }}>
            {link.replace("https://", "")}
          </a>
        )}
      </div>
      <p style={{ color: C.white, fontSize: 12, lineHeight: 1.7, marginBottom: 6 }}>{desc}</p>
      <div>{tags.map(t => <Tag key={t} t={t} />)}</div>
    </div>
  );
}

function Div() {
  return <div style={{ borderTop: `1px solid ${C.bd}`, margin: "18px 0" }} />;
}

// ── PAGES ────────────────────────────────────────────────────────────────

function Home() {
  const [tick, setTick] = useState(true);
  useEffect(() => { const i = setInterval(() => setTick(t => !t), 600); return () => clearInterval(i); }, []);
  return (
    <div>
      <Block cmd="neofetch">
        <pre style={{
          color: C.green, fontSize: 10, lineHeight: 1.25, whiteSpace: "pre",
          marginBottom: 16, textShadow: `0 0 6px rgba(57,255,20,0.25)`,
        }}>{`
      /\\
     /  \\
    / /\\ \\
   / /  \\ \\
  /_/    \\_\\
  \\ \\    / /
   \\ \\/ / 
    \\  /
     \\/`}
        </pre>
        <Kv k="user" v="wtap" vc={C.green} />
        <Kv k="host" v="arch" vc={C.cyan} />
        <Kv k="role" v="software developer" vc={C.yellow} />
        <Kv k="shell" v="zsh 5.9" />
        <Kv k="editor" v="neovim" />
        <Kv k="uptime" v="i don't reboot" vc={C.grey2} />
      </Block>

      <Block cmd="cat README.md">
        <Out>
          <p>i'm <span style={{ color: C.green }}>wtap</span>. i write software.</p>
          <p style={{ marginTop: 6, color: C.grey2 }}>use the tabs above to look around.</p>
          <p style={{ marginTop: 10 }}>
            <span style={{ color: C.grey }}>% </span>
            <span style={{ opacity: tick ? 1 : 0 }}>█</span>
          </p>
        </Out>
      </Block>
    </div>
  );
}

function About() {
  return (
    <div>
      <Block cmd="cat whoami.txt">
        <Kv k="name" v="wtap" vc={C.green} />
        <Kv k="role" v="software developer" />
        <Kv k="os" v="arch linux (btw)" vc={C.cyan} />
        <Kv k="github" v="github.com/borismas" vc={C.cyan} />
        <Kv k="discord" v="wtap.com" />
      </Block>

      <Block cmd="cat bio.txt">
        <Out>
          <p>software developer. i build tools that solve problems i have, and occasionally ones other people have too.</p>
          <p style={{ marginTop: 8 }}>i spend most of my time in the terminal, learning things the hard way, and writing code that works well enough. i run arch, use neovim, and have opinions about both.</p>
        </Out>
      </Block>

      <Div />

      <Block path="~" cmd="cat skills.txt">
        <Bar name="bash / shell" pct={88} />
        <Bar name="python" pct={85} />
        <Bar name="javascript / ts" pct={80} />
        <Bar name="linux / sysadmin" pct={82} />
        <Bar name="git" pct={90} />
        <Bar name="rust" pct={60} />
        <Bar name="networking / ctf" pct={72} />
        <Bar name="reading docs first" pct={14} />
      </Block>
    </div>
  );
}

function Hobbies() {
  return (
    <div>
      <Block path="~/hobbies" cmd="ls">
        <Out>
          <span style={{ color: C.cyan }}>coding</span>{"  "}
          <span style={{ color: C.cyan }}>hacking</span>{"  "}
          <span style={{ color: C.cyan }}>tinkering</span>
        </Out>
      </Block>

      <Block path="~/hobbies/coding" cmd="cat info.txt">
        <Out>
          <p style={{ color: C.green, marginBottom: 6 }}>coding</p>
          {["building personal tools and scripts",
            "open source contributions",
            "exploring new languages — currently rust",
            "automating anything that feels repetitive",
          ].map(l => <p key={l} style={{ color: C.white }}>{"  "}› {l}</p>)}
        </Out>
      </Block>

      <Block path="~/hobbies/hacking" cmd="cat info.txt">
        <Out>
          <p style={{ color: C.green, marginBottom: 6 }}>hacking / ctf</p>
          {["ctf competitions and wargames",
            "penetration testing mindset",
            "reverse engineering binaries",
            "recon and enumeration tooling",
          ].map(l => <p key={l} style={{ color: C.white }}>{"  "}› {l}</p>)}
        </Out>
      </Block>

      <Block path="~/hobbies/tinkering" cmd="cat info.txt">
        <Out>
          <p style={{ color: C.green, marginBottom: 6 }}>tinkering</p>
          {["home lab setup and maintenance",
            "self-hosting services",
            "messing with hardware",
            "building things that break, fixing them",
          ].map(l => <p key={l} style={{ color: C.white }}>{"  "}› {l}</p>)}
        </Out>
      </Block>

      <Block cmd="cat activity.log | tail -5">
        <Out>
          {[
            ["2024-11-10", "+", C.green,  "finished ctf — top 8%"],
            ["2024-10-28", "+", C.green,  "shipped loot-tracker v2"],
            ["2024-10-14", "!", C.yellow, "4h rabbit hole. missing semicolon."],
            ["2024-10-02", "+", C.green,  "new home lab node — finally"],
            ["2024-09-20", "*", C.cyan,   "started learning rust. it's fine."],
          ].map(([d, s, sc, msg]) => (
            <p key={d}>
              <span style={{ color: C.grey }}>[{d}] </span>
              <span style={{ color: sc }}>[{s}] </span>
              <span>{msg}</span>
            </p>
          ))}
        </Out>
      </Block>
    </div>
  );
}

function Projects() {
  return (
    <div>
      <Block path="~/projects" cmd="ls -t">
        <Out>
          <span style={{ color: C.cyan }}>shadow-map</span>{"  "}
          <span style={{ color: C.cyan }}>exploit-kit</span>{"  "}
          <span style={{ color: C.cyan }}>loot-tracker</span>
        </Out>
      </Block>

      <Block path="~/projects" cmd="cat README.md">
        <ProjCard
          name="shadow-map"
          lang="python"
          link="https://github.com/borismas"
          desc="lightweight network recon tool for ctf environments and home lab use. fast host discovery, service fingerprinting, clean markdown output."
          tags={["recon","networking","ctf","python"]}
        />
        <ProjCard
          name="exploit-kit"
          lang="bash / python"
          link="https://github.com/borismas"
          desc="personal ctf toolkit — exploit templates, payload generators, metadata scraper. zero to attacking on a fresh arch install in under 2 minutes."
          tags={["ctf","exploit-dev","bash","python"]}
        />
        <ProjCard
          name="loot-tracker"
          lang="rust"
          link="https://github.com/borismas"
          desc="cli tool for tracking tasks and notes with a dead-simple interface. started as a rust learning project, ended up being something i actually use every day."
          tags={["cli","rust","productivity"]}
        />
      </Block>

      <Block path="~/projects" cmd="git log --oneline -5">
        <Out>
          {[
            ["a3f91bc", "fix: shadow-map ipv6 without crashing"],
            ["77d002e", "feat: exploit-kit payload fuzzer v2"],
            ["9c1aab7", "chore: remove line that printed creds to stdout"],
            ["441ffb3", "feat: loot-tracker persistent storage"],
            ["0000001", "initial commit — works on my machine"],
          ].map(([hash, msg]) => (
            <p key={hash}>
              <span style={{ color: C.yellow }}>{hash} </span>
              <span style={{ color: hash === "0000001" ? C.grey2 : C.white }}>{msg}</span>
            </p>
          ))}
        </Out>
      </Block>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <Block cmd="cat contact.cfg">
        <Out>
          <p style={{ color: C.grey2, marginBottom: 8 }}># wtap — contact</p>
          {[
            ["email",   "contact.wtap@gmail.com", "mailto:contact.wtap@gmail.com"],
            ["github",  "github.com/borismas",    "https://github.com/borismas"],
            ["discord", "wtap.com",               null],
          ].map(([k, v, href]) => (
            <p key={k} style={{ marginBottom: 4 }}>
              <span style={{ color: C.grey2, display: "inline-block", minWidth: 80 }}>{k}</span>
              {href
                ? <a href={href} target="_blank" rel="noreferrer" style={{ color: C.green, textDecoration: "none" }}>{v}</a>
                : <span style={{ color: C.green }}>{v}</span>}
            </p>
          ))}
        </Out>
      </Block>

      <Block cmd="cat notes.txt">
        <Out>
          <p><span style={{ color: C.cyan }}>›</span> discord is fastest</p>
          <p><span style={{ color: C.cyan }}>›</span> open to collabs, ctf teams, interesting projects</p>
          <p><span style={{ color: C.grey2 }}>›</span> <span style={{ color: C.grey2 }}>not interested in crypto pitches or java jobs</span></p>
        </Out>
      </Block>
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────

const PAGES = [
  { id: "home",     label: "home",     C: Home },
  { id: "about",    label: "about",    C: About },
  { id: "hobbies",  label: "hobbies",  C: Hobbies },
  { id: "projects", label: "projects", C: Projects },
  { id: "contact",  label: "contact",  C: Contact },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toTimeString().slice(0, 8));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const Page = PAGES.find(p => p.id === page)?.C || Home;

  return (
    <div style={{
      background: C.bg, color: C.white,
      fontFamily: mono, fontSize: 13,
      minHeight: "100vh", display: "flex", flexDirection: "column",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #1f6b0a; }
      `}</style>

      {/* TOP BAR */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 32,
        background: C.bg2, borderBottom: `1px solid ${C.bd}`,
        display: "flex", alignItems: "center", zIndex: 100,
      }}>
        {/* dots */}
        <div style={{ display: "flex", gap: 6, padding: "0 14px", borderRight: `1px solid ${C.bd}`, height: "100%", alignItems: "center" }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>

        {/* title */}
        <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: C.grey }}>
          <span style={{ color: C.gmid }}>wtap</span>
          <span style={{ color: C.grey }}>@arch — zsh</span>
        </div>

        {/* nav */}
        <div style={{ display: "flex", height: "100%" }}>
          {PAGES.map(p => (
            <button key={p.id} onClick={() => setPage(p.id)} style={{
              background: page === p.id ? C.bg3 : "transparent",
              color: page === p.id ? C.green : C.grey,
              border: "none", borderLeft: `1px solid ${C.bd}`,
              padding: "0 14px", fontSize: 11, cursor: "pointer",
              fontFamily: mono,
              transition: "color 0.1s, background 0.1s",
            }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ marginTop: 32, marginBottom: 22, padding: "24px 32px", maxWidth: 700 }}>
        <Page />
      </div>

      {/* STATUS BAR */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: 22,
        background: C.bg2, borderTop: `1px solid ${C.bd}`,
        display: "flex", alignItems: "center",
        padding: "0 14px", fontSize: 11, color: C.grey, gap: 16,
      }}>
        <span style={{ color: C.gmid }}>●</span>
        <span>{page}</span>
        <span style={{ color: C.bd }}>|</span>
        <span>wtap@arch</span>
        <span style={{ color: C.bd }}>|</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
