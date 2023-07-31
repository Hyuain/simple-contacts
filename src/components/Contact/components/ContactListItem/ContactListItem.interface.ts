import { Character } from 'rickmortyapi'

export interface IContactListItemProps {
  className?: string
  character: Character
  onSelect?: (character: Character) => void
}
