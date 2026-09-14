import "./globals.css";

export const metadata = {
  title: "whatoddly — 그 일이 일어날 확률",
  description:
    "궁금한 상황을 문장으로 입력하면 그 일이 일어날 확률을 재미있게 알려드려요. 코끼리가 점프할 확률부터 내일 지각할 확률까지.",
  metadataBase: new URL("https://whatoddly.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "whatoddly — 그 일이 일어날 확률",
    description: "그 일이 일어날 확률, 숫자로 알려드릴게요.",
    url: "https://whatoddly.com",
    siteName: "whatoddly",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "whatoddly — 그 일이 일어날 확률",
    description: "그 일이 일어날 확률, 숫자로 알려드릴게요.",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "whatoddly",
  url: "https://whatoddly.com",
  description:
    "궁금한 상황을 문장으로 입력하면 그 일이 일어날 확률을 재미로 알려주는 사이트입니다.",
};

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/examples", label: "예시모음" },
  { href: "/categories", label: "카테고리" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "소개" },
];

const FOOTER_LINKS = [
  { href: "/about", label: "소개" },
  { href: "/examples", label: "예시모음" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "문의" },
  { href: "/terms", label: "이용약관" },
  { href: "/privacy-policy", label: "개인정보처리방침" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <meta
          name="google-site-verification"
          content="Mj90tiyP9sBN6uiQ3VRupUk_xHpjOdI3PCdU7dO0ufg"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="site-header">
          <a href="/" className="brand">
            ✨ whatoddly
          </a>
          <nav className="nav">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="footer-links">
            {FOOTER_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <p className="footer-note">
            whatoddly가 제공하는 확률은 통계적 근거가 없는 재미 콘텐츠입니다.
          </p>
        </footer>
      </body>
    </html>
  );
}
