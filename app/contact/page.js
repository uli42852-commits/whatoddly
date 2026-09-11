export const metadata = {
  title: "문의 | whatoddly",
  description: "whatoddly에 궁금한 점이나 의견을 보내는 방법을 안내합니다.",
};

export default function ContactPage() {
  return (
    <div className="content-page">
      <h1>문의</h1>
      <p>
        whatoddly를 이용하시면서 궁금한 점이나 개선 의견이 있으시면 언제든
        편하게 연락 주세요. 특히 결과가 이상하게 나온 문장을 알려주시면
        분류 로직을 개선하는 데 큰 도움이 돼요.
      </p>

      <h2>이런 내용을 환영해요</h2>
      <p>
        결과가 어색했던 질문, 새로 추가됐으면 하는 카테고리, 오류 신고,
        디자인이나 기능에 대한 제안 등 무엇이든 좋아요.
      </p>

      <h2>연락처</h2>
      <p>
        이메일:{" "}
        <a href="mailto:contact@whatoddly.com" style={{ color: "#F2B84B" }}>
          contact@whatoddly.com
        </a>
      </p>

      <h2>먼저 확인해보세요</h2>
      <p>
        자주 묻는 질문은{" "}
        <a href="/faq" style={{ color: "#F2B84B" }}>
          FAQ 페이지
        </a>
        에 미리 정리해뒀어요. 문의 주시면 최대한 빠르게 확인하고
        답변드릴게요.
      </p>
    </div>
  );
}
