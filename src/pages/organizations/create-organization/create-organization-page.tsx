import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "@tanstack/react-router"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ChevronDown } from "lucide-react"
import { useApiCreateOrganization } from "@/core/modules/organization/infra/hooks"

const formSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
})

type FormValues = z.infer<typeof formSchema>

export const CreateOrganizationPage = () => {
  const navigate = useNavigate()
  const { mutate: createOrganization, isPending } = useApiCreateOrganization()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: FormValues) {
    createOrganization({
      name: values.name,
      settings: {},
      meta: {},
    }, {
      onSuccess: () => {
        navigate({ to: "/app" })
      },
      onError: (error) => {
        console.error("Failed to create organization:", error)
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <Form {...form}>
          <form className={cn("flex flex-col gap-6")} onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Create Organization</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Set up your organization to get started
              </p>
            </div>
            
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter organization name" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan</FormLabel>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                            >
                              {planOptions.find(option => option.value === field.value)?.label || "Select plan"}
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full min-w-[200px]">
                            {planOptions.map((option) => (
                              <DropdownMenuItem
                                key={option.value}
                                onClick={() => field.onChange(option.value)}
                                className="cursor-pointer"
                              >
                                {option.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}

              {/* <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/logo.png" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}

              <Button 
                type="submit" 
                className="w-full cursor-pointer" 
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Organization"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}