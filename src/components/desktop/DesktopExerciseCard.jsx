import { motion } from 'framer-motion'
import { Dumbbell, Repeat, Layers } from 'lucide-react'
import DesktopVideoEmbed from './DesktopVideoEmbed'
import { accentMap } from '../../data/workouts'

const groupIcons = {
  Chest: Dumbbell,
  Back: Layers,
  Legs: Dumbbell,
  Shoulder: Dumbbell,
  Biceps: Dumbbell,
  Triceps: Dumbbell,
  Abs: Repeat,
}

export default function DesktopExerciseCard({ exercise, index, accentKey }) {
  const accent = accentMap[accentKey]

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-edge bg-panel/80 backdrop-blur-sm hover:border-ghost/15 transition-colors"
    >
      <div
        className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${accent.bar}`}
      />
      <div className="p-6 flex flex-row gap-8 items-start">
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex items-start gap-4">
            <span
              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent.bgSoft} ${accent.text} text-sm font-semibold`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-[2rem] tracking-wide text-white leading-tight">
                {exercise.name}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-panel-2 border border-edge px-3 py-1.5 text-sm text-ghost">
                  <Layers className="h-4 w-4 text-mute" />
                  {exercise.sets} sets
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-panel-2 border border-edge px-3 py-1.5 text-sm text-ghost">
                  <Repeat className="h-4 w-4 text-mute" />
                  {exercise.reps} reps
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex gap-4 shrink-0 ${
            exercise.videos.length > 1 ? 'justify-end' : ''
          }`}
        >
          {exercise.videos.map((video) => (
            <DesktopVideoEmbed
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

export function DesktopMuscleGroup({ group, accentKey, startIndex }) {
  const accent = accentMap[accentKey]
  const Icon = groupIcons[group.name] || Dumbbell

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.bgSoft} ${accent.text}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-display text-[2.5rem] tracking-wider text-white leading-none">
            {group.name}
          </h2>
          <p className="text-sm text-mute mt-1">
            {group.exercises.length} exercise
            {group.exercises.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {group.exercises.map((exercise, i) => (
          <DesktopExerciseCard
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
