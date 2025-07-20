import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useApiInviteMember } from "@/core/modules/organization/infra/hooks"
import { Organization } from "@/core/modules/organization/domain/entities/organization"
import { UserPlus, Loader2 } from "lucide-react"
import { useOrganization } from "@/core/modules/organization/context/organization-context"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.nativeEnum(Organization.InvitationRole, {
    required_error: "Please select a role",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface InviteMemberDialogProps {
  trigger?: React.ReactNode
}

export function InviteMemberDialog({ trigger }: InviteMemberDialogProps) {
  const { organization } = useOrganization()
  const [open, setOpen] = useState(false)
  const { mutate: inviteMember, isPending } = useApiInviteMember()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: Organization.InvitationRole.MEMBER,
    },
  })

  function onSubmit(values: FormValues) {
    inviteMember(
      {
        organizationId: organization?.id!,
        email: values.email,
        role: values.role,
      },
      {
        onSuccess: () => {
          form.reset()
          setOpen(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Invite Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your organization. They will receive an email with a link to accept the invitation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter email address" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Organization.InvitationRole.MEMBER}>
                          Member
                        </SelectItem>
                        <SelectItem value={Organization.InvitationRole.ADMIN}>
                          Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inviting...
                  </>
                ) : (
                  "Send Invitation"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 