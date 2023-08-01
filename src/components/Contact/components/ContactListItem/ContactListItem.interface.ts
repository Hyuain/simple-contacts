import { Character } from 'rickmortyapi'

export interface IContactListItemProps {
  className?: string
  character: Character
  selected?: boolean
  onSelect?: (character: Character) => void
}
