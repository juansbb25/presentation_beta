import React from "react";
import styled, { keyframes } from "styled-components";
type TypewriterProps = {
  text: string;
  charactersPerSecond: number;
};
const Typewriter: React.FC<TypewriterProps> = ({
  text,
  charactersPerSecond,
}) => {
  const animaitonTime = text.length / charactersPerSecond;
  const [isAnimationOfBarEnd, setIsAnimationOfBarEnd] = React.useState(false);
  const ref = React.useRef<HTMLBodyElement>(null);
  const animationEvent = (event) => {
    setIsAnimationOfBarEnd(true);
  };
  React.useEffect(() => {
    let containerRef = ref.current;
    containerRef.addEventListener("animationend", animationEvent);
    return () => {
      containerRef.removeEventListener("animationend", animationEvent);
    };
  }, [ref]);

  return (
    <div style={{ position: "relative", minWidth: "0%", maxWidth: "100vw" }}>
      <TypewriterText steps={text.length} animationTime={animaitonTime}>
        {text}
      </TypewriterText>
      {!isAnimationOfBarEnd && (
        <TypewriterBar
          steps={text.length}
          animationTime={animaitonTime}
          ref={ref}
        />
      )}
      {isAnimationOfBarEnd && <TypewriterBarStatic steps={text.length} />}
    </div>
  );
};
const TypeAnimation = keyframes`
  0% {width: 0};
  100% {width: 100%};
`;
const blinkAnimation = keyframes`
0% {background:#98C379};
50% {background: transparent};
`;
const barAnimation = (steps) => keyframes`
  0% {transform: translate(0%)};
  100% {transform: translate(${steps * 100}%)};
`;
const TypewriterText = styled.h1`
  font-size: 4vw;
  overflow: hidden;
  white-space: nowrap;
  color: #ffffff;
  animation: ${TypeAnimation} ${({ animationTime }) => animationTime}s
    steps(${({ steps }) => steps}, end);
`;
/* const TypewriterRightBar = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  height: 33%;
  border-right: 2px solid orange;
  animation: ${blinkAnimation} 0.75s step-end infinite,
    ${TypeAnimation} 4s steps(${({ steps }) => steps}, end);
  animation-fill-mode: forwards;
`; */
const TypewriterBar = styled.div`
  position: absolute;
  bottom: 4vh;
  width: ${({ steps }) => 100 / steps}%;
  height: 2px;
  background: #98c379;
  /* animation: ${blinkAnimation} ${({ animationTime }) => 1 / animationTime}s
      step-end infinite, */
  animation: ${({ steps }) => barAnimation(steps)}
    ${({ animationTime }) => animationTime}s steps(${({ steps }) => steps}, end);
  animation-fill-mode: forwards;
`;
const TypewriterBarStatic = styled.div`
  position: absolute;
  bottom: 4vh;
  width: ${({ steps }) => 100 / steps}%;
  height: 2px;
  background: transparent;
  transform: translate(${({ steps }) => steps * 100}%);
  animation: ${blinkAnimation} 0.3s step-end 3;
`;
export default Typewriter;
