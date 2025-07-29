"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Star } from "lucide-react"

export default function RomanticPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [noClickCount, setNoClickCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Track mouse for sparkle trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleYesClick = () => {
    setShowSuccess(true)
    setShowConfetti(true)
    // Play romantic music
    if (audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
  }

  const handleNoClick = () => {
    if (noClickCount < 6) {
      setNoClickCount((prev) => prev + 1)
    }
  }

  const noButtonScale = Math.max(0.3, 1 - noClickCount * 0.12)
  const isNoButtonVisible = noClickCount < 6

  // Enhanced particle arrays
  const confettiParticles = Array.from({ length: 80 }, (_, i) => i)
  const sparkleParticles = Array.from({ length: 30 }, (_, i) => i)
  const rosePetals = Array.from({ length: 25 }, (_, i) => i)

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-300 to-fuchsia-400 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-pulse">💕</div>
          <p className="text-pink-700 mt-4">Loading romance...</p>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-fuchsia-500 flex items-center justify-center relative overflow-hidden">
        {/* Enhanced floating hearts background */}
        <div className="absolute inset-0">
          {Array.from({ length: 35 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-200/40"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: (typeof window !== "undefined" ? window.innerHeight : 800) + 100,
                rotate: 0,
                scale: Math.random() * 0.8 + 0.3,
              }}
              animate={{
                y: -100,
                rotate: [0, 180, 360],
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                scale: [Math.random() * 0.8 + 0.3, Math.random() * 1.2 + 0.5, Math.random() * 0.8 + 0.3],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            >
              <Heart size={Math.random() * 40 + 15} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        {/* Sparkle effects */}
        <div className="absolute inset-0">
          {sparkleParticles.map((particle) => (
            <motion.div
              key={`sparkle-${particle}`}
              className="absolute text-yellow-200"
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            >
              <Sparkles size={Math.random() * 20 + 10} />
            </motion.div>
          ))}
        </div>

        {/* Rose petals */}
        <div className="absolute inset-0">
          {rosePetals.map((petal) => (
            <motion.div
              key={`petal-${petal}`}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 opacity-70"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: -20,
                rotate: 0,
              }}
              animate={{
                y: (typeof window !== "undefined" ? window.innerHeight : 800) + 20,
                rotate: 360,
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Enhanced confetti */}
        <AnimatePresence>
          {showConfetti &&
            confettiParticles.map((particle) => (
              <motion.div
                key={particle}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 8 + 4 + "px",
                  height: Math.random() * 8 + 4 + "px",
                  backgroundColor: ["#ec4899", "#f43f5e", "#e11d48", "#be185d", "#fbbf24", "#f59e0b"][
                    Math.floor(Math.random() * 6)
                  ],
                  left: Math.random() * 100 + "%",
                  top: "-10px",
                }}
                initial={{ y: -10, rotate: 0, scale: 0 }}
                animate={{
                  y: (typeof window !== "undefined" ? window.innerHeight : 800) + 10,
                  rotate: Math.random() * 720,
                  x: Math.random() * 400 - 200,
                  scale: [0, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  delay: Math.random() * 2,
                }}
              />
            ))}
        </AnimatePresence>

        {/* Pulsing heart rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute border-4 border-pink-300/30 rounded-full"
              animate={{
                scale: [0, 2, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1,
              }}
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="text-center z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: 0,
            }}
            transition={{
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              rotate: { type: "spring", stiffness: 260, damping: 20 },
            }}
            className="mb-8 relative"
          >
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWhoMGl3ZW42YW15eGhqN3A1Y3htaDVrYzF5dTRxaTF6MTljYnhtNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"
              alt="Animated romantic heart"
              className="w-52 h-52 object-contain mx-auto drop-shadow-2xl rounded-lg"
            />
            {/* Heart sparkles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`heart-sparkle-${i}`}
                className="absolute text-yellow-300"
                style={{
                  left: 104 + Math.cos((i * 45 * Math.PI) / 180) * 120 + "px",
                  top: 104 + Math.sin((i * 45 * Math.PI) / 180) * 120 + "px",
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.25,
                }}
              >
                <Star size={12} fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              textShadow: [
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 40px rgba(236,72,153,0.8)",
                "0 0 20px rgba(255,255,255,0.8)",
              ],
            }}
            transition={{
              opacity: { delay: 0.5, duration: 0.8 },
              y: { delay: 0.5, duration: 0.8 },
              textShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-lg"
            style={{
              background: "linear-gradient(45deg, #ffffff, #fce7f3, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            I love you too baby ❤️
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-2xl text-pink-100 font-semibold"
          >
            Forever and always! 💕
          </motion.div>
        </div>

        {/* Audio element */}
        <audio ref={audioRef} loop preload="auto">
  <source src="/love.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-300 to-fuchsia-400 flex items-center justify-center relative overflow-hidden">
      {/* Enhanced floating hearts background */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`bg-heart-${i}`}
            className="absolute text-pink-200/25"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          >
            <Heart size={Math.random() * 25 + 15} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Sparkle trail following mouse */}
      <motion.div
        className="absolute pointer-events-none z-20"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <motion.div
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="text-yellow-400"
        >
          <Sparkles size={20} />
        </motion.div>
      </motion.div>

      {/* Floating sparkles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`floating-sparkle-${i}`}
            className="absolute text-yellow-300/60"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 360],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
          >
            <Star size={Math.random() * 15 + 8} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Floating rose petals */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`main-petal-${i}`}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 opacity-60"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: -10,
              rotate: 0,
            }}
            animate={{
              y: (typeof window !== "undefined" ? window.innerHeight : 800) + 10,
              rotate: 360,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            }}
            transition={{
              duration: Math.random() * 6 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 px-4">
        {/* Enhanced 3D Animated Love Message */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 1.2,
          }}
          className="text-5xl md:text-7xl font-bold mb-8 transform-gpu relative"
          style={{
            background: "linear-gradient(45deg, #be185d, #ec4899, #f97316, #ec4899, #be185d)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 10px 20px rgba(190, 24, 93, 0.3)",
            filter: "drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))",
            animation: "gradient 3s ease infinite, glow 2s ease-in-out infinite alternate",
          }}
        >
          Aya, do you love me baby?
          {/* Text sparkles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={`text-sparkle-${i}`}
              className="absolute text-yellow-400"
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            >
              ✨
            </motion.span>
          ))}
        </motion.h1>

        {/* Enhanced Gift Animation */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 8, -8, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTFxamJ1MWNnc2NzenN6MXJjdjR1b3h4NGJ4ZXh5NmI3OXlwam93bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/98MaHVwJOmWMz4cz1K/giphy.gif"
              alt="Romantic animated gift"
              className="w-32 h-32 object-contain drop-shadow-lg rounded-lg"
            />

            {/* Orbiting hearts around gift */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`orbit-heart-${i}`}
                className="absolute text-pink-400"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  rotate: 360,
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.25 },
                }}
              >
                <motion.div
                  style={{
                    x: Math.cos((i * 45 * Math.PI) / 180) * 90,
                    y: Math.sin((i * 45 * Math.PI) / 180) * 90,
                  }}
                >
                  <Heart size={16} fill="currentColor" />
                </motion.div>
              </motion.div>
            ))}

            {/* Gift sparkles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`gift-sparkle-${i}`}
                className="absolute text-yellow-300"
                style={{
                  left: 64 + Math.cos((i * 30 * Math.PI) / 180) * 100 + "px",
                  top: 64 + Math.sin((i * 30 * Math.PI) / 180) * 100 + "px",
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.15,
                }}
              >
                <Star size={10} fill="currentColor" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Buttons */}
        <div className="flex items-center justify-center gap-8">
          <motion.div
            animate={!isNoButtonVisible ? { x: 0 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleYesClick}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-6 px-12 text-2xl rounded-full shadow-2xl transform transition-all duration-200 border-4 border-pink-300 relative overflow-hidden"
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                Yes 😍
              </motion.span>
              {/* Button sparkles */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </Button>
          </motion.div>

          <AnimatePresence>
            {isNoButtonVisible && (
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ scale: noButtonScale }}
                exit={{ opacity: 0, scale: 0, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ scale: noButtonScale * 1.05 }}
                whileTap={{ scale: noButtonScale * 0.95 }}
              >
                <Button
                  onClick={handleNoClick}
                  variant="destructive"
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 text-xl rounded-full shadow-xl border-4 border-red-300"
                >
                  <motion.span
                    animate={{
                      rotate: noClickCount > 0 ? [0, -15, 15, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    No 💔
                  </motion.span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {noClickCount > 0 && noClickCount < 6 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-lg text-rose-700 font-semibold relative"
          >
            Are you sure? 🥺 ({6 - noClickCount} chances left)
            {/* Sad sparkles */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.span
                key={`sad-sparkle-${i}`}
                className="absolute text-blue-400"
                style={{
                  left: Math.random() * 100 + "%",
                  top: "-20px",
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              >
                💧
              </motion.span>
            ))}
          </motion.p>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glow {
          from { filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.5)); }
          to { filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.8)); }
        }
      `}</style>
    </div>
  )
}
