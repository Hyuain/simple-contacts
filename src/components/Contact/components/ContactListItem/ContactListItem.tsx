import s from './ContactListItem.module.scss'
import { IContactListItemProps } from './ContactListItem.interface.ts'

export const ContactListItem = ({
  character,
  onSelect,
}: IContactListItemProps) => {
  function handleListItemClicked() {
    onSelect?.(character)
  }

  return (
    <div onClick={handleListItemClicked} className={s.wrapper}>
      <div className={s.left}>
        <img className={s.image} src={character.image} alt={character.name} />
      </div>
      <div className={s.right}>
        <div className={s.name}>{character.name}</div>
        <div className={s.species}>{character.species}</div>
      </div>
    </div>
  )
}
