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

function EditStatusButton () {
  const handleStatusChange = (status: string) => {
    toast.success("Status updated successfully!");
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