import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import PathSelector from './pages/PathSelector.jsx'
import Master from './pages/Master.jsx'
import Customer from './pages/Customer.jsx'
import NewItem from './pages/NewItem.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/ps" element={<PathSelector/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/master" element={<Master/>}/>
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/newitem" element={<NewItem/>}/>
      </Routes>
    </Router>
  );
}

export default App;
