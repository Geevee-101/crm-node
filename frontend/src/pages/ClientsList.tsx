import ClientListTable from "@/components/ClientsListTable";

function ClientList () {
  return (
    <div className="flex flex-col p-8 gap-4">
      <h1 className="font-bold text-2xl">CRM Node</h1>
      <ClientListTable />
    </div>
  )
}

export default ClientList;