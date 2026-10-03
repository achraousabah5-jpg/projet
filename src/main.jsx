import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import categorie from './categorie.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <categorie />
  </StrictMode>,
)
