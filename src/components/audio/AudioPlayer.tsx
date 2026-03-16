'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  slug: string
}

export default function AudioPlayer({ slug }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function fetchAudioUrl() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/media/audio/${slug}`)
      if (res.status === 402) {
        setError('Krever abonnement')
        return
      }
      if (!res.ok) throw new Error()
      const data = await res.json()
      setAudioUrl(data.url)
    } catch {
      setError('Kunne ikke laste lydfil')
    } finally {
      setLoading(false)
    }
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return

    if (!audioUrl) {
      fetchAudioUrl()
      return
    }

    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setPlaying(true)
    }
  }, [audioUrl])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const progressPct = duration > 0 ? (progress / duration) * 100 : 0
  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  if (error === 'Krever abonnement') {
    return (
      <div
        className="flex items-center gap-3 p-3 rounded-xl text-sm"
        style={{ backgroundColor: '#2a1a3e', color: '#c9a96e' }}
      >
        <span>🔒</span>
        <span>Lydveiledning krever abonnement</span>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col gap-2 p-3 rounded-xl"
      style={{ backgroundColor: '#1a1a3e' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          disabled={loading}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-opacity disabled:opacity-50"
          style={{ backgroundColor: '#c9a96e', color: '#1a1a2e' }}
          aria-label={playing ? 'Pause' : 'Spill av'}
        >
          {loading ? '⏳' : playing ? '⏸' : '▶'}
        </button>

        <div className="flex-1 flex flex-col gap-1">
          <p className="text-xs font-medium" style={{ color: '#c9a96e' }}>
            Lydveiledning
          </p>
          {/* Progress bar */}
          <div
            className="h-1.5 rounded-full overflow-hidden cursor-pointer"
            style={{ backgroundColor: '#333355' }}
            onClick={(e) => {
              if (!audioRef.current || !audioUrl) return
              const rect = e.currentTarget.getBoundingClientRect()
              const ratio = (e.clientX - rect.left) / rect.width
              audioRef.current.currentTime = ratio * duration
            }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progressPct}%`, backgroundColor: '#c9a96e' }}
            />
          </div>
          <div className="flex justify-between text-xs" style={{ color: '#666688' }}>
            <span>{formatTime(progress)}</span>
            {duration > 0 && <span>{formatTime(duration)}</span>}
          </div>
        </div>
      </div>

      {error && (
        <p className="text-xs" style={{ color: '#e08080' }}>{error}</p>
      )}

      <audio
        ref={audioRef}
        onTimeUpdate={() => setProgress(audioRef.current?.currentTime ?? 0)}
        onDurationChange={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  )
}
