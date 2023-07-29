import { ReactComponent as Emoji } from '@/assets/icons/emoji.svg'
import s from './Placeholder.module.scss'

export const Placeholder = () => {
  return <div className={s.wrapper}>
   <Emoji className={s.icon} />
  </div>
}
