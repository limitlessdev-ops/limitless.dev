import { useEffect, useRef } from 'react';
import { gsap } from '../../hooks/useLenis';

/**
 * WordReveal — splits text into words, each slides up from below its clip mask.
 * Triggered after `trigger` becomes true (e.g. loading = false).
 */
const WordReveal = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.07,
  duration = 0.9,
  ease = 'power3.out',
  trigger = true,
  as: Tag = 'span',
}) => {
  const containerRef = useRef(null);

  const words = text.split(' ');

  useEffect(() => {
    if (!trigger) return;
    const container = containerRef.current;
    if (!container) return;

    const wordEls = container.querySelectorAll('.word-inner');

    gsap.fromTo(
      wordEls,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration,
        ease,
        stagger,
        delay,
        force3D: true,
      }
    );
  }, [trigger, delay, stagger, duration, ease]);

  return (
    <Tag ref={containerRef} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-clip inline-block overflow-hidden"
          style={{ verticalAlign: 'bottom' }}
        >
          <span className="word-inner inline-block" style={{ transform: 'translateY(110%)' }}>
            {word}
          </span>
          {/* Space between words */}
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </Tag>
  );
};

export default WordReveal;
