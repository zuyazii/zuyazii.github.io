import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ASCII_TEXTURE = `................................................................................................................................................
.........................................................,.,,...................................................................................
...........................,..<-.l.JJrJJ@c..<-JZddddddaadaadadMd.............JJZ,..............................l-1..............................
......................l/<,......,.<l,-ll.........-ddadddddaa@@Mr..............................r1..........1dMadaZadJ/...........................
.......rccccr-<<..l//<l<.-cJZZZ,.1Z-..J-.caMZ.....l<Zdaaaa@aZJ<................</ddM/...........<<.cZ-ZdddJJJdJZMaaMadZZda1JaZccdaJZaZrr,,l<-<,,
../..<rcaJZdJZZZdZJJcadddaaaadadaa@@Jl<..l-JJ--....rZda@......./Jc...........ZMMc.Zaad.,ddJJZZZrMdcaadadZdaJZdaaaadadaMMddZadaadaddMZdZZaM@aJZac
......1/dZJ<-,1/ZaaaadadZZdddaaaa@.......JMa........../...................r@a@@..rrr1JZaardZZddd@aaaddddddadJdaaaddddZddZdZZdaZaMddccJ..l<-l,...
.................../aaadddaddaaaMadJZ-l..rdZdZdc.....................,r,.../,/../dZZdadadZddZdJZ@aZZddMddZZJZZZZdddddaaaaMaaaac.......<dJ.......
.....................ZdddaaaadaaaddddaZc/ZdaaZZZJ1....................</,1dJJZJcJZddaaaMad@dZdZaM@ZadZJZJrcJMaZaadddaaaadMMaZdMZ,,..............
......................<JZZdZdddaMdMadaaMZ@ad@d,........................-rd/aaJMacZ@M-c-ccd....aaMZadaMadZMMdaadMaaaaaddd@MadarZ<................
......................-dadaZadaaaaMMaZadJad1.........................daac..../,,aad..-,.lad/.<@ZJdZJdcZMMM@MadaaaaaaaaM@MdJM....<...............
.......................rdMdddaMMMMd@aJZa@-...........................11-..,<.......-rZZ@Madd.,ZZZJJZZaaZJJJZaZddaaaaa@Zc..lr.../,...............
........................./ZJaaMaM@MdMa@c.............................rMMM@dJ/J..c<....ZdMMradadaMaaM@adadaaaaaaaa@Ma@@dd<...<...................
........................../lZaa@@......r...........................1aaaMaaddaadMaJcdZcradaaJ.ZMadZ@MJJaM@@@@@@JdMaZMMdJd,.......................
.............................,aM@......l..........................dddaadddMMaadZddaMaJ.,aaM@dJJ/...,JZMZda@dJdada@@MZJ-.,.......................
..............................ldaZ</r......1......................adMaadaMaaaaM@daaMdaa..aaaZZJ......1adaa....aMM@l.....,.......................
....................................dar..........................1aJZadaaaaaMaadZdaaaaZa<r@...........d@.......cdaZr....,.......................
......................................1,-<M,@d@-...................ddaM@dMa@@addZdaaaZZMJaaM,..........<.......c..........,.....................
........................................./@ZZZd@MJZ.......................1JMaMMaadZdZZa@a@...................1.r<....J<........................
........................................-@aaMMaZaZ@a........................d@MaaaZJadZ@a.......................d/.,Zd@.........................
........................................MMaddadadJZdcdJcZ....................ddZdddaadad.........................r......l.....Z@Jc..............
.........................................@ZaadJJdZaMZZdaa@...................1dddadadaac..................................1.....l..1............
..........................................aJJaaZdZdMJdMM/....................JaaaaadMaM@....................................c@l..,..............
............................................da@a@cZMdaZ@.....................daaaaada@c...c@.............................cadaZa@drJ.............
............................................r@@MMJaZdJc.......................Jaadad@a...<M..........................<caddddda@@@ddM,...........
............................................d@@MaZZa/.........................rdaddd@.................................daaaMaM@dZZdMMal..........
............................................@d@ada@............................<aM@d..................................-a@MJl./acZaZc@...........
...........................................-@@@da...............................................................................cZcd............
..........................................,aaM<...................................................................................l..........<l.
..........................................1dMl.............................................................................................c....
..........................................r@1...................................................................................................
............................................l...................................................................................................
................................................................................................................................................
...............................................l................................................................................................
...........................................<,/r......................................,..1cJJZdZZZZaZ...-JJZdddddddMdddZZddddddddadJr/1l.........
.......................l..l....lJrrrc1ll1-1rrZ@r..................rcZZdZdddaaaMdJddadddaaacrJaaaaddJZJr..cZdaaZdZZMJ1adZaMadadl-daaaaaaM@@-.....
.........,rdcJdMMMaaadaaddaddJZZdadddaZr/...........</,...rdZZMaMMaadJJZcrr-l...rcJddddcr-...-1l...........JdaaaaaaaaaaadcrrJad<1JaaaaM@@1......
...........,,.,,,ll<<,<llllllll<l<ll,llllll.........,...,,,ll,,lll...,.....l,..................................,llllllllll<lllllllllllll........
................................................................................................................................................`;

const DESKTOP_GLOBE_WIDTH = 120;
const DESKTOP_GLOBE_HEIGHT = 90;
const MOBILE_GLOBE_WIDTH = 100;
const MOBILE_GLOBE_HEIGHT = 75;
// const DESKTOP_RADIUS = 40;
const NUM_STARS = 60;
const TOPBAR_HEIGHT = 56;
const MENU_TOPBAR_HEIGHT = 80;
const MOBILE_FONT_SIZE = 8;
const MOBILE_LINE_HEIGHT = "7px";
const DESKTOP_FONT_SIZE = 15;

const menuItems = [
  { label: "Landing...", href: "/", current: true },
  { label: "About_Me", href: "/about", current: false },
];

function getCharWidth(fontSize: number, fontFamily: string) {
  // Create a hidden span to measure the width of a single character
  const span = document.createElement("span");
  span.innerText = "A";
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.style.fontSize = fontSize + "px";
  span.style.fontFamily = fontFamily;
  document.body.appendChild(span);
  const width = span.getBoundingClientRect().width;
  document.body.removeChild(span);
  return width;
}

function useAsciiGlobe(
  isMobile: boolean,
  globeSize: { width: number; height: number },
  starFieldSize: { width: number; height: number }
) {
  const [ascii, setAscii] = React.useState("");
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const friction = 0.96;
  const lastMouseX = useRef<number | null>(null);
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const stars = useRef(
    Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * starFieldSize.width,
      y: Math.random() * starFieldSize.height,
      speed: isMobile
        ? 0.01 + Math.random() * 0.003 // Faster for mobile
        : 0.005 + Math.random() * 0.001, // Original for desktop
      char: Math.random() > 0.5 ? "o" : ".",
      twinkle: Math.random() * Math.PI * 2,
    }))
  );
  const texture = React.useMemo(() => ASCII_TEXTURE.split("\n"), []);
  const texW = texture[0].length;
  const texH = texture.length;

  // Touch/drag logic
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseX.current !== null) {
        const dx = e.clientX - lastMouseX.current;
        velocityRef.current = dx * 0.0001;
      }
      lastMouseX.current = e.clientX;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  React.useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        lastTouch.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && lastTouch.current) {
        const dx = e.touches[0].clientX - lastTouch.current.x;
        const dy = e.touches[0].clientY - lastTouch.current.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          velocityRef.current = dx * 0.0006;
          e.preventDefault();
        }
        lastTouch.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  React.useEffect(() => {
    function render() {
      const output = Array(starFieldSize.height)
        .fill("")
        .map(() => Array(starFieldSize.width).fill(" "));
      // Draw stars
      for (const s of stars.current) {
        const sx = Math.floor(s.x);
        const sy = Math.floor(s.y);
        if (
          sy >= 0 &&
          sy < starFieldSize.height &&
          sx >= 0 &&
          sx < starFieldSize.width
        ) {
          const tw = Math.abs(Math.sin(s.twinkle));
          output[sy][sx] = tw > 0.5 ? s.char : " ";
        }
      }
      // Center the globe in the starfield
      const cx = Math.floor(starFieldSize.width / 2) - (isMobile ? 0 : 5);
      const cy = Math.floor(starFieldSize.height / 2);
      const globeWidth = globeSize.width;
      const globeHeight = globeSize.height;
      const radius = globeWidth / 2;
      for (let y = 0; y < globeHeight; y++) {
        for (let x = 0; x < globeWidth; x++) {
          const dx = (x - globeWidth / 2) / radius;
          const dy = ((y - globeHeight / 2) / radius) * (isMobile ? 1.8 : 1.6);
          const dist = dx * dx + dy * dy;
          if (dist <= 1.0) {
            const dz = Math.sqrt(1.0 - dist);
            const xp = dx;
            const yp = dy;
            const zp = dz;
            const angle = angleRef.current;
            const xr = xp * Math.cos(angle) - zp * Math.sin(angle);
            const zr = xp * Math.sin(angle) + zp * Math.cos(angle);
            const u = Math.atan2(xr, zr) / (2 * Math.PI) + 0.5;
            const v = (yp + 1) / 2;
            const tx = Math.floor(u * texW);
            const ty = Math.floor(v * texH);
            if (ty >= 0 && ty < texH && tx >= 0 && tx < texW) {
              const ch = texture[ty][tx];
              const px = Math.floor(cx - globeWidth / 2 + x);
              const py = Math.floor(cy - globeHeight / 2 + y);
              if (
                py >= 0 &&
                py < starFieldSize.height &&
                px >= 0 &&
                px < starFieldSize.width
              ) {
                output[py][px] = ch === "." ? " " : ch;
              }
            }
          }
        }
      }
      setAscii(output.map((row) => row.join("")).join("\n"));
    }
    let running = true;
    function animate() {
      angleRef.current += velocityRef.current;
      velocityRef.current *= friction;
      if (Math.abs(velocityRef.current) < 0.0001) velocityRef.current = 0;
      // Animate stars
      for (const s of stars.current) {
        s.x -= s.speed;
        if (s.x < 0) {
          s.x = starFieldSize.width - 1;
          s.y = Math.floor(Math.random() * starFieldSize.height);
          s.char = Math.random() > 0.5 ? "o" : ".";
        }
        s.twinkle += 0.1 + Math.random() * 0.1;
      }
      render();
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, [texture, texW, texH, starFieldSize, globeSize]);

  return ascii;
}

function PlusCrossIcon({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  // Animates plus to cross and vice versa
  return (
    <button
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        transition: "transform 0.3s",
      }}
    >
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.3s",
          transform: open ? "rotate(-45deg)" : "rotate(0deg)",
          transformOrigin: "50% 50%",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.1153 1.96182H11.8259L11.9393 8.37204H10.2287L10.1153 1.96182ZM10.2287 12.6574H11.9393L11.8259 19.0676H10.1153L10.2287 12.6574ZM13.2267 9.65941H19.5235V11.37L13.2267 11.37V9.65941ZM2.41772 9.65941H8.94134V11.37H2.41772V9.65941Z"
            fill="white"
          />
        </svg>
      </span>
    </button>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconCross, setIconCross] = useState(false); // for animation
  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
  // Globe size for mobile/desktop
  const globeSize = isMobile
    ? { width: MOBILE_GLOBE_WIDTH, height: MOBILE_GLOBE_HEIGHT }
    : { width: DESKTOP_GLOBE_WIDTH, height: DESKTOP_GLOBE_HEIGHT };
  const [starFieldSize, setStarFieldSize] = useState(() => {
    if (isMobile && typeof window !== "undefined") {
      const charWidth = getCharWidth(
        MOBILE_FONT_SIZE,
        "Ubuntu Mono, monospace"
      );
      const width = Math.floor(window.innerWidth / charWidth);
      const globeWidth = width - 4;
      globeSize.width = globeWidth;
      globeSize.height = Math.floor(globeWidth * 0.8);
      return {
        width,
        height: globeSize.height + 8,
      };
    } else {
      return {
        width: Math.floor(window.innerWidth / 10),
        height: DESKTOP_GLOBE_HEIGHT + (DESKTOP_GLOBE_HEIGHT % 2 === 0 ? 9 : 8),
      };
    }
  });
  const ascii = useAsciiGlobe(isMobile, globeSize, starFieldSize);
  const location = useLocation();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  // Responsive starfield size (fix infinite loop)
  useEffect(() => {
    function updateStarFieldSize() {
      if (isMobile && typeof window !== "undefined") {
        const charWidth = getCharWidth(
          MOBILE_FONT_SIZE,
          "Ubuntu Mono, monospace"
        );
        const width = Math.floor(window.innerWidth / charWidth);
        const globeWidth = width - 4;
        globeSize.width = globeWidth;
        globeSize.height = Math.floor(globeWidth * 0.8);
        setStarFieldSize({
          width,
          height: globeSize.height + 8,
        });
      } else {
        setStarFieldSize({
          width: Math.floor(window.innerWidth / 10),
          height:
            DESKTOP_GLOBE_HEIGHT + (DESKTOP_GLOBE_HEIGHT % 2 === 0 ? 9 : 8),
        });
      }
    }
    window.addEventListener("resize", updateStarFieldSize);
    updateStarFieldSize();
    return () => window.removeEventListener("resize", updateStarFieldSize);
  }, [isMobile, globeSize.width, globeSize.height]);

  // Menu open/close animation logic for mobile
  const handleMenuOpen = () => {
    setIconCross(true);
    setTimeout(() => setMenuOpen(true), 200);
  };
  const handleMenuClose = () => {
    setIconCross(false);
    setTimeout(() => setMenuOpen(false), 200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#000",
        fontFamily: "Ubuntu Mono, monospace",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          width: "100vw",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: isMobile ? "0 26px" : "0 60px",
          height: isMobile ? MENU_TOPBAR_HEIGHT : TOPBAR_HEIGHT,
          boxSizing: "border-box",
          fontSize: isMobile ? 18 : 22,
          letterSpacing: "1px",
        }}
      >
        <div
          style={{
            fontWeight: 400,
            fontSize: isMobile ? 18 : 20,
            letterSpacing: 1,
            marginBottom: 6,
          }}
        >
          likhochan.
        </div>
        {isMobile ? (
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
          >
            <PlusCrossIcon open={iconCross} onClick={handleMenuOpen} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: 40,
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            {menuItems.slice(1).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 20,
                  fontFamily: "Ubuntu Mono, monospace",
                  fontWeight: location.pathname === item.href ? 700 : 400,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* Mobile Menu Overlay */}
      {menuOpen && isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#000",
            color: "#fff",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "0 26px",
              height: MENU_TOPBAR_HEIGHT,
              fontSize: 18,
            }}
          >
            <div style={{ fontWeight: 400, marginBottom: 6, letterSpacing: 1 }}>
              likhochan.
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
            >
              <PlusCrossIcon open={iconCross} onClick={handleMenuClose} />
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: 24,
              gap: 24,
            }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                style={{
                  fontWeight: location.pathname === item.href ? 700 : 400,
                  fontSize: 20,
                  color: "#fff",
                  marginBottom: 0,
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                  marginLeft: 0,
                  letterSpacing: 0,
                  minHeight: 32,
                  textDecoration: "none",
                }}
                onClick={() => setMenuOpen(false)}
              >
                <span
                  style={{
                    width: 18,
                    display: "inline-block",
                    textAlign: "left",
                    fontWeight: location.pathname === item.href ? 700 : 400,
                  }}
                >
                  {location.pathname === item.href ? ">" : ""}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Main content: starfield fills all, globe is centered and smaller */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "center",
          width: "100vw",
          height: `calc(100vh - ${
            isMobile ? MENU_TOPBAR_HEIGHT : TOPBAR_HEIGHT
          }px)`,
          background: "#000",
          overflow: "hidden",
          padding: 0,
          margin: 0,
          marginTop: isMobile ? 40 : 0,
        }}
      >
        <pre
          style={{
            fontFamily: "Ubuntu Mono, monospace",
            fontSize: isMobile ? MOBILE_FONT_SIZE : DESKTOP_FONT_SIZE,
            lineHeight: isMobile ? MOBILE_LINE_HEIGHT : "12px",
            whiteSpace: "pre",
            textAlign: "center",
            color: "#fff",
            background: "transparent",
            userSelect: "none",
            display: "block",
            margin: 0,
            padding: 0,
            width: isMobile ? "100vw" : "auto",
            maxWidth: "100vw",
            overflowX: "auto",
            height: isMobile ? "auto" : "auto",
            overflow: "visible",
            position: "relative",
            transform: "scale(0.95)",
            marginTop: isMobile ? 24 : 0,
          }}
        >
          {ascii}
        </pre>
      </div>
    </div>
  );
}
