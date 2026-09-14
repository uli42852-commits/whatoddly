"use client";

import { useState, useEffect } from "react";
import { Sparkles, Share2, RotateCcw } from "lucide-react";
import {
  CATEGORIES,
  isSensitive,
  computeResult,
  EXAMPLES,
  CURATED_EXAMPLES,
} from "./lib/probability";


const CONFETTI_COLORS = [
  "#F2B84B",
  "#F26B5B",
  "#3E9C8C",
  "#F2B84B",
  "#8A6FE8",
  "#F26B5B",
  "#3E9C8C",
  "#F2B84B",
  "#8A6FE8",
  "#F26B5B",
  "#3E9C8C",
  "#F2B84B",
];

const RARITY_INFO = {
  common: { label: "COMMON", color: "#9CA3AF", flavor: "흔하지만 나쁘지 않은 결과예요." },
  uncommon: { label: "UNCOMMON", color: "#3E9C8C", flavor: "오, 살짝 특별한데요?" },
  rare: { label: "RARE", color: "#4C8DF2", flavor: "이건 꽤 보기 힘든 결과예요." },
  epic: { label: "EPIC", color: "#8A6FE8", flavor: "축하해요, 상당히 희귀한 결과입니다." },
  legendary: { label: "LEGENDARY", color: "#F2B84B", flavor: "이 정도면 자랑해도 됩니다." },
  mythic: { label: "MYTHIC", color: "#F26B5B", flavor: "이건 일어나면 주변 사람들에게 바로 알려야 합니다." },
};

const RARITY_WEIGHTS = { common: 40, uncommon: 25, rare: 15, epic: 10, legendary: 6, mythic: 4 };

const DEX_ITEMS = [
  { id: "d01", query: "오늘 하루가 무난하게 지나갈 확률", rarity: "common", image: "/images/dex/d01.webp" },
  { id: "d02", query: "오늘 저녁에 뭘 먹을지 고민할 확률", rarity: "common", image: "/images/dex/d02.webp" },
  { id: "d03", query: "오늘 커피를 마실 확률", rarity: "common", image: "/images/dex/d03.webp" },
  { id: "d04", query: "오늘 문자를 받을 확률", rarity: "common", image: "/images/dex/d04.webp" },
  { id: "d05", query: "오늘 날씨를 확인할 확률", rarity: "common", image: "/images/dex/d05.webp" },
  { id: "d06", query: "오늘 물을 마실 확률", rarity: "common", image: "/images/dex/d06.webp" },
  { id: "d07", query: "오늘 화장실에 갈 확률", rarity: "common", image: "/images/dex/d07.webp" },
  { id: "d08", query: "오늘 핸드폰을 5분 이상 볼 확률", rarity: "common", image: "/images/dex/d08.webp" },
  { id: "d09", query: "오늘 누군가와 대화할 확률", rarity: "common", image: "/images/dex/d09.webp" },
  { id: "d10", query: "오늘 웃을 일이 생길 확률", rarity: "common", image: "/images/dex/d10.webp" },
  { id: "d11", query: "오늘 길에서 돈을 주울 확률", rarity: "uncommon", image: "/images/dex/d11.webp" },
  { id: "d12", query: "오늘 좋은 일이 생길 확률", rarity: "uncommon", image: "/images/dex/d12.webp" },
  { id: "d13", query: "무인도에서 살아남을 확률", rarity: "uncommon", image: "/images/dex/d13.webp" },
  { id: "d14", query: "평생 한 번도 지각하지 않을 확률", rarity: "uncommon", image: "/images/dex/d14.webp" },
  { id: "d15", query: "꿈에서 본 일이 실제로 일어날 확률", rarity: "uncommon", image: "/images/dex/d15.webp" },
  { id: "d16", query: "갑자기 부자가 될 확률", rarity: "uncommon", image: "/images/dex/d16.webp" },
  { id: "d17", query: "길에서 연예인을 만날 확률", rarity: "rare", image: "/images/dex/d17.webp" },
  { id: "d18", query: "첫눈에 반할 확률", rarity: "rare", image: "/images/dex/d18.webp" },
  { id: "d19", query: "벼락을 맞을 확률", rarity: "rare", image: "/images/dex/d19.webp" },
  { id: "d20", query: "갑자기 유명인이 될 확률", rarity: "rare", image: "/images/dex/d20.webp" },
  { id: "d21", query: "로또 1등에 당첨될 확률", rarity: "rare", image: "/images/dex/d21.webp" },
  { id: "d22", query: "초능력이 생길 확률", rarity: "rare", image: "/images/dex/d22.webp" },
  { id: "d23", query: "UFO를 볼 확률", rarity: "epic", image: "/images/dex/d23.webp" },
  { id: "d24", query: "외계인을 만날 확률", rarity: "epic", image: "/images/dex/d24.webp" },
  { id: "d25", query: "시간여행을 할 확률", rarity: "epic", image: "/images/dex/d25.webp" },
  { id: "d26", query: "평행세계로 넘어갈 확률", rarity: "epic", image: "/images/dex/d26.webp" },
  { id: "d27", query: "지구가 멈추는 걸 목격할 확률", rarity: "legendary", image: "/images/dex/d27.webp" },
  { id: "d28", query: "타임머신을 발명할 확률", rarity: "legendary", image: "/images/dex/d28.webp" },
  { id: "d29", query: "신을 만날 확률", rarity: "mythic", image: "/images/dex/d29.webp" },
  { id: "d30", query: "우주의 끝을 보는 확률", rarity: "mythic", image: "/images/dex/d30.webp" },
];

function drawDexItem() {
  const tiers = Object.keys(RARITY_WEIGHTS);
  const total = tiers.reduce((sum, t) => sum + RARITY_WEIGHTS[t], 0);
  let r = Math.random() * total;
  let chosenTier = tiers[0];
  for (const t of tiers) {
    if (r < RARITY_WEIGHTS[t]) {
      chosenTier = t;
      break;
    }
    r -= RARITY_WEIGHTS[t];
  }
  const pool = DEX_ITEMS.filter((d) => d.rarity === chosenTier);
  return pool[Math.floor(Math.random() * pool.length)];
}

const DEX_STORAGE_KEY = "whatoddly_dex_v1";

function DexImage({ src, alt, size }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 10,
          background: "#EDE9DD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.4,
        }}
      >
        🎲
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

export default function HomeClient({ initialQuery }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [discovered, setDiscovered] = useState([]);
  const [showDex, setShowDex] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DEX_STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setDiscovered(saved);
    } catch {}
  }, []);

  const saveDiscovered = (id) => {
    const isNew = !discovered.includes(id);
    if (isNew) {
      const next = [...discovered, id];
      setDiscovered(next);
      try {
        localStorage.setItem(DEX_STORAGE_KEY, JSON.stringify(next));
      } catch {}
    }
    return isNew;
  };

  const handleDexDraw = () => {
    const item = drawDexItem();
    const r = computeResult(item.query);
    const merged = { ...r, rarity: item.rarity, dexId: item.id, dexImage: item.image };
    setQuery(item.query);
    setResult(merged);
    setHistory((prev) => {
      const next = [
        { query: item.query, percent: r.percent, label: r.category.label },
        ...prev.filter((h) => h.query !== item.query),
      ];
      return next.slice(0, 5);
    });
    const isNew = saveDiscovered(item.id);
    if (isNew) {
      setJustUnlocked(true);
      setTimeout(() => setJustUnlocked(false), 1200);
    } else {
      setJustUnlocked(false);
    }
  };

  const openDexItem = (item) => {
    const r = computeResult(item.query);
    setJustUnlocked(false);
    setQuery(item.query);
    setResult({ ...r, rarity: item.rarity, dexId: item.id, dexImage: item.image });
  };

  const handleShare = async () => {
    const url = `${
      typeof window !== "undefined" ? window.location.origin : ""
    }/?q=${encodeURIComponent(query)}`;
    const rarityLabel = result?.rarity ? RARITY_INFO[result.rarity].label + " · " : "";
    const text = `"${query}" 확률은 ${result?.percent}% (${rarityLabel}${result?.category?.label}) — whatoddly에서 확인해보세요`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "whatoddly", text, url });
        return;
      } catch {
        // 사용자가 공유를 취소한 경우 등 — 조용히 링크 복사로 넘어감
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const draw = (text) => {
    if (isSensitive(text)) {
      setQuery(text);
      setResult({ sensitive: true });
      return;
    }
    const r = computeResult(text);
    setQuery(text);
    setResult(r);
    setHistory((prev) => {
      const next = [
        { query: text, percent: r.percent, label: r.category.label },
        ...prev.filter((h) => h.query !== text),
      ];
      return next.slice(0, 5);
    });
  };

  useEffect(() => {
    if (initialQuery) {
      setInput(initialQuery);
      draw(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    draw(input.trim());
  };

  const handleExample = (ex) => {
    setInput(ex);
    draw(ex);
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    setQuery("");
    setCopied(false);
  };

  return (
    <div style={{ maxWidth: 460, margin: "0 auto", padding: "28px 20px 64px" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            letterSpacing: 1,
            color: "#F2B84B",
            marginBottom: 10,
          }}
        >
          <Sparkles size={14} />
          <span>whatoddly</span>
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 30,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          그 일이 일어날 확률,
          <br />
          숫자로 알려드릴게요
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            background: "#26264D",
            borderRadius: 14,
            padding: 6,
            border: "1px solid #3A3A6B",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="예: 코끼리가 점프할 확률"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#F6F3ED",
              fontSize: 15,
              padding: "10px 12px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#F2B84B",
              color: "#1B1B3A",
              border: "none",
              borderRadius: 10,
              padding: "0 18px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            뽑기
          </button>
        </div>
      </form>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button
          onClick={handleDexDraw}
          style={{
            flex: 1,
            background: "#26264D",
            border: "1px solid #F2B84B",
            color: "#F2B84B",
            borderRadius: 12,
            padding: "12px 0",
            fontWeight: 700,
            fontSize: 14.5,
            cursor: "pointer",
          }}
        >
          🎲 랜덤 확률 뽑기
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          onClick={() => setShowDex((v) => !v)}
          style={{
            background: "transparent",
            border: "none",
            color: "#B9B6D6",
            fontSize: 12.5,
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          📖 확률 도감 · {discovered.length} / {DEX_ITEMS.length} 발견 (수집률{" "}
          {Math.round((discovered.length / DEX_ITEMS.length) * 100)}%)
        </button>
      </div>

      {showDex && (
        <div
          style={{
            marginBottom: 24,
            background: "#20203F",
            border: "1px solid #2E2E5C",
            borderRadius: 14,
            padding: 14,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {DEX_ITEMS.map((item) => {
              const found = discovered.includes(item.id);
              const info = RARITY_INFO[item.rarity];
              return (
                <button
                  key={item.id}
                  onClick={() => found && openDexItem(item)}
                  style={{
                    textAlign: "left",
                    background: "#24244A",
                    border: "1px solid " + (found ? info.color : "#34346A"),
                    borderRadius: 10,
                    padding: "9px 10px",
                    cursor: found ? "pointer" : "default",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
                    {found ? (
                      <DexImage src={item.image} alt={`${item.query} 도감 이미지`} size={54} />
                    ) : (
                      <div
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: 10,
                          background: "#15152C",
                          border: "1px dashed " + info.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          color: info.color,
                          opacity: 0.6,
                        }}
                      >
                        ?
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: found ? info.color : "#5E5B85",
                      marginBottom: 4,
                      letterSpacing: 0.5,
                      textAlign: "center",
                    }}
                  >
                    {info.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      lineHeight: 1.4,
                      color: found ? "#D9D6EE" : "#5E5B85",
                      textAlign: "center",
                    }}
                  >
                    {found ? item.query : "???"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!result && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => handleExample(ex)}
              style={{
                background: "transparent",
                border: "1px solid #3A3A6B",
                color: "#B9B6D6",
                borderRadius: 20,
                padding: "6px 12px",
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {result && result.sensitive && (
        <div
          style={{
            marginTop: 8,
            background: "#F6F3ED",
            color: "#1B1B3A",
            borderRadius: 18,
            padding: "28px 24px",
            boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6)",
          }}
        >
          <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 14px" }}>
            이 질문에는 재미로 %를 매기지 않을게요. 지금 많이 힘든 상황이라면,
            자살예방상담전화 <strong>1393</strong>(24시간, 국번없이)으로
            전화하면 도움을 받을 수 있어요.
          </p>
          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: "#1B1B3A",
              color: "#F6F3ED",
              border: "none",
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 13.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <RotateCcw size={14} /> 다른 질문 해보기
          </button>
        </div>
      )}

      {result && !result.sensitive && (
        <div
          key={query}
          className={
            result.rarity === "legendary" || result.rarity === "mythic"
              ? "result-glow"
              : result.category.id === "impossible"
              ? "result-shake"
              : result.category.id === "high"
              ? "result-glow"
              : "result-pop"
          }
          style={{
            marginTop: 8,
            background: "#F6F3ED",
            color: "#1B1B3A",
            borderRadius: 18,
            padding: "28px 24px",
            boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {(result.category.id === "rare" || result.category.id === "certain") && (
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              {CONFETTI_COLORS.map((color, i) => (
                <span
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${(i * 8.5 + 3) % 100}%`,
                    background: color,
                    animationDelay: `${(i % 5) * 0.08}s`,
                    transform: `rotate(${i * 37}deg)`,
                  }}
                />
              ))}
            </div>
          )}
          {result.dexId && (
            <div style={{ display: "flex", justifyContent: "center", position: "relative", marginBottom: 10 }}>
              <DexImage src={result.dexImage} alt={`${query} 도감 이미지`} size={84} />
              {justUnlocked && (
                <div
                  className="result-pop"
                  style={{
                    position: "absolute",
                    top: -6,
                    right: "calc(50% - 60px)",
                    background: "#F26B5B",
                    color: "#F6F3ED",
                    fontSize: 10,
                    fontWeight: 800,
                    borderRadius: 6,
                    padding: "2px 6px",
                  }}
                >
                  NEW!
                </div>
              )}
            </div>
          )}
          {result.rarity && (
            <div
              style={{
                display: "inline-block",
                background: RARITY_INFO[result.rarity].color,
                color: "#1B1B3A",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.5,
                borderRadius: 6,
                padding: "3px 8px",
                marginBottom: 8,
              }}
            >
              {RARITY_INFO[result.rarity].label}
            </div>
          )}
          <div style={{ fontSize: 12, letterSpacing: 0.5, color: "#7A7791", marginBottom: 4 }}>
            "{query}"
          </div>
          <div
            className={result.category.id === "mid" ? "result-coinflip" : ""}
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1,
              color: "#F26B5B",
              margin: "6px 0 2px",
              display: "inline-block",
            }}
          >
            {result.percent}%
          </div>
          <div
            style={{
              display: "inline-block",
              background: "#EDE9DD",
              color: "#1B1B3A",
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 8,
              padding: "3px 9px",
              marginBottom: 14,
            }}
          >
            {result.category.label}
          </div>
          {result.rarity && (
            <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5, color: "#5A5644", margin: "0 0 10px" }}>
              {RARITY_INFO[result.rarity].flavor}
            </p>
          )}
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#3A3752", margin: "0 0 14px" }}>
            {result.reason}
          </p>
          <div
            style={{
              background: "#EDE9DD",
              borderRadius: 12,
              padding: "12px 14px",
              marginBottom: 18,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8672", marginBottom: 4 }}>
              🤔 근데 혹시 안 된다면
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: "#5A5644", margin: 0 }}>
              {result.counterReason}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleShare}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                background: "#1B1B3A",
                color: "#F6F3ED",
                border: "none",
                borderRadius: 10,
                padding: "10px 0",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Share2 size={14} /> {copied ? "복사됨!" : "공유하기"}
            </button>
            <button
              onClick={handleReset}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                background: "transparent",
                color: "#7A7791",
                border: "1px solid #DAD5C4",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <RotateCcw size={14} /> 다시
            </button>
          </div>
          <button
            onClick={handleDexDraw}
            style={{
              width: "100%",
              marginTop: 8,
              background: "transparent",
              color: "#F2B84B",
              border: "1px dashed #F2B84B",
              borderRadius: 10,
              padding: "9px 0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🎲 다른 확률 뽑기
          </button>
        </div>
      )}

      <p style={{ textAlign: "center", fontSize: 11.5, color: "#5E5B85", marginTop: 28 }}>
        같은 문장을 넣으면 항상 같은 결과가 나와요 — 친구랑 비교해보세요
      </p>

      {history.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 12, color: "#7A76A0", marginBottom: 8, textAlign: "center" }}>
            오늘 뽑아본 것들
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {history.map((h) => (
              <button
                key={h.query}
                onClick={() => {
                  setInput(h.query);
                  draw(h.query);
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#24244A",
                  border: "1px solid #34346A",
                  borderRadius: 10,
                  padding: "9px 12px",
                  color: "#D9D6EE",
                  fontSize: 12.5,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginRight: 10,
                  }}
                >
                  {h.query}
                </span>
                <span style={{ color: "#F2B84B", fontWeight: 700, flexShrink: 0 }}>
                  {h.percent}%
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 카테고리별로 둘러보기 */}
      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#F2B84B", marginBottom: 10 }}>
          카테고리별로 둘러보기
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 12 }}>
          {[{ id: "all", label: "전체" }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))].map(
            (tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  flexShrink: 0,
                  background: activeCategory === tab.id ? "#F2B84B" : "transparent",
                  color: activeCategory === tab.id ? "#1B1B3A" : "#B9B6D6",
                  border: "1px solid " + (activeCategory === tab.id ? "#F2B84B" : "#3A3A6B"),
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontSize: 12.5,
                  fontWeight: activeCategory === tab.id ? 700 : 400,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            )
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(activeCategory === "all"
            ? Object.values(CURATED_EXAMPLES).flat()
            : CURATED_EXAMPLES[activeCategory] || []
          ).map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setInput(ex);
                draw(ex);
              }}
              style={{
                background: "#26264D",
                border: "1px solid #3A3A6B",
                color: "#D9D6EE",
                borderRadius: 20,
                padding: "6px 12px",
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* 소개 + 카테고리 설명 (SSR로 렌더링되어 크롤러가 읽을 수 있는 콘텐츠) */}
      <div style={{ marginTop: 40, borderTop: "1px solid #2E2E5C", paddingTop: 28 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, margin: "0 0 10px" }}>
          whatoddly는 어떻게 작동하나요?
        </h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "#B9B6D6", margin: "0 0 20px" }}>
          궁금한 상황을 문장으로 입력하면, 그 문장을 고유한 값으로 변환해 여섯 가지
          카테고리 중 하나로 분류하고 그럴듯한 확률을 보여드려요. 같은 문장을 넣으면
          언제나 같은 결과가 나오도록 설계돼서, 친구와 같은 질문을 넣고 결과를
          비교해볼 수 있어요. 이 숫자는 통계적 근거가 있는 예측이 아니라
          재미를 위한 콘텐츠예요. 더 자세한 설명은{" "}
          <a href="/about" style={{ color: "#F2B84B" }}>
            소개 페이지
          </a>
          와{" "}
          <a href="/categories" style={{ color: "#F2B84B" }}>
            카테고리 설명 페이지
          </a>
          에서 확인하실 수 있어요.
        </p>

        <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px", color: "#F2B84B" }}>
          확률 카테고리 6가지
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CATEGORIES.map((c) => (
            <div key={c.id} style={{ fontSize: 12.5, color: "#B9B6D6", lineHeight: 1.6, display: "flex", gap: 8 }}>
              <span style={{ color: "#F6F3ED", fontWeight: 700, flexShrink: 0, width: 62 }}>
                {c.label}
              </span>
              <span>{c.reasons[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
