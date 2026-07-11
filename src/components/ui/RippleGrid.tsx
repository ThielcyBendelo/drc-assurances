import { useEffect, useRef } from "react";

export default function RippleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0; // Compteur pour l'effet de vague sinusoïdale continu

    // Ajustement des dimensions physiques
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    resizeCanvas();

    // Paramètres géométriques avancés
    const gap = 34; // Espacement légèrement plus grand pour un look plus aéré/SaaS
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);

    // Boucle d'animation principale
    const render = () => {
      if (!ctx || !canvas) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const rows = Math.ceil(height / gap) + 1;
      const cols = Math.ceil(width / gap) + 1;

      ctx.clearRect(0, 0, width, height);
      time += 0.04; // Vitesse de la vague de fond

      // Animation fluide de la souris (amortissement Spring)
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      const isDark = document.documentElement?.classList.contains("dark") || false;
      
      // Couleurs adaptatives de base (Ultra-discrètes pour préserver les contrastes du texte)
      const dotColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.04)";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Position théorique d'origine du point
          let originX = c * gap;
          let originY = r * gap;

          // 🌊 EFFET 1 : Micro-ondulation sinusoïdale en tâche de fond (Style réseau fluide)
          const waveEffectX = Math.sin(time + (originY * 0.01)) * 3;
          const waveEffectY = Math.cos(time + (originX * 0.01)) * 3;
          
          let targetPointX = originX + waveEffectX;
          let targetPointY = originY + waveEffectY;

          // Calcul des vecteurs par rapport à la souris
          const dx = mouse.x - targetPointX;
          const dy = mouse.y - targetPointY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let radius = 1.2; // Rayon par défaut (Plus fin pour faire plus "technologique")
          let finalColor = dotColor;

          // 🧲 EFFET 2 : Distorsion 3D interactive et Glow au survol (Rayon de 160px)
          const maxDistance = 160;
          if (dist < maxDistance) {
            const factor = (maxDistance - dist) / maxDistance; // 1 au centre, 0 aux limites
            
            // Le point grossit de manière exponentielle au centre
            radius = 1.2 + Math.pow(factor, 2) * 3.5; 

            // Déplacement physique des coordonnées (Effet d'aspiration 3D vers le curseur)
            const pushForce = Math.sin(factor * Math.PI / 2) * 18;
            targetPointX += (dx / dist) * pushForce;
            targetPointY += (dy / dist) * pushForce;

            // Interpolation chromatique dynamique vers le bleu cyan de l'ARCA
            const alpha = 0.05 + Math.pow(factor, 1.5) * 0.5;
            finalColor = isDark 
              ? `rgba(0, 163, 224, ${alpha})` 
              : `rgba(0, 124, 176, ${alpha * 0.85})`;
              
            // Ajout d'un micro-halo lumineux (Glow) sur les points très proches
            if (factor > 0.7) {
              ctx.shadowBlur = 10;
              ctx.shadowColor = isDark ? "rgba(0, 163, 224, 0.4)" : "rgba(0, 124, 176, 0.25)";
            }
          }

          // Dessin du point final
          ctx.beginPath();
          ctx.arc(targetPointX, targetPointY, radius, 0, Math.PI * 2);
          ctx.fillStyle = finalColor;
          ctx.fill();
          
          // Réinitialisation du shadow pour ne pas ralentir le reste de la grille
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block bg-transparent"
    />
  );
}
