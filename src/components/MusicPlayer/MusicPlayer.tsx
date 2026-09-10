import { useState, useRef, useEffect, useCallback } from 'react'
import { playlist } from '../../data/playlist'
import './MusicPlayer.css'

export interface MusicPlayerProps {
  visible?: boolean
}

export default function MusicPlayer({ visible = true }: MusicPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [prevVolume, setPrevVolume] = useState(0.7)
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const volumeContainerRef = useRef<HTMLDivElement>(null)

  const currentTrack = playlist[currentIndex]

  const playTrack = useCallback(() => {
    audioRef.current?.play()
    setIsPlaying(true)
  }, [])

  const pauseTrack = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
  }, [])

  // Auto-play when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(() => {})
      }
    }
  }, [currentIndex])

  // Set volume on audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Close volume popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        volumeContainerRef.current &&
        !volumeContainerRef.current.contains(e.target as Node)
      ) {
        setShowVolume(false)
      }
    }

    if (showVolume) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showVolume])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    goToNext()
    setTimeout(() => {
      audioRef.current?.play().catch(() => {})
    }, 100)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const togglePlay = () => {
    if (isPlaying) pauseTrack()
    else playTrack()
  }

  const toggleVolumeMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (volume > 0) {
      setPrevVolume(volume)
      setVolume(0)
    } else {
      setVolume(prevVolume > 0 ? prevVolume : 0.7)
    }
  }

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0
  const volumePercent = volume * 100

  return (
    <div className={`music-player ${!visible ? 'hidden' : ''}`}>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Vinyl / Music icon animation */}
      <div className="player-vinyl" onClick={togglePlay}>
        <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
          <div className="vinyl-center">
            {isPlaying ? (
              <svg className="music-note-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
              </svg>
            ) : (
              <svg className="music-note-icon paused" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Player body */}
      <div className="player-body">
        {/* Track info */}
        <div className="track-info">
          <div className="track-header">
            <p className="track-title">{currentTrack.title}</p>
            {isPlaying && (
              <div className="eq-bars">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            )}
          </div>
          <p className="track-artist">{currentTrack.artist}</p>
        </div>

        {/* Progress bar with dynamic color fill */}
        <div className="progress-wrapper">
          <span className="time-label">{formatTime(progress)}</span>
          <div className="slider-container">
            <input
              className="progress-bar"
              type="range"
              min={0}
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              style={{
                background: `linear-gradient(to right, #ff4fca 0%, #e879f9 ${progressPercent}%, rgba(255, 255, 255, 0.15) ${progressPercent}%, rgba(255, 255, 255, 0.15) 100%)`,
              }}
            />
          </div>
          <span className="time-label">{formatTime(duration)}</span>
        </div>

        {/* Controls row */}
        <div className="controls">
          <button className="ctrl-btn" onClick={goToPrev} title="Previous Song">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          <button className="ctrl-btn play-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </button>

          <button className="ctrl-btn" onClick={goToNext} title="Next Song">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
            </svg>
          </button>

          {/* Speaker / Volume Button placed right beside next button */}
          <div className="volume-control-container" ref={volumeContainerRef}>
            <button
              className={`ctrl-btn speaker-btn ${showVolume ? 'active' : ''}`}
              onClick={() => setShowVolume((prev) => !prev)}
              title="Volume Control"
            >
              {volume === 0 ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : volume < 0.5 ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 9v6h4l5 5V4L11 9H7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            {/* Floating Volume Slider Popover with Volume Percentage Label */}
            {showVolume && (
              <div className="volume-popover">
                <button
                  className="mute-toggle-btn"
                  onClick={toggleVolumeMute}
                  title={volume === 0 ? 'Unmute' : 'Mute'}
                >
                  {volume === 0 ? '🔇' : '🔊'}
                </button>
                <div className="volume-slider-box">
                  <input
                    className="volume-bar"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #ff4fca 0%, #e879f9 ${volumePercent}%, rgba(255, 255, 255, 0.15) ${volumePercent}%, rgba(255, 255, 255, 0.15) 100%)`,
                    }}
                  />
                </div>
                <span className="volume-label">{Math.round(volumePercent)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
