import { motion } from 'framer-motion'
import { Dumbbell, Flame, CalendarDays, Target, ChevronDown } from 'lucide-react'

export default function MobileHero() {
  return (
    <header className="px-4 pt-6 pb-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel/70 px-3 py-1.5 text-[11px] text-mute">
          <Dumbbell className="h-3 w-3 text-volt" />
          Gym Program
        </div>

        <div>
          <h1 className="font-display text-[2.75rem] leading-[0.9] tracking-wide text-white">
            <span className="block text-volt">Petros's</span>
            <span className="block">4-Day Program</span>
          </h1>
          <p className="mt-3 text-sm text-mute leading-relaxed">
            Pick your day. Follow each move with built-in form videos.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-edge bg-panel px-3 py-2 text-xs text-mute">
            <CalendarDays className="h-3.5 w-3.5 text-volt" />
            4 days
          </span>
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-edge bg-panel px-3 py-2 text-xs text-mute">
            <Target className="h-3.5 w-3.5 text-ember" />
            Structured
          </span>
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-edge bg-panel px-3 py-2 text-xs text-mute">
            <Flame className="h-3.5 w-3.5 text-sky" />
            Videos
          </span>
        </div>

        <motion.a
          href="#workout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-edge bg-panel py-3.5 text-sm font-medium text-ghost active:scale-[0.98] transition"
        >
          Start training
          <ChevronDown className="h-4 w-4 text-volt" />
        </motion.a>
      </motion.div>
    </header>
  )
}
