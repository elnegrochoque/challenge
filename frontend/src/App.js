
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Archived from "./pages/Archived/Archived";
import { Principal } from "./pages/Principal";
// import your route components too

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal></Principal>}/>
        <Route path="/archived" element={<Archived></Archived>}/>
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
