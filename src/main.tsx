import './index.css'

// import Login from './Components/NavBar/Logins';
import Routess from './Components/NavBar/Routess.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  
    <Routess />
  
   
  </StrictMode>,
)
