export default function NotFound() {
  return (
    <div className="content-page" style={{ textAlign: "center", paddingTop: 80 }}>
      <div style={{ fontSize: 13, color: "#F2B84B", marginBottom: 12 }}>404</div>
      <h1 style={{ fontSize: 22 }}>이 페이지는 찾을 수 없어요</h1>
      <p>
        주소가 잘못됐거나 삭제된 페이지예요. 대신 궁금한 질문의 확률을
        확인해보시는 건 어때요?
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: 16,
          background: "#F2B84B",
          color: "#1B1B3A",
          borderRadius: 10,
          padding: "10px 20px",
          fontWeight: 700,
          fontSize: 14,
          textDecoration: "none",
        }}
      >
        홈으로 가기
      </a>
    </div>
  );
}
