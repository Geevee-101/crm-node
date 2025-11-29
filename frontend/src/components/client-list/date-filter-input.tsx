import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DateFilterInputProps {
  dateFilter: string;
  setDateFilter: (date: string) => void;
}

function DateFilterInput({ dateFilter, setDateFilter }: DateFilterInputProps) {
    return (
        <div className="flex gap-1 items-center">
          <Input 
            type="date" 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-auto"
          />
          {dateFilter && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setDateFilter('')}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
    )
}

export default DateFilterInput;