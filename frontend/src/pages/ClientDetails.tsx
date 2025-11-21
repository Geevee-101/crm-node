import BackButton from "@/components/back-button";
import ClientDetailsTable from "@/components/client-details-table";
import { useParams } from "react-router-dom";

const clients = [
  {
    id: 1,
    name: "Test01",
    avatar: "",
    status: "Active",
    contact: "test01@nerv.com",
    organization: "Nerv",
    assignedTo: "User 1",
    createdAt: "02-01-2025",
  },
  {
    id: 2,
    name: "Test02",
    avatar: "",
    status: "Inactive",
    contact: "test02@nerv.com",
    organization: "Nerv",
    assignedTo: "User 2",
    createdAt: "01-02-2025",
  },
  {
    id: 3,
    name: "Test03",
    avatar: "",
    status: "Inactive",
    contact: "test03@nerv.com",
    organization: "Nerv",
    assignedTo: "User 3",
    createdAt: "01-03-2025",
  },
]

function ClientDetails () {
  const { id } = useParams();
  const client = clients.find(c => c.id === Number(id));

  return (
    <div className="flex flex-col p-8 gap-4">
      <div>
        <BackButton />
      </div>
      <h2 className="text-lg font-semibold mb-2">Client Details</h2>
      <ClientDetailsTable client={client} />
    </div>
  )
}

export default ClientDetails;