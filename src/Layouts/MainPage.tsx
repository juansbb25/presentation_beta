import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { data } from "./textData";
import Typewriter from "../Atoms/Typewriter";
import { delay } from "../utils/timer";
import UnityGame from "../Moleculas/UnityGame";
const MainPage = () => {
  const [showCanvas, setShowCanvas] = useState(true);
  const [playerStats, setPlayerStats] = useState<{
    playerName: string;
    score: number;
    gameOver: boolean;
  }>(null);
  const [paragraphNumber, setParagraphNumber] = useState(0);
  const charactersPerSecond = 10;
  const animaitonTimes = data.map((text) => text.length / charactersPerSecond);
  console.log(
    animaitonTimes[1] * charactersPerSecond,
    animaitonTimes[2] * charactersPerSecond
  );
  const awaitDelay = async () => {
    for (let i = 0; i < data.length; i++) {
      setParagraphNumber(i);
      await delay(animaitonTimes[i] * 1000 + 1000);
    }
    setShowCanvas(true);
  };
  useEffect(() => {
    awaitDelay();
  }, []);

  return (
    <WindowContainer>
      {!showCanvas &&
        data.map(
          (text, i) =>
            paragraphNumber >= i && (
              <Typewriter
                key={i}
                text={text}
                charactersPerSecond={charactersPerSecond}
              />
            )
        )}
      {showCanvas && !playerStats?.gameOver && (
        <UnityGame setPlayerStats={setPlayerStats} />
      )}
      {playerStats?.gameOver && (
        <h1>{`${playerStats.playerName}${" "}${playerStats.score}`}</h1>
      )}
    </WindowContainer>
  );
};
const WindowContainer = styled.div`
  background: #1e2127;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default MainPage;
