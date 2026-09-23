import React, { useEffect, useRef } from 'react';

interface SunlightParticlesProps {
  mood?: 'dawn' | 'golden' | 'dusk' | 'blueprint';
}

export const SunlightParticles: React.FC<SunlightParticlesProps> = ({ mood = 'golden' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle parameters for interior sunlit dust motes
    const particleCount = 35;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.4) * 0.45,
        speedY: (Math.random() * -0.5) - 0.15, // gently drift upwards in warm sunlight
        opacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: (Math.random() * 0.008) + 0.004,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Color based on ambient interior lighting mood
      let particleColor = '216, 178, 110'; // default champagne gold
      if (mood === 'dawn') particleColor = '245, 215, 185';
      if (mood === 'golden') particleColor = '225, 165, 75';
      if (mood === 'dusk') particleColor = '210, 140, 80';
      if (mood === 'blueprint') particleColor = '100, 200, 255';

      // Draw subtle diagonal sunlight beam
      const gradient = ctx.createLinearGradient(0, 0, width * 0.8, height);
      gradient.addColorStop(0, `rgba(${particleColor}, 0.08)`);
      gradient.addColorStop(0.5, `rgba(${particleColor}, 0.03)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(width * 0.2, 0);
      ctx.lineTo(width * 0.7, 0);
      ctx.lineTo(width, height * 0.85);
      ctx.lineTo(width * 0.4, height);
      ctx.closePath();
      ctx.fill();

      // Render drifting sunlit motes
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity * 0.75})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${particleColor}, 0.8)`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mood]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
