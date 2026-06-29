import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Form from "./Form";
import LeadsList from "./LeadsList";
// import Form from "./Form";
// import LeadsList from "./LeadsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<Form />} />
        <Route
          path="/admin-secure-data-panel-2026-develop"
          element={<LeadsList />}
        />
      </Routes>
    </Router>
  );
}

export default App;
