import { motion } from 'framer-motion'
import { Dumbbell, Repeat, Layers } from 'lucide-react'
import VideoEmbed from './VideoEmbed'
import { accentMap } from '../data/workouts'

const groupIcons = {
  Chest: Dumbbell,
  Back: Layers,
  Legs: Dumbbell,
  Shoulder: Dumbbell,
  Biceps: Dumbbell,
  Triceps: Dumbbell,
  Abs: Repeat,
}

export default function ExerciseCard({ exercise, index, accentKey }) {
  const accent = accentMap[accentKey]

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-edge bg-panel/80 backdrop-blur-sm"
    >
      <div
        className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${accent.bar}`}
      />
      <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex items-start gap-3">
            <span
              className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${accent.bgSoft} ${accent.text} text-sm font-semibold`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-white leading-none">
                {exercise.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-panel-2 border border-edge px-2.5 py-1 text-xs text-ghost">
                  <Layers className="h-3.5 w-3.5 text-mute" />
                  {exercise.sets} sets
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-panel-2 border border-edge px-2.5 py-1 text-xs text-ghost">
                  <Repeat className="h-3.5 w-3.5 text-mute" />
                  {exercise.reps} reps
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-4 justify-center sm:justify-start ${
            exercise.videos.length > 1 ? 'lg:justify-end' : ''
          }`}
        >
          {exercise.videos.map((video) => (
            <VideoEmbed
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

export function MuscleGroup({ group, accentKey, startIndex }) {
  const accent = accentMap[accentKey]
  const Icon = groupIcons[group.name] || Dumbbell

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.bgSoft} ${accent.text}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-3xl sm:text-4xl tracking-wider text-white">
            {group.name}
          </h2>
          <p className="text-sm text-mute">
            {group.exercises.length} exercise
            {group.exercises.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {group.exercises.map((exercise, i) => (
          <ExerciseCard
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
