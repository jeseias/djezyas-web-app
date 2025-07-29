import { useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"

interface ImageUploadSectionProps {
  form: UseFormReturn<any>
  showCropper: boolean
  setShowCropper: (show: boolean) => void
  croppedImage: string | null
  setCroppedImage: (image: string | null) => void
  files: any[]
  isDragging: boolean
  errors: string[]
  handleDragEnter: (e: React.DragEvent<HTMLElement>) => void
  handleDragLeave: (e: React.DragEvent<HTMLElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void
  handleDrop: (e: React.DragEvent<HTMLElement>) => void
  openFileDialog: () => void
  removeFile: (id: string) => void
  getInputProps: () => any
  maxSizeMB: number
}

export const ImageUploadSection = ({ 
  form, 
  showCropper, 
  setShowCropper, 
  croppedImage, 
  setCroppedImage,
  files,
  isDragging,
  errors,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  openFileDialog,
  removeFile,
  getInputProps,
  maxSizeMB
}: ImageUploadSectionProps) => {
  const previewUrl = croppedImage || files[0]?.preview || null

  // Handle image selection - show cropper
  useEffect(() => {
    if (previewUrl && !showCropper) {
      setShowCropper(true)
    }
  }, [previewUrl, showCropper, setShowCropper])

  const handleRemoveImage = () => {
    setCroppedImage(null)
    form.setValue("imageUrl", undefined)
    removeFile(files[0]?.id || "")
  }

  return (
    <div className="space-y-4">
      <FormLabel>Product Image (Square - 1080x1080)</FormLabel>
      <div className="relative">
        {/* Drop area */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex h-80 w-80 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload square image file"
          />
          {previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={previewUrl}
                alt={files[0]?.file?.name || "Uploaded image"}
                className="mx-auto h-full w-full rounded object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">Drop your square image here</p>
              <p className="text-muted-foreground text-xs">
                SVG, PNG, JPG or GIF (max. {maxSizeMB}MB) - Square format recommended
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={openFileDialog}
              >
                <UploadIcon
                  className="-ms-1 size-4 opacity-60"
                  aria-hidden="true"
                />
                Select image
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-background/80 hover:bg-background/90 text-muted-foreground hover:text-foreground rounded-full p-1.5 transition-colors"
            >
              <XIcon className="size-4" />
            </button>
          </div>
        )}

        {/* Error display */}
        {errors.length > 0 && (
          <div className="mt-2 space-y-1">
            {errors.map((error, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircleIcon className="size-4" />
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 