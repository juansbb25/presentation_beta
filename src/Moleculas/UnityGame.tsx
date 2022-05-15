import React, { useEffect, useRef, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import styled, { keyframes } from "styled-components";

type UnityGameProps = {
  setPlayerStats: ({
    playerName: string,
    score: number,
    gameOver: boolean,
  }) => void;
};
const UnityGame: React.FC<UnityGameProps> = ({ setPlayerStats }) => {
  const [currentPlayerStats, setCurrentPlayerStats] = useState<{
    playerName: string;
    score: number;
  }>(null);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const ref = useRef<HTMLBodyElement>(null);
  const newPlayerStats = () => {
    setIsAnimationEnd(true);
  };
  useEffect(() => {
    let containerRef = ref.current;
    unityContext.on("GameOver", (userName, score) => {
      setGameOver(true);
      setCurrentPlayerStats({
        playerName: userName,
        score,
      });
    });
    containerRef.addEventListener("animationend", newPlayerStats);
  }, []);
  useEffect(() => {
    setPlayerStats({ ...currentPlayerStats, gameOver: isAnimationEnd });
  }, [currentPlayerStats, isAnimationEnd]);
  const unityContext = new UnityContext({
    loaderUrl: "UnityTest/Build/UnityTest.loader.js",
    dataUrl: "UnityTest/Build/UnityTest.data",
    frameworkUrl: "UnityTest/Build/UnityTest.framework.js",
    codeUrl: "UnityTest/Build/UnityTest.wasm",
  });
  return (
    <CanvasContainer gameOver={gameOver} ref={ref}>
      <Unity
        unityContext={unityContext}
        style={{ width: `${66}vw `, height: `${(66 * 9) / 16}vw` }}
      />
    </CanvasContainer>
  );
};
const containerAnimation = keyframes`
  0% { opacity: 1}
  100% { opacity: 0 }
`;
const CanvasContainer = styled.div`
  animation-name: ${containerAnimation};
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-play-state: ${({ gameOver }) => (!gameOver ? "paused" : "running")};
  opacity: 1;
`;
export default UnityGame;
