import { Outlet } from 'react-router-dom'
import { ContactList } from './components/ContactList/ContactList.tsx'
import s from './Contact.module.scss'

export const Contact = () => {
  return (
    <div className={s.wrapper}>
      <ContactList className={s.listAndFilter} />
      <Outlet context={{ className: s.detail }} />
    </div>
  )
}
