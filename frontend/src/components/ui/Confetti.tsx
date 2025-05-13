'use client';

import React, { useCallback, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ConfettiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ConfettiButton({
  children,
  onClick,
  className = '',
}: ConfettiButtonProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleClick = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    if (onClick) onClick();
  }, [onClick]);

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
          colors={['#ec1f27', '#ffffff', '#e11d48', '#f87171']}
        />
      )}
      <button onClick={handleClick} className={className}>
        {children}
      </button>
    </>
  );
}
