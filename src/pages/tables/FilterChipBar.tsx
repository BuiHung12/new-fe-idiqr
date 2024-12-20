import { Chip } from '@mui/material'
import { ReactElement, useCallback } from 'react'
import { makeStyles } from 'tss-react/mui'
import {TableInstance} from "../../constant/tables.ts";

const useStyles = makeStyles()({
  filtersActiveLabel: {
    color: '#998',
    fontSize: '14px',
    paddingRight: 10,
  },
  chipZone: {
    padding: '18px 0 5px 10px',
    width: '100%',
  },
  chipLabel: {
    fontWeight: 500,
    marginRight: 5,
  },
  filterChip: {
    marginRight: 4,
    color: '#222',
  },
})

interface FilterChipBarProps<T extends Record<string, unknown>> {
  instance: TableInstance<T>
}

export function FilterChipBar<T extends Record<string, unknown>>({
  instance,
}: FilterChipBarProps<T>): ReactElement | null {
  const { classes } = useStyles()
  const {
    allColumns,
    setFilter,
    state: { filters },
  } = instance
  const handleDelete = useCallback(
    (id: number) => {
      setFilter(id, '',undefined, undefined, 'string');
    },
    [setFilter]
  )

  return Object.keys(filters).length > 0 ? (
    <div className={classes.chipZone}>
      <span className={classes.filtersActiveLabel}>Active filters:</span>
      {filters &&
        allColumns.map((column) => {
          const filter = filters.find((f) => f.id === column.id)
          const value = filter?.value
          return (
            value && (
              <Chip
                className={classes.filterChip}
                key={column.id}
                label={
                  <>
                    <span className={classes.chipLabel}>{column.name}: </span>
                    {value}
                  </>
                }
                onDelete={() => handleDelete(column.id)}
                variant='outlined'
              />
            )
          )
        })}
    </div>
  ) : null
}
