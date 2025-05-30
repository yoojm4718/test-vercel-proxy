import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const handleClick = async () => {
    const url = "https://api.sspoid.site/api/chat/186/messages";

    const data = {
      id: 0,
      message:
        "오어스의 ‘히알루론시카 7초 세럼 인 앰플’은 **병풀 유래 진정 성분과 히알루론산 복합체가 고함량으로 배합된 고기능 앰플형 에센스**입니다.**병풀잎추출물, 마데카소사이드, 아시아틱애씨드, 마데카식애씨드** 등이 빠르게 진정 효과를 부여하며, **히알루론산 유도체 7종(소듐하이알루로네이트, 크로스폴리머, 아세틸레이티드 등)**이 피부 깊숙이 수분을 공급합니다. **제형은 묽고 끈적임 없는 수분감 있는 텍스처**이며, 7초 흡수 컨셉으로 빠른 흡수력을 강조합니다.**용량은 105ml**, **가격은 27,000원**입니다. 출시할 경우 제품에 대해 반응을 남겨주세요.",
      sender: "USER",
      skinTypes: ["OILY"],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndoaXRlc2VqaW5AbmF2ZXIuY29tIiwiaWF0IjoxNzQ4NTcwODAyLCJleHAiOjE3NDg1NzQ0MDJ9.vF1gTFf5D5P9nL0aFr1btzdr59wl34awk1b3spt7nRM",
        },
        body: JSON.stringify(data),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let finalText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("✅ 스트리밍 완료");
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        console.log("📦 chunk:", chunk);
        finalText += chunk;
      }

      // 최종 수신된 JSON 문자열을 직접 파싱
      const parsedJson = JSON.parse(finalText);
      console.log("🎉 전체 JSON 응답:", parsedJson);
    } catch (error) {
      console.error("❌ 요청 실패:", error);
    }
  };

  return (
    <>
      <button id="btn" onClick={handleClick}>
        요청 보내기
      </button>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
