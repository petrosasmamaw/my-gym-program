import { motion } from 'framer-motion'
import { Repeat, Layers } from 'lucide-react'
import MobileVideoEmbed from './MobileVideoEmbed'
import { accentMap } from '../../data/workouts'

export default function MobileExerciseCard({ exercise, index, accentKey }) {
  const accent = accentMap[accentKey]

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-edge bg-panel"
    >
      <div className={`h-1 w-full bg-gradient-to-r ${accent.bar}`} />

      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent.bgSoft} ${accent.text} text-xs font-bold`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[1.65rem] tracking-wide text-white leading-tight">
              {exercise.name}
            </h3>
            <div className="mt-2.5 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-panel-2 border border-edge px-2.5 py-1.5 text-[11px] text-ghost">
                <Layers className="h-3 w-3 text-mute" />
                {exercise.sets} sets
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-panel-2 border border-edge px-2.5 py-1.5 text-[11px] text-ghost">
                <Repeat className="h-3 w-3 text-mute" />
                {exercise.reps} reps
              </span>
            </div>
          </div>
        </div>

        <div className={`grid gap-3 ${exercise.videos.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {exercise.videos.map((video) => (
            <MobileVideoEmbed
              key={video.id}
              videoId={video.id}
              label={video.label}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export function MobileMuscleGroup({ group, accentKey, startIndex }) {
  const accent = accentMap[accentKey]

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2.5 px-0.5">
        <div
          className={`h-8 w-1 rounded-full bg-gradient-to-b ${accent.bar}`}
        />
        <div>
          <h2 className="font-display text-[1.85rem] tracking-wider text-white leading-none">
            {group.name}
          </h2>
          <p className="text-xs text-mute mt-0.5">
            {group.exercises.length} exercise
            {group.exercises.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {group.exercises.map((exercise, i) => (
          <MobileExerciseCard
            key={`${group.name}-${exercise.name}`}
            exercise={exercise}
            index={startIndex + i}
            accentKey={accentKey}
          />
        ))}
      </div>
    </section>
  )
}
