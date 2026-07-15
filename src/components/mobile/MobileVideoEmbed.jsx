import { useState } from 'react'
import { Play, ExternalLink } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function MobileVideoEmbed({ videoId, label, accent }) {
  const [playing, setPlaying] = useState(false)
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const embed = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
  const watch = `https://www.youtube.com/shorts/${videoId}`

  return (
    <div className="space-y-2">
      {label && label !== 'Demo' && (
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${accent.text}`}>
          {label}
        </span>
      )}
      <div className="relative overflow-hidden rounded-2xl border border-edge bg-panel aspect-[9/16] w-full max-w-[280px] mx-auto">
        <AnimatePresence mode="wait">
          {!playing ? (
            <motion.button
              key="thumb"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 w-full h-full cursor-pointer"
              aria-label={`Play ${label || 'exercise'} video`}
            >
              <img
                src={thumb}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${accent.bg} text-ink ${accent.glow}`}
                >
                  <Play className="h-7 w-7 fill-current ml-0.5" />
                </span>
              </div>
            </motion.button>
          ) : (
            <motion.iframe
              key="iframe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={embed}
              title={label || 'Exercise demo'}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </AnimatePresence>
      </div>
      <a
        href={watch}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 py-1 text-xs text-mute active:text-ghost transition"
      >
        Open on YouTube
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  )
}
