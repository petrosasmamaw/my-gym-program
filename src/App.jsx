import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Dumbbell,
  Flame,
  CalendarDays,
  Target,
  ChevronDown,
} from 'lucide-react'
import DaySwitcher from './components/DaySwitcher'
import { MuscleGroup } from './components/ExerciseCard'
import { workoutDays, accentMap } from './data/workouts'

function getDefaultDay() {
  const map = {
    1: 'monday',
    2: 'tuesday',
    4: 'thursday',
    6: 'saturday',
  }
  const today = new Date().getDay()
  return map[today] || 'monday'
}

export default function App() {
  const [activeId, setActiveId] = useState(getDefaultDay)
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
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-ink" />
        <div
          className="absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-30 blur-[100px] transition-colors duration-700"
          style={{
            background:
              activeDay.accent === 'ember'
                ? 'radial-gradient(circle, #ff6b35 0%, transparent 70%)'
                : activeDay.accent === 'sky'
                  ? 'radial-gradient(circle, #5b8def 0%, transparent 70%)'
                  : 'radial-gradient(circle, #c8f542 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2f3a18_1px,transparent_1px),linear-gradient(to_bottom,#2a2f3a18_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Hero */}
      <header className="relative mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14 sm:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-edge bg-panel/60 px-3 py-1.5 text-xs text-mute backdrop-blur">
            <Dumbbell className="h-3.5 w-3.5 text-volt" />
            Gym Program
          </div>

          <div>
            <h1 className="font-display text-[clamp(3.5rem,12vw,7.5rem)] leading-[0.85] tracking-wide text-white">
              <span className="block text-volt">Petros's</span>
              <span className="block">Structured</span>
              <span className="block text-mute/90">4-Day Program</span>
            </h1>
            <p className="mt-5 max-w-lg text-base sm:text-lg text-mute leading-relaxed">
              Pick your training day. Follow each move with form videos built in —
              chest, back, legs, arms, and more.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-mute">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-volt" />4 training days
            </span>
            <span className="inline-flex items-center gap-2">
              <Target className="h-4 w-4 text-ember" />
              Structured splits
            </span>
            <span className="inline-flex items-center gap-2">
              <Flame className="h-4 w-4 text-sky" />
              Video demos
            </span>
          </div>

          <motion.a
            href="#workout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 inline-flex w-fit items-center gap-2 text-sm text-ghost hover:text-volt transition"
          >
            Start training
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </motion.a>
        </motion.div>
      </header>

      <DaySwitcher
        days={workoutDays}
        activeId={activeId}
        onChange={setActiveId}
      />

      <main id="workout" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-edge pb-6">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent.text}`}>
                  Training day
                </p>
                <h2 className="font-display text-5xl sm:text-6xl tracking-wide text-white mt-1">
                  {activeDay.fullLabel}
                </h2>
                <p className="mt-2 text-mute">{activeDay.focus}</p>
              </div>
              <div className="flex gap-3">
                <div className="rounded-xl border border-edge bg-panel px-4 py-3 text-center">
                  <p className="font-display text-3xl text-white leading-none">
                    {activeDay.groups.length}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-mute mt-1">
                    Muscle groups
                  </p>
                </div>
                <div className="rounded-xl border border-edge bg-panel px-4 py-3 text-center">
                  <p className="font-display text-3xl text-white leading-none">
                    {exerciseCount}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-mute mt-1">
                    Exercises
                  </p>
                </div>
              </div>
            </div>

            {activeDay.groups.map((group) => {
              const start = exerciseOffset
              exerciseOffset += group.exercises.length
              return (
                <MuscleGroup
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

      <footer className="border-t border-edge/60 py-8 text-center text-sm text-mute">
        <p className="font-display text-xl tracking-wider text-ghost/80">
          Petros's Gym Program
        </p>
        <p className="mt-1">Train with intent. Recover with discipline.</p>
      </footer>
    </div>
  )
}
