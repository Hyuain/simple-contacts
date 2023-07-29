import { Outlet } from 'react-router-dom'
import { ContactList } from './components/ContactList/ContactList.tsx'

export const Contact = () => {
  return <div>
    This is Contact!
    <ContactList />
    <Outlet />
  </div>
}
