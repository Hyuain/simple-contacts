import { Input, Select } from 'antd'
import {
  CharacterGender,
  CharacterStatus,
  IContactListFilterProps,
} from './ContactListFilter.interface.ts'
import { useState } from 'react'
import s from './ContactListFilter.module.scss'
import { ReactComponent as FilterClearSVG } from '@/assets/icons/filterClear.svg'

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

  function handleFilterClearClicked() {
    setStatus(CharacterStatus.NULL)
    setGender(CharacterGender.NULL)
    triggerFilter({
      gender: CharacterGender.NULL,
      status: CharacterStatus.NULL,
    })
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
          value={status === CharacterStatus.NULL ? undefined : status}
          className={s.dropdown}
          allowClear
          placeholder="Status"
          options={STATUS_OPTIONS}
          onChange={handleStatusChanged}
        />
        <Select
          value={gender === CharacterGender.NULL ? undefined : gender}
          className={s.dropdown}
          allowClear
          placeholder="Gender"
          options={GENDER_OPTIONS}
          onChange={handleGenderChanged}
        />
        {status !== CharacterStatus.NULL || gender !== CharacterGender.NULL ? (
          <FilterClearSVG
            onClick={handleFilterClearClicked}
            className={s.filterClear}
          />
        ) : null}
      </div>
    </div>
  )
}
