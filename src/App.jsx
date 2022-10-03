import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route />
      </Routes>
    </HashRouter>
  );
};

export default App;
