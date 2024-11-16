import { Button, Popover, Typography } from '@mui/material'
import { FormEvent, ReactElement, useCallback } from 'react'
import { makeStyles } from 'tss-react/mui'
import {TableInstance} from "../../constant/tables.ts";

const useStyles = makeStyles()({
  columnsPopOver: {
    padding: 24,
  },
  filtersResetButton: {
    top: 18,
    right: 21,
  },
  popoverTitle: {
    fontWeight: 500,
    padding: '0 24px 24px 0',
    textTransform: 'uppercase',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 218px)',
    '@media (max-width: 600px)': {
      gridTemplateColumns: 'repeat(1, 180px)',
    },
    gridColumnGap: 24,
    gridRowGap: 24,
  },
  cell: {
    width: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
  },
  hidden: {
    display: 'none',
  },
})

interface FilterPageProps<T extends Record<string, unknown>> {
  instance: TableInstance<T>
  anchorEl?: Element
  onClose: () => void
  show: boolean
}

export function FilterPage<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
}: FilterPageProps<T>): ReactElement {
  const { classes } = useStyles()
  const { filterColumns, setAllFilters, state: { filters }, setFilter } = instance

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onClose()
    },
    [onClose]
  )

  const resetFilters = useCallback(() => {
    setAllFilters([])
  }, [setAllFilters])

  const handleInputChange = (columnId: number, column: string, value: string | undefined, type: string) => {
    const operator = value === undefined ? undefined : 'like';
    setFilter(columnId, column, operator, value, type);
  };

  return (
    <div>
      <Popover
        anchorEl={anchorEl}
        id='popover-filters'
        onClose={onClose}
        open={show}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.columnsPopOver}>
          <Typography className={classes.popoverTitle}>Filters</Typography>
          <form onSubmit={onSubmit}>
            <Button
              className={classes.filtersResetButton}
              color='primary'
              onClick={resetFilters}
              style={{ position: 'absolute' }}
            >
              Reset
            </Button>
            <div className={classes.grid}>
              {filterColumns
                .filter((it) => it.canFilter)
                .map((column) => {
                  const filter = filters.find(f => f.id === column.id);
                  const inputValue = filter ? filter.value : '';
                  return (
                    <div key={column.id} className={classes.cell}>
                      <label htmlFor={`filter-${column.id}`}>{column.name}</label>
                      <input
                        id={`filter-${column.id}`}
                        type={column.type === 'number' ? 'number' : 'text'}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={inputValue as string}
                        onChange={(e) =>
                          handleInputChange(
                            column.id,
                            column.column,
                            e.target.value === '' ? undefined : e.target.value,
                            column.type
                          )
                        }
                      />
                    </div>
                  )}
                )}
            </div>
            <Button className={classes.hidden} type='submit'>
              &nbsp;
            </Button>
          </form>
        </div>
      </Popover>
    </div>
  )
}
