import { Outlet } from 'react-router-dom'
import { ContactList } from './components/ContactList/ContactList.tsx'
import s from './Contact.module.scss'

export const Contact = () => {
  return (
    <div className={s.wrapper}>
      <ContactList className={s.listAndFilter} />
      <div className={s.detail}>
        <Outlet />
      </div>
    </div>
  )
}
