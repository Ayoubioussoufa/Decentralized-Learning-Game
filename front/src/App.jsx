import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Start from "./pages/Start.jsx";
import Courses from "./pages/Courses.jsx";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/start" element={<Start />}/>
          <Route path="/courses" element={<Courses />}/>
        </Routes>
    </Router>
  );
}

export default App;
