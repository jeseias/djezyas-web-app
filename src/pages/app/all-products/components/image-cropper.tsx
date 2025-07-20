import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedImage: File) => void
  onCancel: () => void
}

export function ImageCropper({ imageSrc, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0, size: 200 })
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height })
      // Set initial crop to center
      const size = Math.min(img.width, img.height)
      setCrop({
        x: (img.width - size) / 2,
        y: (img.height - size) / 2,
        size: size
      })
    }
    img.src = imageSrc
  }, [imageSrc])

  const handleCropChange = (newCrop: Partial<typeof crop>) => {
    setCrop(prev => ({ ...prev, ...newCrop }))
  }

  const applyCrop = () => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to crop size
    canvas.width = crop.size
    canvas.height = crop.size

    // Draw the cropped portion
    ctx.drawImage(
      img,
      crop.x, crop.y, crop.size, crop.size, // Source rectangle
      0, 0, crop.size, crop.size // Destination rectangle
    )

    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' })
        onCropComplete(file)
      }
    }, 'image/jpeg', 0.9)
  }

  return (
    <div className="space-y-4">
      <div className="relative inline-block">
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Crop preview"
          className="max-w-full max-h-96 object-contain"
          style={{ display: 'none' }}
        />
        
        <div className="relative inline-block">
          <img
            src={imageSrc}
            alt="Crop preview"
            className="max-w-full max-h-96 object-contain"
          />
          
          {/* Crop overlay */}
          <div
            className="absolute border-2 border-white shadow-lg"
            style={{
              left: `${(crop.x / imageSize.width) * 100}%`,
              top: `${(crop.y / imageSize.height) * 100}%`,
              width: `${(crop.size / imageSize.width) * 100}%`,
              height: `${(crop.size / imageSize.height) * 100}%`,
            }}
          >
            {/* Corner handles */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-gray-400 cursor-nw-resize" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-400 cursor-ne-resize" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-gray-400 cursor-sw-resize" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-gray-400 cursor-se-resize" />
          </div>
        </div>
      </div>

      {/* Crop controls */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Crop Size</label>
        <input
          type="range"
          min="50"
          max={Math.min(imageSize.width, imageSize.height)}
          value={crop.size}
          onChange={(e) => handleCropChange({ size: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground">
          Size: {crop.size}px × {crop.size}px
        </div>
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={applyCrop}>
          Apply Crop
        </Button>
      </div>
    </div>
  )
} 