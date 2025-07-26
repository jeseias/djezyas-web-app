import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import { useApiSaveProduct, useApiListProductCategories, useApiListProductTypes } from "@/core/modules/products/infra/hooks"
import { Product } from "@/core/modules/products/domain/entities"
import { ImageCropper } from "./image-cropper"
import { useOrganization } from "@/core/modules/organization/context/organization-context"
import { toast } from "sonner"

// Currency list
const currencyList = [
  { code: "AOA", name: "Angolan Kwanza" },
];

// Price types
const priceTypes = [
  { value: "ONE_TIME", label: "One Time" },
  { value: "RECURRING", label: "Recurring" },
  { value: "USAGE", label: "Usage Based" },
];

// Price statuses
const priceStatuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "DRAFT", label: "Draft" },
];

// Updated form schema to match server requirements
const productFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  productTypeId: z.string().min(1, "Product type is required"),
  status: z.nativeEnum(Product.Status).optional(),
  organizationId: z.string().min(1, "Organization ID is required"),
  imageUrl: z.instanceof(File).optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    length: z.number().positive().optional(),
    width: z.number().positive().optional(),
    height: z.number().positive().optional(),
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

export function CreateProductDialog({ product, open, onOpenChange }: CreateProductDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl || null)
  const [showCropper, setShowCropper] = useState(false)
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { organization } = useOrganization()
  const saveProductMutation = useApiSaveProduct()
  
  const { data: categoriesData, isLoading: categoriesLoading } = useApiListProductCategories({})
  
  const { data: productTypesData, isLoading: productTypesLoading } = useApiListProductTypes({})

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      id: product?.id,
      name: product?.name || "",
      description: product?.description || "",
      categoryId: product?.categoryId || "",
      organizationId: organization?.id || "",
      productTypeId: product?.productTypeId || "",
      status: product?.status || Product.Status.DRAFT,
      sku: product?.sku || "",
      barcode: product?.barcode || "",
      weight: product?.weight,
      dimensions: product?.dimensions,
      meta: product?.meta,
      price: {
        currency: "DZD",
        unitAmount: 0,
        type: undefined,
        status: undefined,
        validFrom: undefined,
        validUntil: undefined,
      },
    },
  })

  useEffect(() => {
    if (organization?.id) {
      form.setValue("organizationId", organization.id)
    }
  }, [organization?.id, form])

  useEffect(() => {
    if (isOpen && !product) {
      form.reset({
        name: "",
        description: "",
        categoryId: "",
        organizationId: organization?.id || "",
        productTypeId: "",
        status: Product.Status.DRAFT,
        sku: "",
        barcode: "",
        weight: undefined,
        dimensions: undefined,
        meta: undefined,
        price: {
          currency: "DZD",
          unitAmount: 0,
          type: undefined,
          status: undefined,
          validFrom: undefined,
          validUntil: undefined,
        },
      })
      setImagePreview(null)
      setOriginalImageFile(null)
    }
  }, [isOpen, product, organization?.id, form])

  if (!organization) {
    return null
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setOriginalImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedImage: File) => {
    form.setValue("imageUrl", croppedImage)
    setShowCropper(false)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(croppedImage)
  }

  const handleCropCancel = () => {
    setShowCropper(false)
    setOriginalImageFile(null)
    setImagePreview(product?.imageUrl || null)
    form.setValue("imageUrl", undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setOriginalImageFile(null)
    form.setValue("imageUrl", undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    if (!organization) {
      toast.error("Organization not found")
      return
    }

    try {
      const submitData = {
        ...data,
        dimensions: data.dimensions?.length && data.dimensions?.width && data.dimensions?.height 
          ? {
              length: data.dimensions.length,
              width: data.dimensions.width,
              height: data.dimensions.height,
            }
          : undefined,
        price: {
          ...data.price,
          validFrom: data.price.validFrom ? new Date(data.price.validFrom) : undefined,
          validUntil: data.price.validUntil ? new Date(data.price.validUntil) : undefined,
        }
      }
      
      await saveProductMutation.mutateAsync(submitData)
      setIsOpen(false)
      form.reset()
      setImagePreview(null)
      setOriginalImageFile(null)
      toast.success("Product created successfully!")
    } catch (error) {
      console.error("Failed to save product:", error)
      toast.error("Failed to create product. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Create New Product"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <FormLabel>Product Image</FormLabel>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={removeImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Card className="w-32 h-32 border-dashed border-2 flex items-center justify-center">
                    <CardContent className="p-0 flex flex-col items-center justify-center h-full">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground text-center">Upload Image</p>
                    </CardContent>
                  </Card>
                )}
                
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: Square image, 512x512px or larger
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Product.Status.DRAFT}>Draft</SelectItem>
                        <SelectItem value={Product.Status.ACTIVE}>Active</SelectItem>
                        <SelectItem value={Product.Status.INACTIVE}>Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Product description" 
                      className="resize-none"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesLoading ? (
                          <SelectItem value="" disabled>Loading categories...</SelectItem>
                        ) : categoriesData?.items?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="productTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productTypesLoading ? (
                          <SelectItem value="" disabled>Loading product types...</SelectItem>
                        ) : productTypesData?.items?.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* SKU and Barcode */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Stock Keeping Unit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode</FormLabel>
                    <FormControl>
                      <Input placeholder="Product barcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Weight and Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dimensions */}
            <div className="space-y-4">
              <FormLabel>Dimensions (cm)</FormLabel>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="dimensions.length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1" 
                          placeholder="0.0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dimensions.width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1" 
                          placeholder="0.0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dimensions.height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1" 
                          placeholder="0.0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-4">
              <FormLabel>Price</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {/* Currency (searchable select) */}
                <FormField
                  control={form.control}
                  name="price.currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency *</FormLabel>
                      <CurrencySearchSelect
                        value={field.value}
                        onChange={field.onChange}
                        currencyList={currencyList}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Unit Amount */}
                <FormField
                  control={form.control}
                  name="price.unitAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Amount *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Type */}
                <FormField
                  control={form.control}
                  name="price.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {priceTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Status */}
                <FormField
                  control={form.control}
                  name="price.status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {priceStatuses.map(status => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Valid From */}
                <FormField
                  control={form.control}
                  name="price.validFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid From</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value || ""}
                          onChange={e => field.onChange(e.target.value || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Valid Until */}
                <FormField
                  control={form.control}
                  name="price.validUntil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid Until</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value || ""}
                          onChange={e => field.onChange(e.target.value || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Debug Info */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                <div>Form Valid: {form.formState.isValid ? 'Yes' : 'No'}</div>
                <div>Organization ID: {form.watch('organizationId')}</div>
                <div>Category ID: {form.watch('categoryId')}</div>
                <div>Product Type ID: {form.watch('productTypeId')}</div>
                <div>Name: {form.watch('name')}</div>
                {Object.keys(form.formState.errors).length > 0 && (
                  <div>Errors: {JSON.stringify(form.formState.errors)}</div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={saveProductMutation.isPending || !form.formState.isValid}
              >
                {saveProductMutation.isPending ? "Saving..." : (product ? "Update Product" : "Create Product")}
              </Button>
            </div>
          </form>
        </Form>

        {/* Image Cropper Dialog */}
        {showCropper && originalImageFile && (
          <Dialog open={showCropper} onOpenChange={setShowCropper}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Crop Image</DialogTitle>
              </DialogHeader>
              <ImageCropper
                imageSrc={imagePreview!}
                onCropComplete={handleCropComplete}
                onCancel={handleCropCancel}
              />
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  )
} 

function CurrencySearchSelect({ value, onChange, currencyList }: { value: string; onChange: (v: string) => void; currencyList: { code: string; name: string }[] }) {
  const [search, setSearch] = useState("");
  const filtered = currencyList.filter(c => c.code.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase()));
  const selected = currencyList.find(c => c.code === value);
  
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select currency">
          {selected ? `${selected.code} - ${selected.name}` : "Select currency"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            placeholder="Search currency..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-2"
          />
        </div>
        <div className="max-h-48 overflow-y-auto">
          {filtered.length === 0 && <div className="p-2 text-muted-foreground">No results</div>}
          {filtered.map(c => (
            <SelectItem key={c.code} value={c.code}>
              {c.code} - {c.name}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
} 