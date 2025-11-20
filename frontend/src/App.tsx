import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientsList from "./pages/ClientsList";
import ClientDetails from "./pages/ClientDetails";
import { Toaster } from "@/components/ui/sonner";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientsList />} />
        <Route path="/clients/:id" element={<ClientDetails />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
