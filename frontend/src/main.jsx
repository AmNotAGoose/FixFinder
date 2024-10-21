import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home.jsx'
import './index.css'
import Login from './Login.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import Diagnose from './Diagnose.jsx';
import Dashboard from './Dashboard.jsx';
import SelfRepair from './SelfRepair.jsx';
import Marketplace from './Marketplace.jsx';

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/selfrepair" element={<SelfRepair />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>,
)
