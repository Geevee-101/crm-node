import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { clientsApi } from "@/lib/api/clients";
import { useContext } from "react";
import { ClientContext } from "@/pages/ClientDetails";

function EditStatusButton ({ clientId }: { clientId: number }) {
  const { getClientDetails } = useContext(ClientContext);

  const handleStatusChange = async (status: string) => {
    try {
      await clientsApi.updateStatus(clientId, status);
      // Update the client state with the new status
      getClientDetails();
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm">
          <Pencil />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => handleStatusChange("Active")}>Active</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleStatusChange("Inactive")}>Inactive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default EditStatusButton;