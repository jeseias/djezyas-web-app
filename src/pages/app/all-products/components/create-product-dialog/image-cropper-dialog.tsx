import { ImageCropper } from "@/pages/app/all-products/components/image-cropper"

interface ImageCropperDialogProps {
  showCropper: boolean
  setShowCropper: (show: boolean) => void
  onCropComplete: (croppedImage: File) => void
  onCropCancel: () => void
  originalImageSrc: string | null
  currentCroppedImageSrc?: string | null
}

export const ImageCropperDialog = ({
  showCropper,
  setShowCropper,
  onCropComplete,
  onCropCancel,
  originalImageSrc,
  currentCroppedImageSrc,
}: ImageCropperDialogProps) => {
  if (!originalImageSrc) return null

  return (
    <ImageCropper
      originalImageSrc={originalImageSrc}
      currentCroppedImageSrc={currentCroppedImageSrc}
      onCropComplete={onCropComplete}
      onCancel={onCropCancel}
      open={showCropper}
      onOpenChange={setShowCropper}
    />
  )
} 