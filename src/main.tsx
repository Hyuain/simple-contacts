import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.scss'
import { WireFrame } from './components/WireFrame/WireFrame.tsx'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Contact } from './components/Contact/Contact.tsx'
import { ContactDetail } from './components/Contact/components/ContactDetail/ContactDetail.tsx'
import { Placeholder } from './components/Placeholder/Placeholder.tsx'
import { ConfigProvider } from 'antd'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fa8c16'
        }
      }}
    >
      <HashRouter>
        <Routes>
          <Route path='/' element={<WireFrame />}>
            <Route path='contact' element={<Contact />}>
              <Route path=':id' element={<ContactDetail />} />
              <Route path='' element={<Placeholder />} />
            </Route>
            <Route path='' element={<Placeholder />} />
          </Route>
        </Routes>
      </HashRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
