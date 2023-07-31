import { HashRouter, Route, Routes } from 'react-router-dom'
import { WireFrame } from './components/WireFrame/WireFrame.tsx'
import { Contact } from './components/Contact/Contact.tsx'
import { ContactDetail } from './components/Contact/components/ContactDetail/ContactDetail.tsx'
import { Placeholder } from './components/Placeholder/Placeholder.tsx'
import { ConfigProvider, ThemeConfig } from 'antd'

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#fa8c16',
  },
}

export const App = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<WireFrame />}>
            <Route path="contact" element={<Contact />}>
              <Route path=":id" element={<ContactDetail />} />
              <Route path="" element={<Placeholder />} />
            </Route>
            <Route path="" element={<Placeholder />} />
          </Route>
        </Routes>
      </HashRouter>
    </ConfigProvider>
  )
}
