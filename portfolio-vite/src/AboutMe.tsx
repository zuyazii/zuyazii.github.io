import { useState, useEffect } from "react";

const menuStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: 20,
  fontFamily: "Ubuntu Mono, monospace",
  fontWeight: 400,
};

const inputStyle = {
  background: "none",
  color: "#fff",
  border: "1px solid #9F9F9F",
  padding: "8px 12px",
  fontFamily: "inherit",
  fontSize: 16,
  outline: "none",
  width: "100%",
};

const asciiArt = `::::::::::::::::::::::::::::::::::::::::::::::::-=++*++****+=-::-:::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::-+#%%%%%%%%%%###**++=-:::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::-+#%%%%%%%%%%%%%%%%%##*+=-:::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::-:-=#%%%%%%%%%@@%%%%%%%%%#**+++-:::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::=+*##***#@@@@@@@%%@@@@@@@@%%%%%##***#=::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::=+#%%%%%%%%%%%@@@@@@%%@@@@@@@@@%%%%#####*+:::::::::::::::::::::::::::
:::::::::::::::::::::::::::-=*%%%%%%%%%%%%@@@@%%@@@@@%@@@@@@@@@%%%%######*=:::::::::::::::::::::::::
:::::::::::::::::::::::::=+#%%%@@@@@@@@@@@%%%%#######%%%%%@@@@@@@%%%%%%%%%%*-:::::::::::::::::::::::
::::::::::::::::::::::::-=*%@@@@@@@@@%%%%##************####%%%@@@@@@%%%%%%%%#-::::::::::::::::::::::
::::::::::::::::::::::::-*%%@@@@@@@%%##*******************####%%@@@@@@@%%%%%%#-:::::::::::::::::::::
::::::::::::::::::::::::+%@@@@@@@@%##***********************####%%@@@@@@@%%%%%=:::::::::::::::::::::
:::::::::::::::::::::::-%@@@@@@@@%##************++++**********###%@@@@@@@@@%%%#:::::::::::::::::::::
::::::::::::::::::::::=#%@@@@@@@@%#************++++++***********##%@@@@@@@@@@%%-::::::::::::::::::::
:::::::::::::::::::::::*%%%@@@@@%#*********++++++++++++*********##%%@@@@@@@@@%*:::::::::::::::::::::
:::::::::::::::::::::::::+%@@@@%#***********+++++++++++***########%%%@@@@@@@@#-:::::::::::::::::::::
::::::::::::::::::::::::::-#@@@#**###########**++++++***##########%%%@@@@@@#=:::::::::::::::::::::::
:::::::::::::::::::::::::::-#%%%****************++++*************###%@@@@@#-::::::::::::::::::::::::
::::::::::::::::::::::::::::+####*****#####******++*******#%%#######%%%%#+::::::::::::::::::::::::::
:::::::::::::::::::::::::::::+*#*#*******#******#***###***********###%#*-:::::::::::::::::::::::::::
::::::::::::::::::::::::::::::+#++*+++++++++++**#*+**#**++++*******####=::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::-**+**+++++++++++**+++*#**++++++++******=:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::-*+++*++++++++****+++*****++++++*****=:::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::-+++++++++++**++++++***+++++++++*+:::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::-+++++++++++***+++****++++++++**::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::-+++++++++++*+++++**++++++++**-::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::+++++++++**+++++**+++++++*+::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::-**+++++**********#**++++*+:::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::-=#**+++++++++++*****+++***+:::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::-=#+==#*+++++++++++++++++++***+-::=-:::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::-+*#%%@#==-=#*++++++++++++++++***++-:--+%#**-:::::::::::::::::::::::::::::
:::::::::::::::::::--=+*##%@@%@%@*===-=***+++++++++++++++++-:---=%%%%@%#==-:::::::::::::::::::::::::
::::::::::::::-=+*###%%%%%@@@%@%@#====--=+*+++++++++++++=-------#@%%%%%%**++++=--:::::::::::::::::::
::::::::::-=*###%%%%%%%%%%@@@%@%@%===-----=++++++++++=-----==-=#@%%%%@%%******+*+++==-::::::::::::::
::::::::=*#######%%%%%%%#%%@@%@%%@*----------=++==-----------=#@%%%%%@@#**************++=-::::::::::
:::::=+######%%%###%%%%%##%@@%%%%%%+-----------------------::*@%%%%%@@%##**#*************+++=:::::::
:::=######%##%%#####%%%%%#%%@@%%%%@%=--------------------:::*%%%%%%@@@###*#####************+++==-:::
:-#@%###########%####%%%%##%%@@%%%%@%=---==-----------:::::*%%%%%%@@@%#**########***************%#=:
:#@@%#################%#####%@@@%%%%%%+--=----------::::::*%%%%%%@@@##*####################*****%@@%
*@%@%%#######################%@@@%%%%%%*==-----------::::*%%%%%%@@@%#######################****#%%%@
%%@@@%########################%@@@%%%%%%*=----------====#%%%%%%@@@##########################***%%%%%
%%@@@%#########################%@@@%%%%%%#=---------+#%%%%%%%%@@%############################*#%%%%%
+@%@@@%#########################%%@@%%%%%%%*=-----=*%%%%%%%%@@@%##############################%%%%%%
:%@%@@%##########################%%@@%%%%%%%%*=-=*%%%%%%%%%@@@%##############################%@%%%%%
:+@%@@@%###########################%@@@%%%%%%%%#%@%%%%%%%@@@%#########################%####%%@%%%%%%
:-%@@@@@%###########################%%@@@%%%%%%%%%%%%%%@@@@%#########################%%###%%@@%%%%%+
`;

// Copy menuItems from App.tsx
const menuItems = [
  { label: "Landing...", href: "/", current: false },
  { label: "About_Me", href: "/about", current: true },
];

// PlusCrossIcon copied from App.tsx
function PlusCrossIcon({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
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

// Crop ASCII art for mobile view
function getCroppedAsciiArt(asciiArt: string, isMobile: boolean) {
  if (!isMobile) return asciiArt;
  const crop = 8; // number of chars to crop from each side
  return asciiArt
    .split("\n")
    .map((line) => (line.length > crop * 2 ? line.slice(crop, -crop) : line))
    .join("\n");
}

export default function AboutMe() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 700
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconCross, setIconCross] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const handleMenuOpen = () => {
    setIconCross(true);
    setTimeout(() => setMenuOpen(true), 200);
  };
  const handleMenuClose = () => {
    setIconCross(false);
    setTimeout(() => setMenuOpen(false), 200);
  };

  // Shared section style for About Me and Say Hello
  const sectionStyle = {
    maxWidth: isMobile ? 380 : 1100,
    margin: isMobile ? "24px auto 0" : "40px auto 0",
    padding: isMobile ? 28 : 24,
  };

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "Ubuntu Mono, monospace",
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
          height: isMobile ? 80 : 56,
          boxSizing: "border-box",
          fontSize: isMobile ? 18 : 22,
          letterSpacing: "1px",
        }}
      >
        <a
          href="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 400,
            fontSize: isMobile ? 18 : 20,
            letterSpacing: 1,
            marginBottom: 6,
          }}
        >
          likhochan.
        </a>
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
            <a href="/about" style={menuStyle}>
              About_Me
            </a>
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
              height: 80,
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
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontWeight: item.current ? 700 : 400,
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
              >
                <span
                  style={{
                    width: 18,
                    display: "inline-block",
                    textAlign: "left",
                    fontWeight: item.current ? 700 : 400,
                  }}
                >
                  {item.current ? ">" : ""}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      {/* About Me Section */}
      <div style={sectionStyle}>
        <div
          style={{
            fontSize: isMobile ? 22 : 32,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          ./About_Me.txt
        </div>
        <hr style={{ border: "1px solid #fff", marginBottom: 32 }} />
        <div
          style={{
            display: isMobile ? "block" : "flex",
            gap: isMobile ? 0 : 32,
            alignItems: isMobile ? undefined : "flex-start",
          }}
        >
          {/* Mobile: ASCII art above text, Desktop: side by side */}
          {isMobile ? (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  minWidth: 0,
                  marginBottom: 24,
                }}
              >
                <pre
                  style={{
                    width: "100%",
                    maxWidth: 320,
                    height: 340,
                    fontSize: "7px",
                    lineHeight: "9px",
                    background: "#000",
                    color: "#fff",
                    padding: 4,
                    borderRadius: 4,
                    margin: 0,
                    overflow: "hidden",
                    textAlign: "left",
                    display: "block",
                    whiteSpace: "pre",
                  }}
                >
                  {getCroppedAsciiArt(asciiArt, isMobile)}
                </pre>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  fontSize: 16,
                  lineHeight: 1.7,
                  textAlign: "left",
                  marginBottom: 0,
                }}
              >
                <p>
                  I'm a electrical engineering student studying in the City
                  University of Hong Kong.
                </p>
                <p>
                  Interested in software development, game development (Godot
                  and Java), and website design, and have hands on experience
                  with them.
                </p>
                <p>
                  I'm passionate about making something people can interact
                  with, while trying to make the whole interaction fun.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Left: About text */}
              <div
                style={{
                  maxWidth: 420,
                  fontSize: 20,
                  lineHeight: 1.7,
                  textAlign: "left",
                  marginBottom: 0,
                }}
              >
                <p>
                  I'm a electrical engineering student studying in the City
                  University of Hong Kong.
                </p>
                <p>
                  Interested in software development, game development (Godot
                  and Java), and website design, and have hands on experience
                  with them.
                </p>
                <p>
                  I'm passionate about making something people can interact
                  with, while trying to make the whole interaction fun.
                </p>
              </div>
              {/* Right: ASCII Art, responsive and no scroll */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  minWidth: 0,
                }}
              >
                <pre
                  style={{
                    width: "100%",
                    maxWidth: 600,
                    height: 520,
                    fontSize: "10px",
                    lineHeight: "13px",
                    background: "#000",
                    color: "#fff",
                    padding: 12,
                    borderRadius: 4,
                    margin: 0,
                    overflow: "hidden",
                    textAlign: "center",
                    display: "block",
                    whiteSpace: "pre",
                  }}
                >
                  {asciiArt}
                </pre>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Say Hello Section (with border and improved layout) */}
      <div
        style={{
          ...sectionStyle,
          margin: isMobile ? "32px auto 0" : "60px auto 0",
        }}
      >
        <div
          style={{
            fontSize: isMobile ? 22 : 32,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          ./Say_Hello.txt
        </div>
        <hr style={{ border: "1px solid #fff", marginBottom: 32 }} />
        <div
          style={{
            display: isMobile ? "block" : "flex",
            gap: isMobile ? 0 : 32,
          }}
        >
          {/* Left: Contact info, larger and bolder */}
          <div
            style={{
              maxWidth: isMobile ? "100%" : 460,
              fontSize: isMobile ? 16 : 22,
              lineHeight: 1.7,
              fontWeight: 600,
              whiteSpace: "pre-line",
              marginBottom: isMobile ? 24 : 0,
            }}
          >
            {`Looking to start a new project or just want to say hi? Send me an email and I'll do my best to reply within 24 hrs!

If contact forms aren't your thing... send me an email at `}
            <a
              href="mailto:likhochan@proton.me"
              style={{
                color: "#fff",
                textDecoration: "underline",
                wordBreak: "break-all",
              }}
            >
              likhochan@proton.me
            </a>
            !
          </div>
          {/* Right: Contact form (vertical, with labels) */}
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              fontSize: isMobile ? 15 : 18,
              justifyContent: "flex-start",
              maxWidth: isMobile ? "100%" : 600,
              marginLeft: isMobile ? 0 : undefined,
              flex: isMobile ? undefined : 1,
            }}
            action="#"
            method="POST"
          >
            <label
              style={{
                fontSize: isMobile ? 15 : 18,
                marginBottom: 4,
                fontWeight: 400,
              }}
            >
              Name *
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 0 : 12,
                  marginTop: 4,
                }}
              >
                <input
                  name="firstName"
                  placeholder="First Name"
                  required
                  style={{
                    ...inputStyle,
                    marginBottom: isMobile ? 12 : 0,
                    width: isMobile ? "93%" : "50%",
                  }}
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  required
                  style={{
                    ...inputStyle,
                    width: isMobile ? "93%" : "50%",
                  }}
                />
              </div>
            </label>
            <label
              style={{
                fontSize: isMobile ? 15 : 18,
                marginBottom: 4,
                fontWeight: 400,
              }}
            >
              Inquiry *
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 0 : 12,
                  marginTop: 4,
                }}
              >
                <input
                  name="inquiry"
                  placeholder="Collab/Client"
                  required
                  style={{
                    ...inputStyle,
                    marginBottom: isMobile ? 12 : 0,
                    width: isMobile ? "93%" : "50%",
                  }}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="hello@email.com"
                  required
                  style={{
                    ...inputStyle,
                    width: isMobile ? "93%" : "50%",
                  }}
                />
              </div>
            </label>
            <label
              style={{
                fontSize: isMobile ? 15 : 18,
                marginBottom: 4,
                fontWeight: 400,
              }}
            >
              Message *
              <textarea
                name="message"
                placeholder="Hello..."
                required
                style={{
                  ...inputStyle,
                  minHeight: 100,
                  fontSize: isMobile ? 15 : 18,
                  marginTop: 4,
                  maxWidth: isMobile ? "100%" : 600,
                  width: "100%",
                  boxSizing: "border-box",
                  display: "block",
                  border: "1px solid #9F9F9F",
                }}
              />
            </label>
            <button
              type="submit"
              style={{
                background: "none",
                color: "#fff",
                border: "1px solid #9F9F9F",
                padding: "8px 24px",
                fontFamily: "inherit",
                fontSize: isMobile ? 15 : 18,
                cursor: "pointer",
                marginTop: 8,
                width: 120,
                alignSelf: "flex-start",
                borderRadius: 0,
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
      {/* Extra space below Say Hello section */}
      <div style={{ height: isMobile ? 60 : 250 }} />
    </div>
  );
}
