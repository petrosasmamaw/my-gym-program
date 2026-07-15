import { motion } from 'framer-motion'
import { accentMap } from '../../data/workouts'

export default function MobileDaySwitcher({ days, activeId, onChange }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-edge/90 bg-ink/95 backdrop-blur-xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Training days"
    >
      <div className="grid grid-cols-4 gap-1.5 px-3 py-2.5">
        {days.map((day) => {
          const active = day.id === activeId
          const accent = accentMap[day.accent]
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => onChange(day.id)}
              className={`relative flex flex-col items-center justify-center rounded-xl py-2.5 min-h-[56px] transition-all duration-200 focus:outline-none focus-visible:ring-2 ${accent.ring} active:scale-95 ${
                active
                  ? `${accent.bg} text-ink font-semibold ${accent.glow}`
                  : 'bg-panel/80 text-mute'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="mobile-day-pill"
                  className="absolute inset-0 rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative z-10 font-display text-lg tracking-wider leading-none">
                {day.label}
              </span>
              <span
                className={`relative z-10 mt-0.5 text-[9px] uppercase tracking-widest font-medium truncate max-w-full px-1 ${
                  active ? 'text-ink/65' : 'text-mute/80'
                }`}
              >
                {day.fullLabel.slice(0, 3)}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
