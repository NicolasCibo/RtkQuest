import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import AppRouter from './router'
import './index.css'
import { QuestProvider } from './context/QuestContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QuestProvider>
      <AppRouter />
    </QuestProvider>
  </React.StrictMode>,
)
