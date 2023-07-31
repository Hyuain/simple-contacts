import s from './WireFrame.module.scss'
import { Outlet } from 'react-router-dom'
import { Sider } from '../Sider/Sider.tsx'

export const WireFrame = () => {
  return (
    <div className={s.wrapper}>
      <Sider className={s.sider} />
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  )
}
