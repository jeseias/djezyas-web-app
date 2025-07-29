import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageCropper } from "../image-cropper"

interface ImageCropperDialogProps {
  showCropper: boolean
  setShowCropper: (show: boolean) => void
  onCropComplete: (croppedFile: File) => void
  onCropCancel: () => void
  imageSrc?: string | null
}

export const ImageCropperDialog = ({ 
  showCropper, 
  setShowCropper, 
  onCropComplete, 
  onCropCancel,
  imageSrc 
}: ImageCropperDialogProps) => {
  if (!showCropper || !imageSrc) {
    return null
  }

  return (
    <Dialog open={showCropper} onOpenChange={setShowCropper}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <ImageCropper
          imageSrc={imageSrc}
          onCropComplete={onCropComplete}
          onCancel={onCropCancel}
        />
      </DialogContent>
    </Dialog>
  )
} 