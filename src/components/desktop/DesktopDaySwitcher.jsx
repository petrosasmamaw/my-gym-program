import { motion } from 'framer-motion'
import { accentMap } from '../../data/workouts'

export default function DesktopDaySwitcher({ days, activeId, onChange }) {
  return (
    <div className="sticky top-0 z-40 border-b border-edge/80 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-8 py-4">
        <div className="grid grid-cols-4 gap-4">
          {days.map((day) => {
            const active = day.id === activeId
            const accent = accentMap[day.accent]
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => onChange(day.id)}
                className={`relative overflow-hidden rounded-2xl px-5 py-4 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 ${accent.ring} ${
                  active
                    ? `${accent.bg} text-ink font-semibold ${accent.glow}`
                    : 'bg-panel border border-edge text-mute hover:text-ghost hover:border-ghost/25 hover:bg-panel-2'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="desktop-day-pill"
                    className="absolute inset-0 rounded-2xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 block font-display text-[1.75rem] tracking-wider leading-none">
                  {day.label}
                </span>
                <span
                  className={`relative z-10 mt-1.5 block text-[11px] uppercase tracking-widest font-body font-medium ${
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
