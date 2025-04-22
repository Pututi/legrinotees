"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  webmSrc?: string
  poster?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  height?: string | number
  width?: string | number
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

export function VideoPlayer({
  src,
  webmSrc,
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  objectFit = "cover",
  height = "100%",
  width = "100%",
  className,
  onPlay,
  onPause,
  onEnded,
  ...props
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }

    const handlePause = () => {
      setIsPlaying(false)
      onPause?.()
    }

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false)
      }
      onEnded?.()
    }

    const handleError = (e: ErrorEvent) => {
      console.error("Error al cargar el video:", e)
      setError("No se pudo cargar el video. Por favor, inténtalo de nuevo más tarde.")
    }

    videoElement.addEventListener("play", handlePlay)
    videoElement.addEventListener("pause", handlePause)
    videoElement.addEventListener("ended", handleEnded)
    videoElement.addEventListener("error", handleError as EventListener)

    // Intentar reproducir el video si autoPlay está habilitado
    if (autoPlay) {
      videoElement.play().catch((err) => {
        console.warn("Reproducción automática bloqueada:", err)
        setIsPlaying(false)
      })
    }

    return () => {
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("pause", handlePause)
      videoElement.removeEventListener("ended", handleEnded)
      videoElement.removeEventListener("error", handleError as EventListener)
    }
  }, [autoPlay, loop, onPlay, onPause, onEnded])

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch((err) => {
        console.error("Error al reproducir el video:", err)
      })
    }
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ height, width }} {...props}>
      {error ? (
        <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-500 p-4 text-center">
          {error}
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className={cn("w-full h-full", `object-${objectFit}`)}
            poster={poster}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline
            controls={controls}
            onClick={!controls ? togglePlay : undefined}
          >
            {webmSrc && <source src={webmSrc} type="video/webm" />}
            <source src={src} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>

          {!controls && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100",
                isPlaying ? "cursor-pointer" : "cursor-pointer opacity-100",
              )}
              onClick={togglePlay}
            >
              {!isPlaying && (
                <button
                  className="bg-white/80 text-black rounded-full p-4 hover:bg-white transition-colors"
                  aria-label="Reproducir video"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
