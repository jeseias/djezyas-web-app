import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { useVerifyEmail, useResendVerification } from "@/core/modules/user/infra/hooks"
import { useSearch } from "@tanstack/react-router"
import { useState } from "react"

const formSchema = z.object({
  verificationCode: z.string().min(6, "Verification code must be at least 6 characters"),
})

type FormValues = z.infer<typeof formSchema>

export const VerifyEmailForm = () => {
  const { email } = useSearch({ from: '/verify-email' })
  const [isResending, setIsResending] = useState(false)
  
  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail()
  const { mutate: resendVerification } = useResendVerification()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationCode: "",
    },
  })

  function onSubmit(values: FormValues) {
    verifyEmail({
      email,
      verificationCode: values.verificationCode,
    })
  }

  const handleResendCode = async () => {
    setIsResending(true)
    resendVerification({ email })
    setTimeout(() => setIsResending(false), 60000)
  }

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6")} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-muted-foreground text-sm text-balance">
            We sent a verification code to <strong>{email}</strong>
          </p>
        </div>
        
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter 6-digit code" 
                      {...field} 
                      maxLength={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
          
          <div className="text-center text-sm">
            <p className="text-muted-foreground mb-2">
              Didn't receive the code?
            </p>
            <Button
              type="button"
              variant="link"
              onClick={handleResendCode}
              disabled={isResending}
              className="p-0 h-auto"
            >
              {isResending ? "Resending in 60s..." : "Resend verification code"}
            </Button>
          </div>
        </div>
        
        <div className="text-center text-sm">
          <a href="/login" className="underline underline-offset-4">
            Back to login
          </a>
        </div>
      </form>
    </Form>
  )
} 