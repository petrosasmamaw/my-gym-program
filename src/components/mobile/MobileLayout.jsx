import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MobileHero from './MobileHero'
import MobileDaySwitcher from './MobileDaySwitcher'
import { MobileMuscleGroup } from './MobileExerciseCard'
import { workoutDays, accentMap } from '../../data/workouts'

export default function MobileLayout({ activeId, onDayChange }) {
  const activeDay = useMemo(
    () => workoutDays.find((d) => d.id === activeId) || workoutDays[0],
    [activeId],
  )
  const accent = accentMap[activeDay.accent]

  const exerciseCount = activeDay.groups.reduce(
    (sum, g) => sum + g.exercises.length,
    0,
  )

  let exerciseOffset = 0

  return (
    <>
      <MobileHero />

      <main
        id="workout"
        className="px-4 pt-2 pb-28"
        style={{ paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="rounded-2xl border border-edge bg-panel/60 p-4">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${accent.text}`}>
                Today&apos;s session
              </p>
              <h2 className="font-display text-[2.5rem] tracking-wide text-white mt-1 leading-none">
                {activeDay.fullLabel}
              </h2>
              <p className="mt-2 text-sm text-mute">{activeDay.focus}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-edge bg-ink/50 px-3 py-2.5 text-center">
                  <p className="font-display text-2xl text-white leading-none">
                    {activeDay.groups.length}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-mute mt-1">
                    Groups
                  </p>
                </div>
                <div className="rounded-xl border border-edge bg-ink/50 px-3 py-2.5 text-center">
                  <p className="font-display text-2xl text-white leading-none">
                    {exerciseCount}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-mute mt-1">
                    Exercises
                  </p>
                </div>
              </div>
            </div>

            {activeDay.groups.map((group) => {
              const start = exerciseOffset
              exerciseOffset += group.exercises.length
              return (
                <MobileMuscleGroup
                  key={group.name}
                  group={group}
                  accentKey={activeDay.accent}
                  startIndex={start}
                />
              )
            })}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer
        className="border-t border-edge/60 px-4 py-6 text-center text-xs text-mute"
        style={{ paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <p className="font-display text-lg tracking-wider text-ghost/80">
          Petros&apos;s Gym Program
        </p>
        <p className="mt-1">Train with intent.</p>
      </footer>

      <MobileDaySwitcher
        days={workoutDays}
        activeId={activeId}
        onChange={onDayChange}
      />
    </>
  )
}
