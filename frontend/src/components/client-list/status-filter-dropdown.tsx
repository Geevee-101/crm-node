import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface StatusFilterDropdownProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

function StatusFilterDropdown({ statusFilter, setStatusFilter }: StatusFilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Status: {statusFilter}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setStatusFilter("All")}>
          All
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
          Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter("Inactive")}>
          Inactive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusFilterDropdown;