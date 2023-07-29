import { Input, Select } from 'antd'
import {
  CharacterGender,
  CharacterStatus,
  IContactListFilterProps,
} from './ContactListFilter.interface.ts'
import { useState } from 'react'
import s from './ContactListFilter.module.scss'

const STATUS_OPTIONS = [
  { label: 'alive', value: CharacterStatus.ALIVE },
  { label: 'dead', value: CharacterStatus.DEAD },
  { label: 'unknown', value: CharacterStatus.UNKNOWN },
]

const GENDER_OPTIONS = [
  { label: 'female', value: CharacterGender.FEMALE },
  { label: 'male', value: CharacterGender.MALE },
  { label: 'genderless', value: CharacterGender.GENDERLESS },
  { label: 'unknown', value: CharacterGender.UNKNOWN },
]

export const ContactListFilter = (props: IContactListFilterProps) => {
  const [name, setName] = useState('')
  const [status, setStatus] = useState(CharacterStatus.NULL)
  const [gender, setGender] = useState(CharacterGender.NULL)

  function handleInputChanged(e: any) {
    const nextName = e.target.value
    setName(nextName)
    triggerFilter({ name: e.target.value })
  }

  function handleStatusChanged(
    nextStatus: CharacterStatus = CharacterStatus.NULL,
  ) {
    setStatus(nextStatus)
    triggerFilter({ status: nextStatus })
  }

  function handleGenderChanged(
    nextGender: CharacterGender = CharacterGender.NULL,
  ) {
    setGender(nextGender)
    triggerFilter({ gender: nextGender })
  }

  function triggerFilter(params: {
    name?: string
    status?: CharacterStatus
    gender?: CharacterGender
  }) {
    props.onFilter?.({
      name,
      status,
      gender,
      ...params,
    })
  }

  return (
    <div>
      <Input placeholder="Search Characters" onChange={handleInputChanged} />
      <div className={s.dropdowns}>
        <Select
          className={s.dropdown}
          allowClear
          placeholder="Status"
          options={STATUS_OPTIONS}
          onChange={handleStatusChanged}
        />
        <Select
          className={s.dropdown}
          allowClear
          placeholder="Gender"
          options={GENDER_OPTIONS}
          onChange={handleGenderChanged}
        />
      </div>
    </div>
  )
}
