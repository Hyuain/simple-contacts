export interface IContactDetailRecordProps {
  className?: string
  label: string
  value?: string
  size?: ContactDetailRecordSize
}

export enum ContactDetailRecordSize {
  FULL = 'full',
  HALF = 'half',
}
