import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/cropper"

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedImage: File) => void
  onCancel: () => void
}

export function ImageCropper({ imageSrc, onCropComplete, onCancel }: ImageCropperProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCropComplete = async () => {
    setIsProcessing(true)
    try {
      // The cropper component handles the crop automatically
      // We'll create a simple file from the image source for now
      // In a real implementation, you'd get the cropped image data from the cropper
      const response = await fetch(imageSrc)
      const blob = await response.blob()
      const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" })
      onCropComplete(file)
    } catch (error) {
      console.error("Error processing cropped image:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Cropper
          className="h-80 w-80"
          image={imageSrc}
          aspectRatio={1}
        >
          <CropperDescription />
          <CropperImage />
          <CropperCropArea />
        </Cropper>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleCropComplete} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Apply Crop"}
        </Button>
      </div>

      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-xs text-center"
      >
        Square image cropper (1080x1080) •{" "}
        <a
          href="https://github.com/origin-space/image-cropper"
          className="hover:text-foreground underline"
          target="_blank"
        >
          API
        </a>
      </p>
    </div>
  )
} 