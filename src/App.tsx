import UnitConvertorInterface from "./components/unitConvertorInteface"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

function App() {
  return <BrowserRouter>
      <Routes>
          <Route path="/" element={<UnitConvertorInterface />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
  </BrowserRouter>
}

export default App