import { CATEGORIES, CURATED_EXAMPLES } from "../lib/probability";

export const metadata = {
  title: "인기 확률 질문 모음 | whatoddly",
  description:
    "whatoddly에서 많이 물어보는 질문들을 카테고리별로 모아봤어요. 궁금한 질문을 눌러서 바로 결과를 확인해보세요.",
  alternates: { canonical: "/examples" },
};

export default function ExamplesPage() {
  return (
    <div className="content-page">
      <h1>인기 확률 질문 모음</h1>
      <p>
        whatoddly에 실제로 많이 들어오는 질문들을 여섯 가지 카테고리로 나눠
        정리했어요. 궁금한 질문을 눌러보면 바로 결과 화면으로 이동해요. 원하는
        질문이 없다면 홈에서 직접 문장을 입력해보세요.
      </p>

      {CATEGORIES.map((cat) => (
        <div key={cat.id} style={{ marginTop: 32 }}>
          <h2 style={{ marginBottom: 6 }}>{cat.label}</h2>
          <p style={{ marginTop: 0, marginBottom: 14, fontSize: 13, color: "#9A97BD" }}>
            {cat.reasons[0]}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(CURATED_EXAMPLES[cat.id] || []).map((ex) => (
              <a
                key={ex}
                href={`/?q=${encodeURIComponent(ex)}`}
                style={{
                  display: "inline-block",
                  background: "#26264D",
                  border: "1px solid #3A3A6B",
                  color: "#D9D6EE",
                  borderRadius: 20,
                  padding: "6px 12px",
                  fontSize: 13,
                  textDecoration: "none",
                }}
              >
                {ex}
              </a>
            ))}
          </div>
        </div>
      ))}

      <p style={{ marginTop: 36 }}>
        각 카테고리가 어떤 기준으로 나뉘는지 더 자세히 알고 싶다면{" "}
        <a href="/categories" style={{ color: "#F2B84B" }}>
          카테고리 설명 페이지
        </a>
        를 참고해주세요.
      </p>
    </div>
  );
}
