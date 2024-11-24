import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { Web3Provider } from './contexts/Web3Context'
import Layout from './components/Layout'
import Home from './pages/Home'
import VerifyMedicine from './pages/VerifyMedicine'
import AddMedicine from './pages/AddMedicine'
import SupplyChain from './pages/SupplyChain'
import Login from './pages/Login'

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Web3Provider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/verify" element={<VerifyMedicine />} />
              <Route path="/add" element={<AddMedicine />} />
              <Route path="/supply-chain" element={<SupplyChain />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </Router>
      </Web3Provider>
    </ThemeProvider>
  )
}

