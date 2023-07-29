import s from './WireFrame.module.scss'
import { Menu } from 'antd'
import { Outlet } from 'react-router-dom'

export const WireFrame = () => {
  return <div className={s.wrapper}>
    This is WireFrame
    <div className={s.sider}>
      {/*<Menu />*/}
      This is Sider
    </div>
    <div className={s.content}>
      <Outlet />
    </div>
  </div>
}
