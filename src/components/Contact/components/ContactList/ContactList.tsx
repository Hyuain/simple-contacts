import s from './ContactList.module.scss'
import { ContactListFilter } from '../ContactListFilter/ContactListFilter.tsx'
import { ContactListItem } from '../ContactListItem/ContactListItem.tsx'
import { useEffect, useRef, useState } from 'react'
import { Character, getCharacters } from 'rickmortyapi'
import { IOnFilterCallbackParams } from '../ContactListFilter/ContactListFilter.interface.ts'
import { pruneRequestParams } from '@/utils/requestUtils.ts'
import classNames from 'classnames'
import { CharacterFilter } from 'rickmortyapi/dist/interfaces'
import { useDebounceFn, useThrottleFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'

const SCROLL_BOTTOM_THRESHOLD = 100

export const ContactList = (props: IContactListProps) => {
  const [totalPages, setTotalPages] = useState<number>(Infinity)
  const [nextPage, setNextPage] = useState(1)
  const [characterList, setCharacterList] = useState<Character[]>([])
  const [filters, setFilters] = useState<CharacterFilter>({})
  const scrollListRef = useRef<HTMLDivElement | null>(null)
  const requestIDRef = useRef<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCharacters(true)
  }, [])

  function handleFilter(params: IOnFilterCallbackParams) {
    fetchCharacters(true, params)
  }

  async function fetchCharacters(
    refresh: boolean,
    params: CharacterFilter = {},
  ) {
    const requestID = (requestIDRef.current = Math.random())
    if (!refresh && nextPage > totalPages) {
      return
    }
    const newParams = { ...filters, ...params }
    setFilters(newParams)
    const currentPage = refresh ? 1 : nextPage
    const response = await getCharacters(
      pruneRequestParams({
        ...newParams,
        page: currentPage,
      }),
    )
    // outdated request
    if (requestID !== requestIDRef.current) {
      return
    }
    const { info, results = [] } = response.data || {}
    let newCharacterList
    let newNextPage = currentPage + 1
    let newTotalPages = totalPages
    if (refresh) {
      newTotalPages = info ? info.pages : Infinity
      newNextPage = info ? newNextPage : 1
      newCharacterList = results
      scrollListRef.current!.scrollTop = 0
    } else {
      newCharacterList = [...characterList, ...results]
      newNextPage = nextPage + 1
    }
    setTotalPages(newTotalPages)
    setCharacterList(newCharacterList)
    setNextPage(newNextPage)
  }

  function handleListScrolled(e: any) {
    const { scrollHeight, scrollTop, clientHeight } = e.target
    const bottom = scrollHeight - scrollTop - clientHeight
    if (bottom < SCROLL_BOTTOM_THRESHOLD) {
      fetchCharacters(false)
    }
  }

  function handleListItemSelected(character: Character) {
    navigate(`/contact/${character.id}`)
  }

  return (
    <div className={classNames(props.className, s.wrapper)}>
      <div className={s.header}>
        <h1>Contact</h1>
        <ContactListFilter
          onFilter={useDebounceFn(handleFilter, { wait: 200 }).run}
        />
      </div>
      <div
        ref={scrollListRef}
        onScroll={useThrottleFn(handleListScrolled, { wait: 200 }).run}
        className={s.list}
      >
        {characterList.map((character) => {
          return (
            <ContactListItem
              onSelect={handleListItemSelected}
              key={character.id}
              character={character}
            />
          )
        })}
      </div>
    </div>
  )
}
