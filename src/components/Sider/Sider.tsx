import { Menu, MenuProps } from 'antd'
import { MENU_CONFIG } from './Sider.config.ts'
import s from './Sider.module.scss'
import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { ISiderProps } from '@/components/Sider/Sider.interface.ts'
import classNames from 'classnames'

const MENU_ITEMS: MenuProps['items'] = MENU_CONFIG.map((item) => {
  return {
    key: item.path,
    label: item.name,
  }
})

export const Sider = (props: ISiderProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = useResolvedPath(location.pathname)
  const rootPath = pathname.match(/\/\w+/g)?.[0] || ''

  function handleMenuItemClicked(e: any) {
    const path = e.key
    navigate(path)
  }

  return (
    <div className={classNames(props.className, s.menuWrapper)}>
      <div className={s.siderHeader}>Rick and Morty</div>
      <Menu
        theme="dark"
        selectedKeys={[rootPath]}
        onClick={handleMenuItemClicked}
        className={s.menu}
        items={MENU_ITEMS}
      />
    </div>
  )
}
