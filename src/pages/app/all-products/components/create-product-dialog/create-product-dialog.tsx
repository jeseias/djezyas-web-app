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
  name: z.string().optional(),
  description: z.string().optional(),
  productTypeId: z.string().optional(),
  status: z.nativeEnum(Product.Status).optional(),
  organizationId: z.string().optional(),
  imageUrl: z.instanceof(File).optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  weight: z.number().optional(),
  dimensions: z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
  }).optional(),
  meta: z.record(z.any()).optional(),
  price: z.object({
    currency: z.string().optional(),
    unitAmount: z.number().positive().optional(),
    type: z.string().optional(),
    status: z.string().optional(),
    validFrom: z.string().optional(),
    validUntil: z.string().optional(),
  }).optional(),
})

type ProductFormData = z.infer<typeof productFormSchema>

interface CreateProductDialogProps {
  product?: Product.Model 
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface Step {
  id: number
  title: string
  description: string
}

const STEPS: Step[] = [
  { id: 1, title: "Basic Info", description: "Product name and type" },
  { id: 2, title: "Details", description: "SKU, barcode, dimensions" },
  { id: 3, title: "Image", description: "Upload product image" },
  { id: 4, title: "Pricing", description: "Set price and currency" },
]

const MAX_FILE_SIZE_MB = 6
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

export const CreateProductDialog = ({ product, open, onOpenChange }: CreateProductDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showCropper, setShowCropper] = useState(false)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const { organization } = useOrganization()
  const saveProductMutation = useApiSaveProduct()

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
    maxSize: MAX_FILE_SIZE,
  })

  const isOpen = open ?? false
  const setIsOpen = onOpenChange ?? (() => {})

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

  const resetForm = () => {
    form.reset()
    setCurrentStep(1)
    setShowCropper(false)
    setCroppedImage(null)
    if (files.length > 0) {
      removeFile(files[0].id)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      const submitData = {
        ...data,
        price: data.price && data.price.currency && data.price.unitAmount ? {
          ...data.price,
          validFrom: data.price.validFrom ? new Date(data.price.validFrom) : undefined,
          validUntil: data.price.validUntil ? new Date(data.price.validUntil) : undefined,
        } : undefined,
        dimensions: data.dimensions?.length && data.dimensions?.width && data.dimensions?.height ? data.dimensions : undefined,
      }

      await saveProductMutation.mutateAsync(submitData)
      toast.success("Product created successfully")
      resetForm()
      setIsOpen(false)
    } catch {
      toast.error("Failed to create product")
    }
  }

  const handleNextStep = () => {
    if (currentStep < STEPS.length) {
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
            files={files as any[]}
            isDragging={isDragging}
            errors={errors}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            openFileDialog={openFileDialog}
            removeFile={removeFile}
            getInputProps={getInputProps}
            maxSizeMB={MAX_FILE_SIZE_MB}
          />
        )
      case 4:
        return <ProductPricing form={form} />
      default:
        return null
    }
  }

  const currentStepData = STEPS[currentStep - 1]

  return (
    <Fragment>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{product ? "Edit Product" : "Create New Product"}</DialogTitle>
          </DialogHeader>
          
          <div className="mb-6">
            <Stepper value={currentStep} onValueChange={setCurrentStep}>
              {STEPS.map((step) => (
                <StepperItem key={step.id} step={step.id} className="not-last:flex-1">
                  <StepperTrigger asChild>
                    <StepperIndicator />
                  </StepperTrigger>
                  {step.id < STEPS.length && <StepperSeparator />}
                </StepperItem>
              ))}
            </Stepper>
            
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">{currentStepData?.title}</h3>
              <p className="text-muted-foreground text-sm">{currentStepData?.description}</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}
              
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
                  {currentStep < STEPS.length ? (
                    <Button type="button" onClick={handleNextStep}>
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
      
      <ImageCropperDialog
        showCropper={showCropper}
        setShowCropper={setShowCropper}
        onCropComplete={handleCropComplete}
        onCropCancel={handleCropCancel}
        originalImageSrc={files[0]?.preview || null}
        currentCroppedImageSrc={croppedImage}
      />
    </Fragment>
  )
} 