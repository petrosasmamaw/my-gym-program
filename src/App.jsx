import { useState } from 'react'
import { useIsDesktop } from './hooks/useMediaQuery'
import MobileLayout from './components/mobile/MobileLayout'
import DesktopLayout from './components/desktop/DesktopLayout'
import { workoutDays } from './data/workouts'

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

function Atmosphere({ accent }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-ink" />
      <div
        className="absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-30 blur-[100px] transition-colors duration-700"
        style={{
          background:
            accent === 'ember'
              ? 'radial-gradient(circle, #ff6b35 0%, transparent 70%)'
              : accent === 'sky'
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
  )
}

export default function App() {
  const isDesktop = useIsDesktop()
  const [activeId, setActiveId] = useState(getDefaultDay)

  const activeDay =
    workoutDays.find((d) => d.id === activeId) || workoutDays[0]

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Atmosphere accent={activeDay.accent} />

      {isDesktop ? (
        <DesktopLayout activeId={activeId} onDayChange={setActiveId} />
      ) : (
        <MobileLayout activeId={activeId} onDayChange={setActiveId} />
      )}
    </div>
  )
}
