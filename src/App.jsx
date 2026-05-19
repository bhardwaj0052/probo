import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Component/Home'
import Rewards from './Component/Rewards'
import Wallet from './Component/Wallet'
import MarketDetail from './Component/MarketDetail'
import Auth from './Component/Auth'

function App() {
  return (
    <>
    <Routes>
      <Route path ="/" element={<Home />}/>
      <Route path="/rewards" element={<Rewards />}/>
      <Route path="/wallet" element={<Wallet />}/>
      <Route path="/market-detail" element={<MarketDetail />}/>
      <Route path="/auth" element={<Auth />}/>
    </Routes>
    </>
  )
}

export default App
