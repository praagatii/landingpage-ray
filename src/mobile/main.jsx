import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.jsx'

const loader = document.getElementById('loader')
const fontsLoaded = document.fonts.ready

Promise.all([
  fontsLoaded,
  new Promise(resolve => window.addEventListener('load', resolve))
]).then(() => {
  if (loader) setTimeout(() => loader.classList.add('loaded'), 200)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
