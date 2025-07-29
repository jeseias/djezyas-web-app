import { useState, useEffect, Fragment } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { 
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper"
import { useApiSaveProduct } from "@/core/modules/products/infra/hooks"
import { useOrganization } from "@/core/modules/organization/context/organization-context"
import { Product } from "@/core/modules/products/domain/entities"
import { toast } from "sonner"
import { useFileUpload } from "@/hooks/use-file-upload"
import { ImageCropperDialog, ImageUploadSection, ProductBasicInfo, ProductDetails, ProductPricing } from "."

const productFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  productTypeId: z.string().min(1, "Product type is required"),
  status: z.nativeEnum(Product.Status).optional(),
  organizationId: z.string().min(1, "Organization ID is required"),
  imageUrl: z.instanceof(File).optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional(),
  meta: z.record(z.any()).optional(),
  price: z.object({
    currency: z.string().min(1, "Currency is required"),
    unitAmount: z.number().positive("Unit amount must be positive"),
    type: z.string().optional(),
    status: z.string().optional(),
    validFrom: z.string().optional(),
    validUntil: z.string().optional(),
  }),
})

type ProductFormData = z.infer<typeof productFormSchema>

interface CreateProductDialogProps {
  product?: Product.Model 
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const steps = [
  { id: 1, title: "Basic Info", description: "Product name and type" },
  { id: 2, title: "Details", description: "SKU, barcode, dimensions" },
  { id: 3, title: "Image", description: "Upload product image" },
  { id: 4, title: "Pricing", description: "Set price and currency" },
]

export const CreateProductDialog = ({ product, open, onOpenChange }: CreateProductDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showCropper, setShowCropper] = useState(false)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const { organization } = useOrganization()
  const saveProductMutation = useApiSaveProduct()

  // File upload for image preview
  const maxSizeMB = 2
  const maxSize = maxSizeMB * 1024 * 1024
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
  })
  const previewUrl = files[0]?.preview || null

  const isOpen = open !== undefined ? open : false
  const setIsOpen = onOpenChange || (() => {})

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      status: Product.Status.DRAFT,
      productTypeId: "",
      sku: "",
      barcode: "",
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      imageUrl: undefined,
      price: {
        currency: "AOA",
        unitAmount: 0,
        type: undefined,
        status: undefined,
        validFrom: undefined,
        validUntil: undefined,
      },
      organizationId: organization?.id || "",
    },
  })

  const { errors: formErrors } = form.formState

  useEffect(() => {
    if (organization?.id) {
      form.setValue("organizationId", organization.id)
    }
  }, [organization?.id, form])

  const handleCropComplete = (croppedFile: File) => {
    setCroppedImage(URL.createObjectURL(croppedFile))
    form.setValue("imageUrl", croppedFile)
    setShowCropper(false)
  }

  const handleCropCancel = () => {
    setShowCropper(false)
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      const submitData = {
        ...data,
        price: {
          ...data.price,
          validFrom: data.price.validFrom ? new Date(data.price.validFrom) : undefined,
          validUntil: data.price.validUntil ? new Date(data.price.validUntil) : undefined,
        },
        dimensions: data.dimensions?.length && data.dimensions?.width && data.dimensions?.height ? data.dimensions : undefined,
      }

      await saveProductMutation.mutateAsync(submitData)
      toast.success("Product created successfully")
      setIsOpen(false)
      form.reset()
    } catch {
      toast.error("Failed to create product")
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ProductBasicInfo form={form} />
      case 2:
        return <ProductDetails form={form} />
      case 3:
        return (
          <ImageUploadSection
            form={form}
            showCropper={showCropper}
            setShowCropper={setShowCropper}
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            files={files}
            isDragging={isDragging}
            errors={errors}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            openFileDialog={openFileDialog}
            removeFile={removeFile}
            getInputProps={getInputProps}
            maxSizeMB={maxSizeMB}
          />
        )
      case 4:
        return <ProductPricing form={form} />
      default:
        return null
    }
  }

  return (
    <Fragment>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{product ? "Edit Product" : "Create New Product"}</DialogTitle>
          </DialogHeader>
          
          {/* Stepper */}
          <div className="mb-6">
            <Stepper value={currentStep} onValueChange={setCurrentStep}>
              {steps.map((step) => (
                <StepperItem key={step.id} step={step.id} className="not-last:flex-1">
                  <StepperTrigger asChild>
                    <StepperIndicator />
                  </StepperTrigger>
                  {step.id < steps.length && <StepperSeparator />}
                </StepperItem>
              ))}
            </Stepper>
            
            {/* Step Title */}
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">{steps[currentStep - 1]?.title}</h3>
              <p className="text-muted-foreground text-sm">{steps[currentStep - 1]?.description}</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={saveProductMutation.isPending}
                    >
                      {saveProductMutation.isPending ? "Creating..." : "Create Product"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Image Cropper Dialog - rendered outside main dialog to avoid nesting */}
      <ImageCropperDialog
        showCropper={showCropper}
        setShowCropper={setShowCropper}
        onCropComplete={handleCropComplete}
        onCropCancel={handleCropCancel}
        imageSrc={previewUrl}
      />
         </Fragment>
   )
} 