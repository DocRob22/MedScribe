import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MedScribe from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MedScribe />
  </StrictMode>
)
