import { useEffect, useState } from 'react';

// Helper for scrolling animations
export function useScrollAnimation(threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { isVisible, ref: setRef };
}

// Helper for typed text effect
export function useTypewriterEffect(text: string, speed = 50) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    let idx = 0;

    const tick = () => {
      if (idx < text.length) {
        setDisplayText(text.slice(0, ++idx));
        timeoutId = window.setTimeout(tick, speed);
      } else {
        setIsComplete(true);
      }
    };

    // reset
    setDisplayText('');
    setIsComplete(false);
    tick();

    return () => clearTimeout(timeoutId);
  }, [text, speed]);

  return { displayText, isComplete };
}
