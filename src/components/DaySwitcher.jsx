import { motion } from 'framer-motion'
import { accentMap } from '../data/workouts'

export default function DaySwitcher({ days, activeId, onChange }) {
  return (
    <div className="sticky top-0 z-40 border-b border-edge/80 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {days.map((day) => {
            const active = day.id === activeId
            const accent = accentMap[day.accent]
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => onChange(day.id)}
                className={`relative overflow-hidden rounded-xl px-2 py-3 sm:px-4 sm:py-3.5 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 ${accent.ring} ${
                  active
                    ? `${accent.bg} text-ink font-semibold ${accent.glow}`
                    : 'bg-panel border border-edge text-mute hover:text-ghost hover:border-ghost/20'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="day-pill"
                    className="absolute inset-0 rounded-xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 block font-display text-xl sm:text-2xl tracking-wider leading-none">
                  {day.label}
                </span>
                <span
                  className={`relative z-10 mt-1 hidden sm:block text-[10px] uppercase tracking-widest font-body font-medium ${
                    active ? 'text-ink/70' : 'text-mute'
                  }`}
                >
                  {day.fullLabel}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
