import { Menu, MenuProps } from 'antd'
import { MENU_CONFIG } from './Sider.config.ts'
import s from './Sider.module.scss'
import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'

const MENU_ITEMS: MenuProps['items'] = MENU_CONFIG.map((item) => {
  return {
    key: item.path,
    label: item.name,
  }
})

export const Sider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = useResolvedPath(location.pathname)
  const rootPath = pathname.match(/\/\w+/g)?.[0] || ''

  function handleMenuItemClicked(e: any) {
    const path = e.key
    navigate(path)
  }

  return (
    <div className={s.wrapper}>
      <Menu
        selectedKeys={[rootPath]}
        onClick={handleMenuItemClicked}
        className={s.menu}
        items={MENU_ITEMS}
      />
    </div>
  )
}
