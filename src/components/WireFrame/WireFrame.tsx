import s from './WireFrame.module.scss'
import { Outlet } from 'react-router-dom'
import { Sider } from '../Sider/Sider.tsx'

export const WireFrame = () => {

  return <div className={s.wrapper}>
    <div className={s.sider}>
      <Sider />
    </div>
    <div className={s.content}>
      <Outlet />
    </div>
  </div>
}
