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
import SalesOrder from './pages/SalesOrder.jsx'
import FormualSetup from './pages/formulaSetup.jsx'
import React from 'react';

function App() {
  const [source, setSource] = React.useState("")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/ps" element={<PathSelector source={source} setSource={setSource} />}/>
        <Route path="/home" element={<Home source={source} setSource={setSource} />}/>
        <Route path="/master" element={<Master/>}/>
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/newitem" element={<NewItem/>}/>
        <Route path="/so" element={<SalesOrder/>}/>
        <Route path="/fs" element={<FormualSetup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
