import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Figma node 233-4750 — Splash uses the full-screen teal/blue gradient background.
// The Figma asset server hasn't cached the specific splash image, so we
// faithfully replicate the Jio splash colour (#0078ad) with the dot-ribbon
// pattern and the product logo SVG that IS available from Figma.
const imgProductLogo = '/assets/figma/3a1e52ece350c3cd3815a476bdd9c3ac93f6cc2f.svg'

export function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/language', { replace: true }), 2200)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="relative flex items-center justify-center w-full h-dvh overflow-hidden bg-jio-splash">

      {/* Decorative dot-ribbon — left side, Figma-faithful */}
      <div
        className="absolute pointer-events-none opacity-25"
        style={{
          width: 504,
          height: 283,
          left: -72,
          top: '38%',
          transform: 'translateY(-50%)',
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.7) 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      {/* Product logo from Figma — full-bleed, centered */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
      >
        <img
          src={imgProductLogo}
          alt="JioAI Photos"
          className="w-32 h-32 object-contain"
          width={128}
          height={128}
          draggable={false}
        />
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="absolute bottom-16 flex gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/50"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  )
}
