import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import type { User } from "@/lib/api/users"
import { usersApi } from "@/lib/api/users"
import { AxiosError } from "axios"
import { clientsApi } from "@/lib/api/clients"


const formSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  avatar: z
    .string(),
  status: z
    .string()
    .min(1, "Status is required.")
    .refine((value) => value === "Active" || value === "Inactive", {
      message: "Status must be either Active or Inactive",
    }),
  email: z
    .email({ message: "Please enter a valid email address." }),
  organization: z
    .string()
    .min(2, "Organization must be at least 2 characters.")
    .max(64, "Organization must be at most 64 characters."),
  assignedToId: z
    .string()
    .min(1, "Please assign a user.")
})

export function AddClientButton({ setClients }: { setClients: (clients: any[]) => void }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const getAllUsers = async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error('Failed to fetch users');
      }
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      avatar: "",
      status: "",
      email: "",
      organization: "",
      assignedToId: "",
    },
  });

  const createClient = async (data: z.infer<typeof formSchema>) => {
    const payload = {
      ...data,
      assignedToId: parseInt(data.assignedToId, 10),
    };
    setIsSubmitting(true);
    try {
      await clientsApi.create(payload);
      // Refresh the client list after adding a new client
      const newClients = await clientsApi.getAll();
      setClients(newClients);
    } catch (error) {
      console.error("Failed to create client:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error('Failed to add client');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    createClient(data);
    toast.success("Client added successfully!");
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Client</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new client.
          </DialogDescription>
        </DialogHeader>
        <form id="add-client-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-client-form-input-name" className="sr-only">
                    Name
                  </FieldLabel>
                  <Input
                    id="add-client-form-input-name"
                    placeholder="Enter client name"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="avatar"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-client-form-input-avatar" className="sr-only">
                    Avatar
                  </FieldLabel>
                  <Input
                    id="add-client-form-input-avatar"
                    placeholder="Enter client avatar"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-client-form-select-status" className="sr-only">
                    Status
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    >
                    <SelectTrigger
                      id="add-client-form-select-status"
                      aria-invalid={fieldState.invalid}
                      >
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-client-form-input-email" className="sr-only">
                    Email
                  </FieldLabel>
                  <Input
                    id="add-client-form-input-email"
                    type="email"
                    placeholder="Enter client email"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="organization"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-client-form-input-organization" className="sr-only">
                    Organization
                  </FieldLabel>
                  <Input
                    id="add-client-form-input-organization"
                    placeholder="Enter client organization"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="assignedToId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-client-form-select-assignedToId" className="sr-only">
                    Assigned To
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    >
                    <SelectTrigger
                      id="add-client-form-select-assignedToId"
                      aria-invalid={fieldState.invalid}
                      >
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter className="sm:justify-start">
          <Button form="add-client-form" type="submit" className="hover:cursor-pointer" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          <Button variant="outline" onClick={() => setIsOpen(false)} className="hover:cursor-pointer">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddClientButton;