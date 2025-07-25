import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import z from "zod"
import { passwordSchema } from "@/core/modules/shared/value-objects/password"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { MrPasswordInput } from "@/components/mr-password-input"
import { useSignup } from "@/core/modules/user/infra/hooks/use-signup"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { Link } from "@tanstack/react-router"

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: passwordSchema,
})

type FormValues = z.infer<typeof formSchema>

export const SignupForm = () => {
  const navigate = useNavigate()
  const signupMutation = useSignup()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      phone: "",
      password: "",
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      await signupMutation.mutateAsync({
        email: values.email,
        name: values.name,
        username: values.username,
        phone: values.phone,
        password: values.password,
      })
      
      toast.success("Account created successfully! Please check your email to verify your account.")
      navigate({ 
        to: "/verify-email",
        search: { email: values.email }
      })
    } catch (error: any) {
      console.error("Signup failed:", error)
      
      // Handle specific error messages
      const errorMessage = error?.response?.errors?.[0]?.message || 
                          error?.message || 
                          "Failed to create account. Please try again."
      
      toast.error(errorMessage)
    }
  }

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6")} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to create your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jeseias Domingos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="djezyas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="domingosjeseias@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+244936516269" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <MrPasswordInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={signupMutation.isPending || !form.formState.isValid}
          >
            {signupMutation.isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4" search={{ message: 'Please login' }}>
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  )
} 