import { motion } from 'framer-motion'
import { Dumbbell, Flame, CalendarDays, Target, ChevronDown } from 'lucide-react'

export default function DesktopHero() {
  return (
    <header className="mx-auto max-w-6xl px-8 pt-16 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-8"
      >
        <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-edge bg-panel/60 px-4 py-2 text-sm text-mute backdrop-blur">
          <Dumbbell className="h-4 w-4 text-volt" />
          Gym Program
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <h1 className="font-display text-[7.5rem] leading-[0.85] tracking-wide text-white">
              <span className="block text-volt">Petros&apos;s</span>
              <span className="block">Structured</span>
              <span className="block text-mute/90">4-Day Program</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-mute leading-relaxed">
              Pick your training day. Follow each move with form videos built in —
              chest, back, legs, arms, and more.
            </p>
          </div>

          <div className="flex flex-col gap-4 min-w-[220px]">
            <span className="inline-flex items-center gap-2.5 rounded-xl border border-edge bg-panel px-4 py-3 text-sm text-mute">
              <CalendarDays className="h-4 w-4 text-volt" />
              4 training days
            </span>
            <span className="inline-flex items-center gap-2.5 rounded-xl border border-edge bg-panel px-4 py-3 text-sm text-mute">
              <Target className="h-4 w-4 text-ember" />
              Structured splits
            </span>
            <span className="inline-flex items-center gap-2.5 rounded-xl border border-edge bg-panel px-4 py-3 text-sm text-mute">
              <Flame className="h-4 w-4 text-sky" />
              Video demos
            </span>
          </div>
        </div>

        <motion.a
          href="#workout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="inline-flex w-fit items-center gap-2 text-sm text-ghost hover:text-volt transition-colors"
        >
          Start training
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.a>
      </motion.div>
    </header>
  )
}
