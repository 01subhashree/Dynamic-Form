import { Route, Routes } from "react-router-dom";
import "./App.css";
import FormPage from "./pages/homepage/FormPage";
import CreateForm from "./pages/createForm/CreateForm";
import FormDetail from "./pages/formDetails/FormDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/form" element={<CreateForm />} />
      <Route path="/form/:formId" element={<FormDetail />} />
    </Routes>
  );
}

export default App;
