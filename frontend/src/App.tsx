import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientsList from "./pages/ClientsList";
import ClientDetails from "./pages/ClientDetails";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientsList />} />
        <Route path="/clients/:id" element={<ClientDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
