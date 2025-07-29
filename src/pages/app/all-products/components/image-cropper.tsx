import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/cropper"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { ArrowLeftIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react"

interface ImageCropperProps {
  originalImageSrc: string
  currentCroppedImageSrc?: string | null
  onCropComplete: (croppedImage: File) => void
  onCancel: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Area = { x: number; y: number; width: number; height: number }

// Helper function to create a cropped image blob
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.setAttribute("crossOrigin", "anonymous") // Needed for canvas Tainted check
    image.src = url
  })

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  outputWidth: number = pixelCrop.width, // Optional: specify output size
  outputHeight: number = pixelCrop.height
): Promise<Blob | null> {
  try {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      return null
    }

    // Set canvas size to desired output size
    canvas.width = outputWidth
    canvas.height = outputHeight

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      outputWidth, // Draw onto the output size
      outputHeight
    )

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, "image/jpeg") // Specify format and quality if needed
    })
  } catch (error) {
    console.error("Error in getCroppedImg:", error)
    return null
  }
}

export function ImageCropper({ 
  originalImageSrc, 
  onCropComplete, 
  onCancel, 
  open, 
  onOpenChange 
}: ImageCropperProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [zoom, setZoom] = useState(1)

  // Callback for Cropper to provide crop data - Wrap with useCallback
  const handleCropChange = useCallback((pixels: Area | null) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleApply = async () => {
    // Check if we have the necessary data
    if (!originalImageSrc || !croppedAreaPixels) {
      console.error("Missing data for apply:", {
        originalImageSrc,
        croppedAreaPixels,
      })
      return
    }

    setIsProcessing(true)
    try {
      // Get the cropped image blob using the helper
      const croppedBlob = await getCroppedImg(originalImageSrc, croppedAreaPixels)

      if (!croppedBlob) {
        throw new Error("Failed to generate cropped image blob.")
      }

      // Create a File from the blob
      const croppedFile = new File([croppedBlob], "cropped-image.jpg", { 
        type: "image/jpeg" 
      })

      onCropComplete(croppedFile)
      onOpenChange(false)
    } catch (error) {
      console.error("Error during apply:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancel = () => {
    onCancel()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-140 *:[button]:hidden">
        <DialogDescription className="sr-only">
          Crop image dialog
        </DialogDescription>
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="flex items-center justify-between border-b p-4 text-base">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="-my-1 opacity-60"
                onClick={handleCancel}
                aria-label="Cancel"
              >
                <ArrowLeftIcon aria-hidden="true" />
              </Button>
              <span>Crop image</span>
            </div>
            <Button
              className="-my-1"
              onClick={handleApply}
              disabled={!originalImageSrc || isProcessing}
              autoFocus
            >
              {isProcessing ? "Applying..." : "Apply"}
            </Button>
          </DialogTitle>
        </DialogHeader>
        {originalImageSrc && (
          <Cropper
            className="h-96 sm:h-120"
            image={originalImageSrc}
            zoom={zoom}
            onCropChange={handleCropChange}
            onZoomChange={setZoom}
            aspectRatio={1}
          >
            <CropperDescription />
            <CropperImage />
            <CropperCropArea />
          </Cropper>
        )}
        <DialogFooter className="border-t px-4 py-6">
          <div className="mx-auto flex w-full max-w-80 items-center gap-4">
            <ZoomOutIcon
              className="shrink-0 opacity-60"
              size={16}
              aria-hidden="true"
            />
            <Slider
              defaultValue={[1]}
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              aria-label="Zoom slider"
            />
            <ZoomInIcon
              className="shrink-0 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 