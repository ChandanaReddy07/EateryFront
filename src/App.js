import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import Menu from './component/Menu';
import Bill from './component/Order';


function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />  
        <Route path="/bill" element={<Bill />} />
      
      </Routes>
    </>
  );
}

export default App;
