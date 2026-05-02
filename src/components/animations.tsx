import { useRef, useEffect, useState, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Transition,
} from 'framer-motion'

/* ─── 通用过渡 ─── */
export const gentleEase: Transition = { duration: 1, ease: [0.22, 1, 0.36, 1] }
export const softSpring: Transition = { type: 'spring', stiffness: 60, damping: 20, mass: 1.2 }
export const bouncySpring: Transition = { type: 'spring', stiffness: 120, damping: 15, mass: 0.8 }
export const snapSpring: Transition = { type: 'spring', stiffness: 300, damping: 25 }

/* ─── 全局滚动进度条 ─── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-[#4A7C59] origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}

/* ─── 淡入上浮 ─── */
export function FadeIn({
  children,
  className = '',
  delay = 0,
  y = 60,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...gentleEase, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ─── 缩放淡入 ─── */
export function ScaleIn({
  children,
  className = '',
  delay = 0,
  scale = 0.9,
}: {
  children: ReactNode
  className?: string
  delay?: number
  scale?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...gentleEase, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ─── 左右滑入 ─── */
export function SlideIn({
  children,
  className = '',
  delay = 0,
  direction = 'left',
  rotate = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'left' | 'right'
  rotate?: number
}) {
  const x = direction === 'left' ? -100 : 100
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, rotate }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...gentleEase, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ─── 3D 翻转进入 ─── */
export function FlipIn({
  children,
  className = '',
  delay = 0,
  axis = 'x',
}: {
  children: ReactNode
  className?: string
  delay?: number
  axis?: 'x' | 'y'
}) {
  const initial = axis === 'x' ? { opacity: 0, rotateX: 45 } : { opacity: 0, rotateY: 45 }
  const animate = axis === 'x' ? { opacity: 1, rotateX: 0 } : { opacity: 1, rotateY: 0 }
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...gentleEase, delay }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  )
}

/* ─── 从深处飞出 ─── */
export function DepthIn({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.5, z: -200 }}
      whileInView={{ opacity: 1, scale: 1, z: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...gentleEase, delay }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  )
}

/* ─── 交错容器 ─── */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
  variant = 'up',
}: {
  children: ReactNode
  className?: string
  variant?: 'up' | 'scale' | 'flip'
}) {
  const variants = {
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: gentleEase },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { ...gentleEase, type: 'spring' as const, stiffness: 100 } },
    },
    flip: {
      hidden: { opacity: 0, rotateX: 30 },
      visible: { opacity: 1, rotateX: 0, transition: gentleEase },
    },
  }
  return (
    <motion.div className={className} variants={variants[variant]} style={{ perspective: 800 }}>
      {children}
    </motion.div>
  )
}

/* ─── 文字逐字揭示 ─── */
export function CharReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 40, rotate: 8, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)', transition: gentleEase },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

/* ─── 文字逐词揭示 ─── */
export function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.12,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: gentleEase },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

/* ─── 模糊揭示 ─── */
export function BlurReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...gentleEase, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ─── 视差图片 ─── */
export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.3,
  scale = 1.1,
}: {
  src: string
  alt: string
  className?: string
  speed?: number
  scale?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`])
  const s = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} className="w-full h-full object-cover" style={{ y, scale: s }} />
    </div>
  )
}

/* ─── 图片遮罩揭示（圆形展开） ─── */
export function CircleReveal({
  src,
  alt,
  className = '',
  delay = 0,
}: {
  src: string
  alt: string
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      whileInView={{ clipPath: 'circle(100% at 50% 50%)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay }}
      />
    </motion.div>
  )
}

/* ─── 图片水平展开揭示 ─── */
export function WipeReveal({
  src,
  alt,
  className = '',
  delay = 0,
  direction = 'left',
}: {
  src: string
  alt: string
  className?: string
  delay?: number
  direction?: 'left' | 'right'
}) {
  const from = direction === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
  const to = 'inset(0 0% 0 0%)'
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: from }}
      whileInView={{ clipPath: to }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay }}
      />
    </motion.div>
  )
}

/* ─── 毛玻璃卡片 ─── */
export function GlassCard({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(74,124,89,0.08)] rounded-3xl ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...softSpring, delay }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  )
}

/* ─── 发光标签 ─── */
export function GlowTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block bg-[#4A7C59]/8 text-[#4A7C59] text-xs px-4 py-1.5 rounded-full font-medium tracking-wide border border-[#4A7C59]/10 backdrop-blur-sm">
      {children}
    </span>
  )
}

/* ─── 磁吸按钮 ─── */
export function MagneticButton({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.3
    const y = (clientY - top - height / 2) * 0.3
    setPosition({ x, y })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
    >
      {children}
    </motion.button>
  )
}

/* ─── 计数动画 ─── */
export function CountUp({
  target,
  suffix = '',
  className = '',
  delay = 0,
}: {
  target: number
  suffix?: string
  className?: string
  delay?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const duration = 2000
    const start = performance.now() + delay * 1000
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hasStarted, target, delay])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}

/* ─── 光晕扫过效果（悬停） ─── */
export function ShimmerCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={`relative overflow-hidden ${className}`} whileHover="hover">
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: '-200%' }}
        variants={{ hover: { x: '200%', transition: { duration: 0.8, ease: 'easeInOut' } } }}
      />
    </motion.div>
  )
}

/* ─── 漂浮粒子背景 ─── */
export function FloatingParticles({ count = 15 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#4A7C59]/10"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

/* ─── 漂浮竹叶 ─── */
export function FloatingLeaf({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      className={`absolute pointer-events-none opacity-15 ${className}`}
      width="20"
      height="34"
      viewBox="0 0 20 34"
      fill="none"
      initial={{ y: -10, rotate: -15, opacity: 0 }}
      animate={{
        y: [0, -20, 0],
        rotate: [-15, 10, -15],
        opacity: 0.15,
      }}
      transition={{ duration: 7 + Math.random() * 5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <path d="M10 2C10 2 3 12 3 20C3 27 6 32 10 32C14 32 17 27 17 20C17 12 10 2 10 2Z" fill="#4A7C59" />
      <line x1="10" y1="7" x2="10" y2="30" stroke="#4A7C59" strokeWidth="0.5" />
    </motion.svg>
  )
}

/* ─── 呼吸脉冲光环 ─── */
export function PulseGlow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ boxShadow: ['0 0 0px rgba(74,124,89,0)', '0 0 20px rgba(74,124,89,0.15)', '0 0 0px rgba(74,124,89,0)'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─── 视差滚动文字 ─── */
export function ParallaxText({
  children,
  className = '',
  speed = 0.5,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 60}px`, `${-speed * 60}px`])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
