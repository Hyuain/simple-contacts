export interface IContactListFilterProps {
  onFilter?: onFilterCallback
}

export type onFilterCallback = (params: IOnFilterCallbackParams) => void

export interface IOnFilterCallbackParams {
  name?: string
  gender?: CharacterGender
  status?: CharacterStatus
}

export const enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
  NULL = '',
}

export const enum CharacterGender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
  NULL = '',
}
