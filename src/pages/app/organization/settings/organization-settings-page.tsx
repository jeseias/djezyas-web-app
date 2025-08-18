import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, MapPin, Edit3, Save, X, Globe, Mail, Camera, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useFileUpload } from "@/hooks/use-file-upload";
import { ImageCropperDialog } from "@/pages/app/all-products/components/create-product-dialog/image-cropper-dialog";
import { Badge } from "@/components/ui/badge";

const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  description: z.string().min(1, "Description is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  // Location fields
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().optional(),
  latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

interface OrganizationData {
  name: string;
  description: string;
  imageUrl: string;
  website?: string;
  email?: string;
  phone?: string;
}

const MAX_FILE_SIZE_MB = 6;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_RESOLUTION = 1080;

export function OrganizationSettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - replace with actual data from your API
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    name: "Acme Corporation",
    description: "A leading technology company specializing in innovative solutions.",
    imageUrl: "",
    website: "https://acme.com",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
  });

  const [{ files }, { addFiles, removeFile }] = useFileUpload({
    maxFiles: 1,
    maxSize: 6 * 1024 * 1024, // 6MB
    accept: "image/png,image/jpeg,image/jpg",
  });

  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organizationData.name,
      description: organizationData.description,
      website: organizationData.website || "",
      email: organizationData.email || "",
      phone: organizationData.phone || "",
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      latitude: 0,
      longitude: 0,
    },
  });

  // Update form when organization data changes
  useEffect(() => {
    form.reset({
      name: organizationData.name,
      description: organizationData.description,
      website: organizationData.website || "",
      email: organizationData.email || "",
      phone: organizationData.phone || "",
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      latitude: 0,
      longitude: 0,
    });
  }, [organizationData, form]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if image is square
    const img = new Image();
    img.onload = () => {
      if (img.width !== img.height) {
        toast.error("Please select a square image (width must equal height)");
        return;
      }
      
      // Add file and show cropper
      addFiles([file]);
      setShowCropper(true);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleCropComplete = (croppedFile: File) => {
    setCroppedImage(URL.createObjectURL(croppedFile));
    setShowCropper(false);
    toast.success("Image cropped successfully!");
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    if (files.length > 0) {
      removeFile(files[0].id);
    }
  };

  const onSubmit = async (data: OrganizationFormData) => {
    setIsLoading(true);
    try {
      // Handle image upload if there's a cropped image
      let imageUrl = organizationData.imageUrl;
      if (croppedImage) {
        // Convert base64 to file and upload
        const response = await fetch(croppedImage);
        const blob = await response.blob();
        const file = new File([blob], "organization-logo.png", { type: "image/png" });
        
        // TODO: Implement actual file upload
        // imageUrl = await uploadFile(file);
      }

      // Prepare location data
      const location = {
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
        latitude: data.latitude,
        longitude: data.longitude,
      };

      // TODO: Implement API call to update organization
      console.log("Updating organization:", {
        ...data,
        imageUrl,
        location,
      });

      toast.success("Organization updated successfully!");
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Failed to update organization");
    } finally {
      setIsLoading(false);
    }
  };

  const currentImageUrl = croppedImage || organizationData.imageUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Organization Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your organization's profile and details
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setCroppedImage(null);
                    if (files.length > 0) {
                      removeFile(files[0].id);
                    }
                  }}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={form.handleSubmit(onSubmit)} 
                  size="sm"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
            )}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Organization Profile Card */}
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Organization Profile</CardTitle>
                    <CardDescription>
                      Update your organization's basic information and branding
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Logo Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Label className="text-sm font-medium">Organization Logo</Label>
                    {isEditing && (
                      <Badge variant="secondary" className="text-xs">
                        Click to upload
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="relative group">
                      <Avatar className="h-24 w-24 border-4 border-border/50 shadow-lg">
                        <AvatarImage src={currentImageUrl} alt={form.watch("name")} />
                        <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary/20 to-primary/10">
                          {form.watch("name")?.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Upload a square logo to represent your organization
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Requirements:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Square aspect ratio (1:1)</li>
                          <li>• Maximum resolution: 1080x1080px</li>
                          <li>• File size: Up to 6MB</li>
                          <li>• Formats: PNG, JPG, JPEG</li>
                        </ul>
                      </div>
                      {isEditing && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="logo-upload"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Organization Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="Enter organization name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-sm font-medium">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50 min-h-[100px]"
                            placeholder="Describe your organization"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
                    <CardDescription>
                      Update your organization's contact details
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Website
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="https://example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="contact@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="+1 (555) 123-4567"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location Information Card */}
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <MapPin className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Location Information</CardTitle>
                    <CardDescription>
                      Set your organization's physical location
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="Enter full address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">City</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="Enter city"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">State/Province</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="Enter state or province"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Country</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="Enter country"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="Enter postal code"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Latitude</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="any"
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="Enter latitude"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Longitude</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="any"
                            disabled={!isEditing}
                            className="transition-all duration-200 bg-background/50 border-border/50 focus:border-primary/50"
                            placeholder="Enter longitude"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>

        {/* Image Cropper Dialog */}
        <ImageCropperDialog
          showCropper={showCropper}
          setShowCropper={setShowCropper}
          onCropComplete={handleCropComplete}
          onCropCancel={handleCropCancel}
          originalImageSrc={files[0]?.preview || null}
          currentCroppedImageSrc={croppedImage}
        />
      </div>
    </div>
  );
}
