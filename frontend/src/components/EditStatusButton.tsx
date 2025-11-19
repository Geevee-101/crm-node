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

function EditStatusButton () {
  function handleStatusChange(status: string) {
    console.log("Changing status to:", status);
  }
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