import BackButton from "@/components/BackButton";
import ClientDetailsTable from "@/components/ClientDetailsTable";

function ClientDetails () {
  return (
    <div className="flex flex-col p-8 gap-4">
      <div>
        <BackButton />
      </div>
      <ClientDetailsTable />
    </div>
  )
}

export default ClientDetails;