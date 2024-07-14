import React from 'react';
import styled, { keyframes } from 'styled-components';

const StarBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 0;
`;

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomSize = () => {
  const size = Math.random() * 50 + 10; // Size between 10px and 60px
  return `${size}px`;
};

const generatePaintSplashes = (numSplashes) => {
  const splashes = [];
  for (let i = 0; i < numSplashes; i++) {
    splashes.push(
      <div
        className='paint-splash'
        style={{
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 3}s`,
          backgroundColor: generateRandomColor(),
          width: generateRandomSize(),
          height: generateRandomSize(),
        }}
        key={i}
      />
    );
  }
  return splashes;
};

const animatePaint = keyframes`
  0% {
    transform: translateY(-20px) rotate(0deg) scale(0.5);
    opacity: 0.8;
  }
  50% {
    transform: translateY(100vh) rotate(360deg) scale(1);
    opacity: 0.4;
  }
  100% {
    transform: translateY(100vh) rotate(720deg) scale(0.5);
    opacity: 0;
  }
`;

const Star = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: ${animatePaint} 3s infinite;
`;

const BackgroundStar = () => {
  const splashes = generatePaintSplashes(100);

  return (
    <StarBackground>
      {splashes.map((splash, index) => (
        <Star
          key={index}
          style={{
            top: splash.props.style.top,
            left: splash.props.style.left,
            backgroundColor: splash.props.style.backgroundColor,
            width: splash.props.style.width,
            height: splash.props.style.height,
            animationDelay: splash.props.style.animationDelay,
          }}
        />
      ))}
    </StarBackground>
  );
};

export default BackgroundStar;
