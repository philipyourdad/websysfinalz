import React from 'react'
import { ThemeProvider, createTheme,} from '@mui/material'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { blue, red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: red
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  
    
)
