# 町竹隐项目踩坑记录

## 开发环境

### 1. Node 版本不兼容 Vite 7

**现象**：`vite build` 直接报错，无法构建。

**原因**：Vite 7 要求 Node 20+，系统默认安装的是 Node 18。

**解决**：在 `package.json` 中配置 Volta 固定 Node 版本为 22.13.1：

```json
"volta": { "node": "22.13.1" }
```

然后用 `volta run npm run build` 代替 `npm run build`，Volta 会自动切换到正确版本。

---

### 2. 项目根目录混淆（tzy vs app）

**现象**：源码在 `E:\code\tzy`，但 package.json / node_modules / git 都在 `E:\code\app`，编辑和构建要跨两个目录 `cp` 同步，极易出错。

**解决**：把 `app` 下的所有配置文件（package.json、vite.config.ts、tsconfig*.json、tailwind.config.js 等）复制到 `tzy`，在 `tzy` 执行 `npm install`，让 `tzy` 成为自包含的完整项目。之后所有操作统一在 `tzy` 进行。

---

## 图片处理

### 3. 中文文件名在 URL 中的编码问题

**现象**：构建后的页面中图片偶发加载失败。

**原因**：中文文件名在不同服务器/浏览器上的 URL 编码行为不一致。

**解决**：全部图片重命名为英文文件名（如 `lobby.jpg`、`tatami-suite.jpg` 等），避免编码问题。

---

### 4. 图片过大（总计 59MB）不适合移动端

**现象**：移动端首次加载极慢，流量消耗大。

**原因**：原始图片来自相机/手机，每张 3-6MB，总大小约 59MB。

**解决**：用 `sharp` 批量压缩：

```js
sharp(input)
  .resize(1200, undefined, { withoutEnlargement: true, fit: 'inside' })
  .jpeg({ quality: 80, mozjpeg: true, progressive: true })
```

- 最大宽度 1200px（覆盖移动端 2x retina）
- mozjpeg 编码器 + progressive JPEG
- 结果：59MB → 2.1MB（-96.5%），单张 116-246KB，视觉质量几乎无损

---

### 5. 图片和文字内容对不上

**现象**：「光影长廊」显示的是竹篱图片，「竹篱幽径」显示的是长廊图片。

**原因**：开发时凭文件名猜测内容，没有逐张确认实际图片内容。

**解决**：用 `Read` 工具逐张查看图片内容后，修正 `FeaturesSection` 中每张图的 `image` 和 `title`/`desc` 对应关系。

---

### 6. CircleReveal 动画不触发导致空白

**现象**：`AboutSection` 的图片位置显示一片空白，看起来像间距过大。

**原因**：`CircleReveal` 组件使用 `clipPath: 'circle(0% at 50% 50%)'` 动画，在某些情况下 `clipPath` 动画不触发，导致整个元素不可见。

**解决**：将 `CircleReveal` 替换为 `ScaleIn` + 普通 `<img>` 标签，动画更稳定可靠。

---

## 视频处理

### 7. HEVC (H.265) 视频浏览器兼容性差

**现象**：hero 视频在部分浏览器上无法播放，尤其是较旧的 Android 设备和部分桌面浏览器。

**原因**：原始视频是 HEVC 编码（H.265），Chrome 桌面版和部分移动浏览器不支持。

**解决**：用 ffmpeg 转为 H.264 (AVC)：

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -b:v 2000k -maxrate 2500k -bufsize 4000k \
  -preset slow -profile:v main -movflags +faststart \
  -c:a aac -b:a 48k output.mp4
```

- `-movflags +faststart`：MP4 元数据前置，支持渐进式下载播放
- `-profile:v main`：广泛兼容的 H.264 profile

---

### 8. 视频质量与大小的平衡

**踩坑过程**：

| 尝试 | 参数 | 大小 | 结果 |
|------|------|------|------|
| 1 | 480×854, CRF 32 | 4.8MB | 画面模糊 |
| 2 | 720×1280, CRF 22, slow | 33MB | 太大 |
| 3 | 720×1280, CRF 25 | ~24MB | 太大 |
| 4 | 720×1280, CRF 28 | 17MB | 太大 |
| **最终** | **720×1280, 2Mbps VBR, slow** | **7MB** | **清晰可用** |

**经验**：对于有大量细密纹理的视频（如竹叶），H.264 的 CRF 模式会分配极高码率。直接用目标码率 `-b:v` + `-maxrate` + `-bufsize` 控制更靠谱。

---

### 9. 视频音轨与背景音乐冲突

**现象**：部分手机浏览器只播放视频声音，背景音乐播不出来。

**原因**：hero 视频虽然加了 `muted` 属性，但视频文件本身携带的 AAC 音轨在某些移动浏览器上仍会抢占音频通道。

**解决**：用 ffmpeg 直接去掉视频的音轨：

```bash
ffmpeg -i input.mp4 -c:v copy -an output.mp4
```

`-an` = no audio，纯视频流，彻底避免冲突。

---

## 背景音乐

### 10. QQ 音乐 / 外部链接方案不可行

**初始方案**：嵌入 QQ 音乐 iframe 或直接链接。

**踩坑**：
- QQ 音乐分享链接返回 500
- 直接音频 URL 无法从页面提取
- iframe 跨域限制无法控制播放状态

**最终方案**：用户下载本地音频文件，直接用 `<audio>` 元素播放。

---

### 11. 浏览器自动播放策略阻止音频

**现象**：页面加载后音乐不会自动播放，必须手动点击按钮。

**原因**：Chrome、Safari 等现代浏览器禁止在没有用户手势的情况下自动播放带声音的媒体。

**解决三步走**：

1. **初始尝试**：`useEffect` 中直接 `audio.play()` → 被浏览器拦截
2. **监听首次交互**：在 `click`/`touchstart` 事件中重试播放
3. **最终方案**：

```tsx
// 用 useRef 而非 useState 追踪状态，避免 effect 反复重建
const resumedRef = useRef(false)

useEffect(() => {
  const tryPlay = () => audio.play().then(() => setIsPlaying(true)).catch(() => {})
  tryPlay() // 首次尝试（大概率失败）

  const events = ['click', 'touchstart', 'keydown', 'scroll']
  const handleInteraction = () => {
    if (!audio.paused || resumedRef.current) return
    resumedRef.current = true
    tryPlay()
  }
  events.forEach(e => document.addEventListener(e, handleInteraction, { passive: true }))
  return () => events.forEach(e => document.removeEventListener(e, handleInteraction))
}, []) // 空依赖，只运行一次
```

**关键点**：
- 空依赖数组 `[]` 避免 effect 反复 cleanup/re-run
- 用 ref 而非 state 追踪交互状态，避免触发 re-render 导致 listener 错乱
- 监听 `scroll` 事件补充覆盖纯滚动用户
- `{ passive: true }` 确保不影响页面滚动性能

---

### 12. useEffect 依赖数组导致事件监听错乱

**现象**：第一版 `useEffect` 依赖 `[hasInteracted]`，导致 state 更新后 effect 重新运行，旧的 listener 被移除、新的重新注册。在 `{ once: true }` 的配合下，listener 的 cleanup/re-register 时机错乱，首次交互捕获失败。

**解决**：依赖数组改为 `[]`，状态用 `useRef` 管理，effect 只运行一次。

---

### 13. OGG 格式在 iOS Safari 上不兼容

**现象**：背景音乐在 iPhone 上完全无法播放，点击按钮也没反应。

**原因**：iOS Safari 不完全支持 OGG Vorbis 格式的 `<audio>` 元素。

**解决**：转为 MP3 格式（`libmp3lame` 编码器，192kbps），全平台兼容：

```bash
ffmpeg -i input.ogg -c:a libmp3lame -b:a 192k output.mp3
```

同时将文件名中的中文字符去掉（`Grrreta - 悲悯_L.ogg` → `bgm.mp3`），避免 URL 编码问题。

---

### 14. 音乐播放器特效迭代

**第一版**：简单旋转 + 声波环。效果单薄。

**第二版**：5 层扩散环 + 6 个放射粒子 + boxShadow 脉冲。用户反馈「不好看」，特效太机械。

**最终版**：萤火虫轨道风格，符合「禅意」定位：
- 两条旋转光环（虚线 + 实线，反向旋转）
- 3 个轨道光点在不同半径上公转，带呼吸明暗
- 径向渐变柔光呼吸
- 暂停时按钮变灰 + `VolumeX` 图标，所有动画停止

**经验**：动画要匹配品牌调性，几何机械感 vs 有机自然感的效果差异很大。

---

## UI 组件

### 15. GlassCard 渐变叠加改为纯渐变

**初始**：Hero 底部信息卡片用 `GlassCard`（毛玻璃效果），在小尺寸下层级混乱。

**改为**：纯 CSS 渐变叠加 `bg-gradient-to-t from-black/80 via-black/30 to-transparent`，更简洁，文字可读性更好。

---

### 16. 过多的 CTA 按钮

**初始**：每个区块底部都有「立即预订」按钮，共计 5-6 个。

**用户要求**：只保留每个房型卡片里的预订按钮 + 全局底部浮动条，其余全部删除。减少视觉噪音，让用户专注于内容。

---

## 构建与部署

### 17. Vite 构建产物需要整体部署

`dist` 目录结构：

```
dist/
  index.html
  assets/
    index-XXXXXX.js   (~388KB gzip ~125KB)
    index-XXXXXX.css  (~91KB  gzip ~15KB)
```

部署时将整个 `dist` 目录上传到服务器，确保 `index.html` 与 `assets/` 的相对路径关系不变。图片和音频文件不会被打包进 JS/CSS，需要单独部署 `public/` 目录下的静态资源，或者确保服务器能正确 serve 这些文件。

---

## 总结

| 类别 | 坑数 | 关键词 |
|------|------|--------|
| 环境 | 2 | Node 版本、项目目录 |
| 图片 | 4 | 中文名、文件大小、内容匹配、动画空白 |
| 视频 | 3 | HEVC 兼容、质量平衡、音轨冲突 |
| 音频 | 5 | QQ 音乐、自动播放、effect 依赖、OGG 格式、特效设计 |
| UI | 2 | 渐变叠加、CTA 冗余 |
| 部署 | 1 | 构建产物结构 |
