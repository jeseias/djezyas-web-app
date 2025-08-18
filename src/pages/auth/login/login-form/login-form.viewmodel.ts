import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { passwordSchema } from "@/core/modules/shared/value-objects/password"
import { useLogin } from "@/core/modules/user/infra/hooks"
import { useRouter } from "@tanstack/react-router"
import { useApiLoadMyOrganizations } from "@/core/modules/organization/infra/hooks"

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
})

export type LoginFormValues = z.infer<typeof formSchema>

export const useLoginFormViewModel = () => {
  const router = useRouter()
  const { mutate: login, isPending } = useLogin()
  const { refetch: refetchOrganizations } = useApiLoadMyOrganizations()
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = (values: LoginFormValues) => {
    login({
      email: values.email,
      password: values.password,
    }, {
      onSuccess() {
        refetchOrganizations()
        router.navigate({ to: "/app" })
      }
    })
  }

  return {
    form,
    isPending,
    handleSubmit,
  }
}
