import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

function BackButton () {
  return (
    <Button asChild>
      <Link to={`/`}>
        <ArrowLeft />
        Back
      </Link>
    </Button>
  )
}

export default BackButton