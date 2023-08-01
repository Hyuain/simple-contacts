import s from './ContactDetail.module.scss'
import { Character, Episode, getCharacter, getEpisode } from 'rickmortyapi'
import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import {
  ContactDetailRecordSize,
  IContactDetailRecordProps,
} from './ContactDetail.interface.ts'
import classNames from 'classnames'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

const EPISODE_TABLE_COLUMNS: ColumnsType<Episode> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Air Date',
    dataIndex: 'air_date',
  },
  {
    title: 'Episode',
    dataIndex: 'episode',
  },
  {
    title: 'Created Date',
    dataIndex: 'created',
    render: (created: string) => {
      return new Date(created).toLocaleDateString()
    },
  },
]

export const ContactDetail = () => {
  const [character, setCharacter] = useState<Character | null>(null)
  const id = Number(useParams().id)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const { className: outletClassName } = useOutletContext<{
    className: string
  }>()

  useEffect(() => {
    getCharacter(id).then((response) => {
      console.log(response.data)
      setCharacter(response.data)
      fetchEpisodes(response.data)
    })
  }, [id])

  function fetchEpisodes(character: Character): void {
    const episodeIds = character.episode.map((episode) => {
      return Number(episode.split('/').pop())
    })
    getEpisode(episodeIds).then((response) => {
      let nextEpisodes = response.data
      if (!nextEpisodes) {
        return
      }
      if (!Array.isArray(nextEpisodes)) {
        nextEpisodes = [nextEpisodes]
      }
      console.log('eps', nextEpisodes)
      setEpisodes(nextEpisodes)
    })
  }

  const records: IContactDetailRecordProps[] = [
    { label: 'Status', value: character?.status },
    { label: 'Gender', value: character?.gender },
    { label: 'Species', value: character?.species },
    { label: 'Location', value: character?.location.name },
    { label: 'Origin', value: character?.origin.name },
    {
      label: 'Created Date',
      value: character?.created
        ? new Date(character.created).toLocaleDateString()
        : '',
    },
  ]

  return (
    <div className={classNames(outletClassName, s.contentDetailWrapper)}>
      <div className={s.header}>
        <div className={s.headerLeft}>
          <img
            className={s.headerImage}
            src={character?.image}
            alt={character?.name}
          />
        </div>
        <div className={s.headerRight}>{character?.name}</div>
      </div>
      <div className={s.content}>
        <div className={s.section}>
          <h2 className={s.sectionTitle}>Personal Info</h2>
          <div className={s.sectionCard}>
            <div className={s.recordsWrapper}>
              {records.map((record) => {
                return (
                  <Record
                    key={record.label}
                    label={record.label}
                    value={record.value}
                    size={record.size}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className={s.section}>
          <h2 className={s.sectionTitle}>Episodes</h2>
          <div className={s.sectionCard}>
            <Table
              rowKey={(episode) => episode.id}
              className={s.episodesTable}
              columns={EPISODE_TABLE_COLUMNS}
              dataSource={episodes}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Record = (props: IContactDetailRecordProps) => {
  return (
    <div
      className={classNames(
        s.recordWrapper,
        props.className,
        props.size === ContactDetailRecordSize.HALF
          ? s.halfRecord
          : s.fullRecord,
      )}
    >
      <div className={s.recordLabel}>{props.label}</div>
      <div className={s.recordValue}>{props.value}</div>
    </div>
  )
}
