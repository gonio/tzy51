import { useState, useRef, useEffect } from 'react'
import { Phone, MapPin, Leaf, ChevronRight, Music, VolumeX, Copy, X, Navigation } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ScrollProgress,
  FadeIn,
  ScaleIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  CharReveal,
  WordReveal,
  BlurReveal,
  GlassCard,
  GlowTag,
  CountUp,
  ShimmerCard,
  FloatingParticles,
  FloatingLeaf,
  PulseGlow,
  gentleEase,
  softSpring,
  snapSpring,
  bouncySpring,
} from '../components/animations'

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-[3/4] max-h-[700px]">
        {/* 视频背景 */}
        <motion.video
          src="/images/hero-video.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          preload="auto"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

        {/* 漂浮竹叶 */}
        <FloatingLeaf className="top-16 left-6 w-5 h-8" delay={0} />
        <FloatingLeaf className="top-28 right-10 w-4 h-7" delay={1.5} />
        <FloatingLeaf className="top-44 left-1/4 w-5 h-8" delay={3} />
        <FloatingLeaf className="top-20 right-1/3 w-3 h-6" delay={4.5} />
        <FloatingLeaf className="top-56 left-10 w-4 h-7" delay={2} />

        {/* 标题区 */}
        <div className="absolute top-12 left-0 right-0 text-center">
          <WordReveal
            text="青城山 · 竹林隐舍"
            className="text-white/70 text-sm tracking-[0.4em] font-light text-shadow-sm"
            delay={0.2}
          />
          <div className="mt-4">
            <CharReveal
              text="町竹隐"
              className="text-white text-5xl font-extralight tracking-[0.35em] text-shadow-md"
              delay={0.4}
              stagger={0.08}
            />
          </div>
        </div>

        {/* 底部信息 */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 pb-14 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...gentleEase, delay: 0.8 }}
        >
          <motion.p
            className="text-white/60 text-xs tracking-[0.3em] mb-2 font-light"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            五一小长假 · 就去町竹隐
          </motion.p>
          <h2 className="text-white text-xl font-bold mb-2 tracking-wide drop-shadow-md">町竹隐，隐于山</h2>
          <p className="text-white/80 text-sm leading-relaxed font-light drop-shadow-sm max-w-[320px]">
            推窗见山，低眉听水，耳畔是竹林深处的声声鸟鸣。在这里，时间不再催促人，每一口呼吸都染着竹叶的清香。
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Section 标题 ─── */
function SectionTitle({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="relative text-center mb-8">
      <BlurReveal>
        <h3 className="text-[#4A7C59]/10 text-5xl font-black tracking-[0.15em] leading-tight select-none">
          {en}
        </h3>
      </BlurReveal>
      <BlurReveal delay={0.15}>
        <h2 className="text-[#2D3A2D] text-2xl font-bold absolute inset-0 flex items-center justify-center top-1 tracking-widest">
          {zh}
        </h2>
      </BlurReveal>
    </div>
  )
}

/* ─── Section 编号 ─── */
function SectionNumber({ num }: { num: string }) {
  return (
    <FadeIn className="flex justify-center mb-4" y={30}>
      <motion.div
        className="w-16 h-16 rounded-full bg-[#4A7C59]/10 border border-[#4A7C59]/20 flex items-center justify-center backdrop-blur-sm"
        whileHover={{ scale: 1.15, rotate: 8 }}
        transition={snapSpring}
      >
        <span className="text-[#4A7C59] text-lg font-light tracking-widest">{num}</span>
      </motion.div>
    </FadeIn>
  )
}

/* ─── 关于我们 ─── */
function AboutSection() {
  const stats = [
    { value: 360, suffix: '°', label: '群山环抱', color: 'from-[#4A7C59] to-[#6B9E7B]' },
    { value: 95, suffix: '%', label: '森林覆盖率', color: 'from-[#8B7355] to-[#A89070]' },
    { value: 22, suffix: '℃', label: '夏日均温', color: 'from-[#6B8E6B] to-[#8BAE8B]' },
    { value: 100, suffix: '+', label: '负氧离子', color: 'from-[#A0826D] to-[#B89A85]' },
  ]

  return (
    <section className="py-20 px-5 relative">
      <SectionNumber num="01" />
      <SectionTitle en="ABOUT US" zh="关于町竹隐" />

      <FadeIn delay={0.1}>
        <GlassCard className="p-6">
          <p className="text-[#4A3F35] leading-[2] text-[15px] font-light tracking-wide">
            町竹隐，隐于山与竹林久别重逢。一町藏雅致，竹里隐清闲，在自然里，找回自己，来青城山，住町竹隐。让眼睛去旅行，让心灵回家。
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {['青城山脚', '竹林环绕', '禅意空间', '山泉入户'].map((tag, i) => (
              <motion.span
                key={tag}
                className="bg-[#4A7C59]/8 text-[#4A7C59] text-xs px-4 py-1.5 rounded-full font-medium tracking-wide border border-[#4A7C59]/10"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...bouncySpring, delay: 0.4 + i * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </GlassCard>
      </FadeIn>

      {/* 统计数字 */}
      <StaggerContainer className="mt-6 grid grid-cols-2 gap-4" staggerDelay={0.12}>
        {stats.map((s) => (
          <StaggerItem key={s.label} variant="scale">
            <motion.div
              className={`rounded-2xl p-5 text-center text-white bg-gradient-to-br ${s.color} shadow-lg shadow-[#4A7C59]/10`}
              whileHover={{ y: -6, scale: 1.03, rotate: 1 }}
              transition={softSpring}
            >
              <p className="text-2xl font-light tracking-wider">
                <CountUp target={s.value} suffix={s.suffix} delay={0.2} />
              </p>
              <p className="text-xs opacity-80 mt-1.5 font-light tracking-widest">{s.label}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* 大厅图片 */}
      <ScaleIn className="mt-6">
        <img
          src="/images/lobby.jpg"
          alt="町竹隐大厅"
          className="w-full aspect-[4/3] rounded-3xl shadow-[0_20px_60px_rgba(74,124,89,0.15)] object-cover"
        />
      </ScaleIn>

    </section>
  )
}

/* ─── 隐世之境 ─── */
function FeaturesSection() {
  const features = [
    { image: '/images/window-seat.jpg', title: '推窗见山', desc: '临窗而坐，看山听雨，时光在此静止' },
    { image: '/images/corridor.jpg', title: '光影长廊', desc: '木质长廊延伸向远方，每一步都是风景' },
    { image: '/images/bamboo-fence.jpg', title: '竹篱幽径', desc: '竹篱围合，庭院深深，绿意盎然' },
    { image: '/images/reading-room.jpg', title: '静读品茗', desc: '一书一茶，在静谧空间里与自己独处' },
  ]

  return (
    <section className="py-20 px-5 bg-gradient-to-b from-[#F5F0E8] via-[#F8F5EE] to-[#F5F0E8] relative overflow-hidden">
      <FloatingParticles count={12} />
      <div className="absolute top-20 right-0 w-64 h-64 bg-[#4A7C59]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-[#8B7355]/5 rounded-full blur-3xl pointer-events-none" />

      <SectionNumber num="02" />
      <SectionTitle en="FEATURES" zh="隐世之境" />

      <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.12}>
        {features.map((f) => (
          <StaggerItem key={f.title} variant="flip" className="h-full">
            <motion.div
              className="h-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-[0_4px_20px_rgba(74,124,89,0.06)] border border-white/50 overflow-hidden flex flex-col"
              whileHover={{ y: -8, rotateX: 5, boxShadow: '0 16px 48px rgba(74,124,89,0.12)' }}
              transition={softSpring}
              style={{ perspective: 800 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
              </div>
              <div className="p-4 flex flex-col items-center text-center flex-1">
                <h3 className="text-[#2D3A2D] font-medium text-sm mb-1 tracking-wider">{f.title}</h3>
                <p className="text-[#6B7B6B] text-xs leading-relaxed font-light">{f.desc}</p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

    </section>
  )
}

/* ─── 五一特惠房型 ─── */
function RoomsSection() {
  const rooms = [
    { image: '/images/twin-landscape.jpg', name: '山景双床房', desc: '1.2米双床 · 山水画境', price: 328, original: 418, tags: ['山水画境', '日式禅意'] },
    { image: '/images/tatami-suite.jpg', name: '榻榻米茶宿', desc: '榻榻米 · 茶室入梦', price: 298, original: 388, tags: ['榻榻米', '茶道体验'] },
  ]

  return (
    <section className="py-20 px-5 relative">
      <SectionNumber num="03" />
      <SectionTitle en="ROOMS" zh="五一特惠房型" />

      <FadeIn delay={0.1}>
        <div className="bg-[#4A7C59] rounded-full px-6 py-2.5 text-center mb-8 w-fit mx-auto shadow-lg shadow-[#4A7C59]/20">
          <span className="text-white text-sm font-light tracking-wider">5.1 限时特惠 · 提前预订享折扣</span>
        </div>
      </FadeIn>

      <div className="space-y-6">
        {rooms.map((room, i) => (
          <SlideIn key={room.name} delay={0.15 * i} direction="right" rotate={2}>
            <motion.div
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-[0_8px_40px_rgba(74,124,89,0.08)] border border-white/50 overflow-hidden"
              whileHover={{ y: -6, rotate: -1 }}
              transition={softSpring}
            >
              <ShimmerCard className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#C84A3F] text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg">
                  特惠
                </div>
              </ShimmerCard>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[#2D3A2D] font-medium text-lg tracking-wide">{room.name}</h3>
                    <p className="text-[#6B7B6B] text-sm font-light">{room.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#C84A3F] text-2xl font-light">
                      {room.price}
                      <span className="text-sm font-light text-[#6B7B6B]">元/晚</span>
                    </p>
                    <p className="text-[#9B9B9B] text-xs line-through font-light">原价：{room.original}元/晚</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {room.tags.map((tag) => (
                    <GlowTag key={tag}>{tag}</GlowTag>
                  ))}
                </div>
                <a
                  href="tel:18349142304"
                  className="w-full mt-5 bg-[#4A7C59] hover:bg-[#3D6548] text-white text-sm font-medium py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-1 shadow-lg shadow-[#4A7C59]/15"
                >
                  立即预订：183 4914 2304
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </SlideIn>
        ))}
      </div>

    </section>
  )
}

/* ─── 慢生活哲学 ─── */
function PhilosophySection() {
  const items = [
    { title: '一盏茶的时光', desc: '席地而坐，煮水烹茶。看茶叶在沸水中缓缓舒展，听窗外竹叶沙沙。这一刻，时间为你停留。', image: '/images/tatami-tea.jpg' },
    { title: '一夜好眠的温柔', desc: '棉麻床品轻抚肌肤，木质家具的温润触感伴你入眠。在町竹隐，每一夜都是温柔的拥抱。', image: '/images/bedroom-corner.jpg' },
    { title: '月下闲庭的惬意', desc: '竹篱围合的私家庭院，流水潺潺，月光如水。三五好友围坐木桌，品茶论道，不负良宵。', image: '/images/night-courtyard.jpg' },
  ]

  return (
    <section className="py-20 px-5 bg-gradient-to-b from-[#F5F0E8] via-[#F8F5EE] to-[#F5F0E8] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#4A7C59]/5 rounded-full blur-3xl pointer-events-none" />
      <FloatingParticles count={8} />

      <SectionNumber num="04" />
      <SectionTitle en="PHILOSOPHY" zh="慢生活哲学" />

      <BlurReveal className="text-center mb-10" delay={0.1}>
        <p className="text-[#6B7B6B] leading-[2] text-[15px] font-light tracking-wide">
          心静了，日子就清凉了。在町竹隐，我们用心打造每一处细节，
          <br />
          让"慢"成为一种生活的仪式感。
        </p>
      </BlurReveal>

      <div className="space-y-5">
        {items.map((item, i) => (
          <SlideIn key={item.title} delay={0.12 * i} direction={i % 2 === 0 ? 'left' : 'right'} rotate={i % 2 === 0 ? -2 : 2}>
            <motion.div
              className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-[0_4px_24px_rgba(74,124,89,0.06)] border border-white/50 overflow-hidden flex"
              whileHover={{ scale: 1.02 }}
              transition={softSpring}
            >
              <div className="w-[130px] shrink-0 overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
              </div>
              <div className="p-5 flex flex-col justify-center">
                <h3 className="text-[#2D3A2D] font-medium text-base mb-2 tracking-wide">{item.title}</h3>
                <p className="text-[#6B7B6B] text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          </SlideIn>
        ))}
      </div>

      <FadeIn delay={0.2} className="mt-10">
        <PulseGlow>
          <motion.div
            className="bg-[#4A7C59] rounded-3xl p-8 text-center text-white shadow-xl shadow-[#4A7C59]/20"
            whileHover={{ scale: 1.02 }}
            transition={softSpring}
          >
            <p className="text-lg font-light mb-3 tracking-widest">一町藏雅致 · 竹里隐清闲</p>
            <p className="text-sm opacity-80 leading-[1.9] font-light">
              在自然里，找回自己。来青城山，住町竹隐。
              <br />
              让眼睛去旅行，让心灵回家。
            </p>
          </motion.div>
        </PulseGlow>
      </FadeIn>

    </section>
  )
}

/* ─── 预订咨询 ─── */
function ContactSection() {
  const [showMapSheet, setShowMapSheet] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const ua = navigator.userAgent
  const isWechat = /MicroMessenger/i.test(ua)
  const isQQ = /QQ\//i.test(ua)
  const inAppBrowser = isWechat || isQQ

  const openMap = (schemeUrl: string, h5Url: string) => {
    if (inAppBrowser) {
      window.location.href = h5Url
    } else {
      window.location.href = schemeUrl
    }
  }

  const copyAddress = () => {
    const address = '盛世桃源(两盐路店) 四川省成都市都江堰市青城山镇青城山旅游区花语墅'
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address).then(() => {
        setToast('地址已复制')
        setTimeout(() => setToast(null), 2000)
      })
    } else {
      const input = document.createElement('input')
      input.value = address
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setToast('地址已复制')
      setTimeout(() => setToast(null), 2000)
    }
  }

  const mapOptions = [
    {
      name: '腾讯地图',
      desc: inAppBrowser ? '网页版导航' : '微信生态推荐',
      color: 'text-[#4A90D9]',
      bg: 'bg-[#4A90D9]/10',
      schemeUrl: `qqmap://map/routeplan?type=drive&from=我的位置&fromcoord=CurrentLocation&to=${encodeURIComponent('盛世桃源(两盐路店) 四川省成都市都江堰市青城山镇青城山旅游区花语墅')}`,
      h5Url: `https://map.qq.com/?type=place&keyword=${encodeURIComponent('盛世桃源(两盐路店) 四川省成都市都江堰市青城山镇青城山旅游区花语墅')}`,
    },
    {
      name: '高德地图',
      desc: inAppBrowser ? '网页版导航' : '精准导航',
      color: 'text-[#4A7C59]',
      bg: 'bg-[#4A7C59]/10',
      schemeUrl: `amapuri://route/plan/?dname=${encodeURIComponent('盛世桃源(两盐路店) 四川省成都市都江堰市青城山镇青城山旅游区花语墅')}&dev=0&t=0`,
      h5Url: 'https://surl.amap.com/23TnerM9bba',
    },
  ]

  return (
    <section className="py-20 px-5 relative">
      <SectionNumber num="05" />
      <SectionTitle en="CONTACT" zh="预订咨询" />

      <ScaleIn>
        <GlassCard className="p-8">
          <BlurReveal className="text-center mb-8">
            <p className="text-[#4A7C59] text-sm tracking-[0.3em] mb-3 font-light">预订您的竹隐时光</p>
            <h3 className="text-[#2D3A2D] text-2xl font-light tracking-widest">町竹隐民宿</h3>
          </BlurReveal>

          <FadeIn delay={0.2} className="w-36 h-36 bg-[#F5F0E8]/80 rounded-2xl mx-auto mb-8 flex items-center justify-center backdrop-blur-sm border border-white/50">
            <div className="text-center">
              <img
                src="/images/qr_20260502163655_100_432.jpg"
                alt="微信二维码"
                className="w-24 h-24 rounded-xl object-cover border-2 border-[#4A7C59]/30 mx-auto mb-2"
              />
              <p className="text-[#6B7B6B] text-xs font-light">扫码加微信</p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            <FadeIn delay={0.25}>
              <motion.div
                className="flex items-center gap-4 bg-[#F5F0E8]/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50"
                whileHover={{ x: 8, scale: 1.02 }}
                transition={softSpring}
              >
                <div className="w-12 h-12 rounded-full bg-[#4A7C59] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#4A7C59]/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[#6B7B6B] text-xs font-light mb-1">预订热线</p>
                  <p className="text-[#2D3A2D] font-medium text-xl tracking-wider">183 4914 2304</p>
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <motion.div
                className="flex items-center gap-4 bg-[#F5F0E8]/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 cursor-pointer"
                whileHover={{ x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={softSpring}
                onClick={() => setShowMapSheet(true)}
              >
                <div className="w-12 h-12 rounded-full bg-[#8B7355] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#8B7355]/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#6B7B6B] text-xs font-light mb-1">民宿地址</p>
                  <p className="text-[#2D3A2D] text-sm font-medium truncate">四川省成都市都江堰市青城山镇青城山旅游区花语墅</p>
                </div>
                <div className="flex flex-col items-center gap-0.5 text-[#8B7355] shrink-0">
                  <Navigation className="w-4 h-4" />
                  <span className="text-[10px] font-medium">地图</span>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </GlassCard>
      </ScaleIn>

      <FadeIn delay={0.4} className="mt-12 text-center">
        <p className="text-[#9B9B9B] text-xs font-light tracking-widest">
          五一小长假 · 町竹隐期待与您相遇
        </p>
      </FadeIn>

      {/* 地图选择面板 */}
      <AnimatePresence>
        {showMapSheet && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMapSheet(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#FDFBF7] rounded-t-3xl px-5 pt-6 pb-8 max-w-md mx-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-[#2D3A2D] font-medium text-lg">选择地图应用</h4>
                <button
                  onClick={() => setShowMapSheet(false)}
                  className="w-8 h-8 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#9B9B9B]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {mapOptions.map((opt) => (
                  <motion.button
                    key={opt.name}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#F5F0E8] text-left active:bg-[#F5F0E8]"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      openMap(opt.schemeUrl, opt.h5Url)
                      setShowMapSheet(false)
                    }}
                  >
                    <div className={`w-10 h-10 rounded-xl ${opt.bg} ${opt.color} flex items-center justify-center shrink-0`}>
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#2D3A2D] font-medium text-sm">{opt.name}</p>
                      <p className="text-[#9B9B9B] text-xs font-light">{opt.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5C5C5]" />
                  </motion.button>
                ))}

                <motion.button
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#F5F0E8] text-left active:bg-[#F5F0E8]"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    copyAddress()
                    setShowMapSheet(false)
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5F0E8] text-[#6B7B6B] flex items-center justify-center shrink-0">
                    <Copy className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#2D3A2D] font-medium text-sm">复制地址</p>
                    <p className="text-[#9B9B9B] text-xs font-light">分享给好友或自行搜索</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#C5C5C5]" />
                </motion.button>
              </div>

              <motion.button
                className="w-full py-3.5 rounded-2xl bg-[#F5F0E8] text-[#6B7B6B] font-medium text-sm active:bg-[#EBE5DA]"
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowMapSheet(false)}
              >
                取消
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 复制成功提示 */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed top-1/2 left-1/2 z-[60] bg-[#2D3A2D]/90 text-white text-sm font-light px-6 py-3 rounded-2xl backdrop-blur-sm"
            style={{ transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ─── 音乐播放器 ─── */
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const resumedRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.4

    const tryPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {})
    }

    tryPlay()

    const events = ['click', 'touchstart', 'keydown', 'scroll']
    const handleInteraction = () => {
      if (!audio.paused || resumedRef.current) return
      resumedRef.current = true
      tryPlay()
      events.forEach((e) => document.removeEventListener(e, handleInteraction))
    }

    events.forEach((e) => document.addEventListener(e, handleInteraction, { passive: true }))

    return () => {
      events.forEach((e) => document.removeEventListener(e, handleInteraction))
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/bgm.mp3" loop autoPlay preload="auto" />
      <div className="fixed top-4 right-4 z-[60] w-10 h-10">
        {isPlaying && (
          <>
            {/* 旋转虚线光环 */}
            <motion.div
              className="absolute inset-[-5px] rounded-full border border-dashed border-[#4A7C59]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            {/* 反向实线光环 */}
            <motion.div
              className="absolute inset-[-3px] rounded-full border border-[#4A7C59]/12"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
            {/* 萤火光点 - 三个不同半径轨道 */}
            {[0, 1, 2].map((i) => {
              const r = 18 + i * 6
              return (
                <motion.div
                  key={`orbit-${i}`}
                  className="absolute top-1/2 left-1/2"
                  style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4 + i * 2.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4A7C59]"
                    animate={{ opacity: [0.15, 0.85, 0.15], scale: [0.4, 1.3, 0.4] }}
                    transition={{
                      duration: 1.8 + i * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ filter: 'blur(0.5px)' }}
                  />
                </motion.div>
              )
            })}
            {/* 径向柔光呼吸 */}
            <motion.div
              className="absolute inset-[-10px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(74,124,89,0.1) 0%, rgba(74,124,89,0.03) 40%, transparent 70%)',
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        {/* 按钮本体 */}
        <motion.button
          onClick={toggle}
          className={`relative w-full h-full rounded-full backdrop-blur-xl border shadow-lg flex items-center justify-center transition-colors ${
            isPlaying
              ? 'bg-white/80 border-[#4A7C59]/25 text-[#4A7C59]'
              : 'bg-gray-200/60 border-gray-300/40 text-gray-400'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
          >
            {isPlaying ? (
              <Music className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </motion.div>
        </motion.button>
      </div>
    </>
  )
}

/* ─── 底部浮动 CTA ─── */
function FloatingCta() {
  return (
    <motion.a
      href="tel:18349142304"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/70 backdrop-blur-xl border-t border-white/40 block"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ ...gentleEase, delay: 1.5 }}
    >
      <div className="w-full bg-[#4A7C59] hover:bg-[#3D6548] text-white font-medium py-3.5 px-8 rounded-full shadow-lg shadow-[#4A7C59]/20 transition-colors flex items-center justify-center gap-2 tracking-wider">
        <Phone className="w-4 h-4" />
        立即预订：183 4914 2304
      </div>
    </motion.a>
  )
}

/* ─── 页面入口 ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden">
      <ScrollProgress />
      <MusicPlayer />

      {/* 全局背景光晕 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4A7C59]/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#8B7355]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#4A7C59]/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <RoomsSection />
        <PhilosophySection />
        <ContactSection />

        <div className="pb-28">
          <div className="text-center py-10">
            <motion.div
              className="inline-flex items-center gap-2 bg-[#F5F0E8]/80 backdrop-blur-sm rounded-full px-6 py-2.5 border border-white/50"
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={softSpring}
            >
              <Leaf className="w-4 h-4 text-[#4A7C59]" />
              <span className="text-[#6B7B6B] text-sm font-light">好项目 999+</span>
            </motion.div>
          </div>
        </div>
      </div>

      <FloatingCta />
    </div>
  )
}
