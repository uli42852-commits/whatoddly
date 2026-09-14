export const metadata = {
  title: "확률 카테고리 설명 | whatoddly",
  description:
    "whatoddly의 여섯 가지 확률 카테고리(불가능계·극희귀계·낮음·반반·높음·거의확실)를 설명합니다.",
  alternates: { canonical: "/categories" },
};

const CATEGORY_INFO = [
  {
    label: "불가능계",
    range: "0.0000001% ~ 0.0009%",
    desc:
      "물리 법칙이나 생물학적 구조상 현실적으로 일어날 수 없는 일들이 여기에 속해요. 코끼리가 점프해서 날아오르거나, 사람이 순간이동을 하는 것처럼 판타지·SF 영역에 가까운 질문을 넣으면 이 카테고리로 분류돼요.",
  },
  {
    label: "극희귀계",
    range: "0.001% ~ 3%",
    desc:
      "이론적으로는 가능하지만 실제로는 극히 드물게 일어나는 일이에요. 로또 1등 당첨, 벼락을 맞는 일처럼 '살면서 한두 번 뉴스에서 볼까 말까' 한 사건들이 여기에 해당해요.",
  },
  {
    label: "낮음",
    range: "3% ~ 25%",
    desc:
      "가끔 일어나지만 자주는 아닌 일들이에요. 지각, 물건을 잃어버리는 일처럼 누구에게나 있을 법하지만 매번 일어나지는 않는 일상적인 실수나 사건이 이 범위에 들어가요.",
  },
  {
    label: "반반",
    range: "30% ~ 65%",
    desc:
      "결과를 예측하기 어려운, 정말로 반반인 상황들이에요. 소개팅이 잘될지, 오늘 비가 올지처럼 여러 변수가 균형을 이루고 있는 질문이 여기에 속해요.",
  },
  {
    label: "높음",
    range: "65% ~ 96%",
    desc:
      "대체로 그렇게 흘러가는 일들이에요. 노력한 만큼 성적이 오르거나, 준비한 만큼 시험에 합격하는 것처럼 이미 조건이 갖춰진 상황에 해당해요.",
  },
  {
    label: "거의확실",
    range: "96% ~ 99.9999%",
    desc:
      "사실상 예외 없이 일어나는 일들이에요. 해가 뜨는 것, 숨을 쉬는 것처럼 자연스러운 흐름을 거스르기가 더 어려운 사건들이 여기에 들어가요.",
  },
];

export default function CategoriesPage() {
  return (
    <div className="content-page">
      <h1>확률 카테고리 설명</h1>
      <p>
        whatoddly는 입력한 문장을 분석해 아래 여섯 가지 카테고리 중 하나로 분류하고,
        그 범위 안에서 구체적인 확률(%)을 계산해요.
      </p>

      {CATEGORY_INFO.map((c) => (
        <div key={c.label} style={{ marginTop: 24 }}>
          <h2 style={{ marginBottom: 4 }}>
            {c.label} <span style={{ color: "#7A76A0", fontSize: 12 }}>({c.range})</span>
          </h2>
          <p>{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
