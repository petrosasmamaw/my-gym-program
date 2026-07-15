import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DesktopHero from './DesktopHero'
import DesktopDaySwitcher from './DesktopDaySwitcher'
import { DesktopMuscleGroup } from './DesktopExerciseCard'
import { workoutDays, accentMap } from '../../data/workouts'

export default function DesktopLayout({ activeId, onDayChange }) {
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
      <DesktopHero />

      <DesktopDaySwitcher
        days={workoutDays}
        activeId={activeId}
        onChange={onDayChange}
      />

      <main id="workout" className="mx-auto max-w-6xl px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-14"
          >
            <div className="flex items-end justify-between gap-8 border-b border-edge pb-8">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent.text}`}>
                  Training day
                </p>
                <h2 className="font-display text-[4rem] tracking-wide text-white mt-2 leading-none">
                  {activeDay.fullLabel}
                </h2>
                <p className="mt-3 text-lg text-mute">{activeDay.focus}</p>
              </div>
              <div className="flex gap-4">
                <div className="rounded-2xl border border-edge bg-panel px-6 py-4 text-center min-w-[120px]">
                  <p className="font-display text-4xl text-white leading-none">
                    {activeDay.groups.length}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-mute mt-2">
                    Muscle groups
                  </p>
                </div>
                <div className="rounded-2xl border border-edge bg-panel px-6 py-4 text-center min-w-[120px]">
                  <p className="font-display text-4xl text-white leading-none">
                    {exerciseCount}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-mute mt-2">
                    Exercises
                  </p>
                </div>
              </div>
            </div>

            {activeDay.groups.map((group) => {
              const start = exerciseOffset
              exerciseOffset += group.exercises.length
              return (
                <DesktopMuscleGroup
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

      <footer className="border-t border-edge/60 py-10 text-center text-sm text-mute">
        <p className="font-display text-2xl tracking-wider text-ghost/80">
          Petros&apos;s Gym Program
        </p>
        <p className="mt-2">Train with intent. Recover with discipline.</p>
      </footer>
    </>
  )
}
