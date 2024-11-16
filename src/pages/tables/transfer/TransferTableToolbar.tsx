import CachedIcon from '@mui/icons-material/Cached'
import FilterListIcon from '@mui/icons-material/FilterList'
import ViewColumnsIcon from '@mui/icons-material/ViewColumn'
import { Button, IconButton, Toolbar, Tooltip } from '@mui/material'
import React, { MouseEvent, MouseEventHandler, PropsWithChildren, ReactElement, useCallback, useState } from 'react'
import { makeStyles } from 'tss-react/mui'

import { ColumnHidePage } from './../ColumnHidePage'
import { FilterPage } from './../FilterPage'
import {TableInstance} from "../../../constant/tables.ts";
import {FilterChipBar} from "./../FilterChipBar.tsx";
import RowSelect from "./../RowSelect.tsx";
import './../Toolbar.css';

export interface TableMouseEventHandler<T extends Record<string, unknown>> {
  (instance: TableInstance<T>): MouseEventHandler
}

export const useStyles = makeStyles()(() => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftButtons: {
    display: 'flex',
  },
  rightButtons: {
  },
  leftIcons: {
    '&:first-of-type': {
      marginLeft: -12,
    },
  },
  rightIcons: {
    padding: 12,
    marginTop: '-6px',
    width: 48,
    height: 48,
    '&:last-of-type': {
      marginRight: -12,
    },
  },
}))

interface ActionButton<T extends Record<string, unknown>> {
  instance: TableInstance<T>
  icon?: JSX.Element
  onClick: TableMouseEventHandler<T>
  enabled?: (instance: TableInstance<T>) => boolean
  label: string
  variant?: 'right' | 'left'
}

export const LabeledActionButton = <T extends Record<string, unknown>>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
}: ActionButton<T>): ReactElement => (
  <Button variant='outlined' color='primary' onClick={onClick(instance)} disabled={!enabled(instance)}>
    {icon}
    &nbsp;
    {label}
  </Button>
)

export const SmallIconActionButton = <T extends Record<string, unknown>>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
  variant,
}: ActionButton<T>) => {
  const { classes, cx } = useStyles()
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton
          className={cx({ [classes.rightIcons]: variant === 'right', [classes.leftIcons]: variant === 'left' })}
          onClick={onClick(instance)}
          disabled={!enabled(instance)}
          size='large'
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  )
}

export interface Command<T extends Record<string, unknown>> {
  label: string
  onClick: TableMouseEventHandler<T>
  icon?: JSX.Element
  enabled: (instance: TableInstance<T>) => boolean
  type?: 'icon' | 'button'
}

interface TableToolbarProps<T extends Record<string, unknown>> {
  instance: TableInstance<T>,
  onRefresh: MouseEventHandler
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
}

export function TransferTableToolbar<T extends Record<string, unknown>>({
  instance,
  onRefresh,
  size,
  setSize
}: PropsWithChildren<TableToolbarProps<T>>): ReactElement | null {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined)
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const handleColumnsClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setColumnsOpen(true)
    },
    [setAnchorEl, setColumnsOpen]
  )

  const handleFilterClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setFilterOpen(true)
    },
    [setAnchorEl, setFilterOpen]
  )

  function handleClose() {
    setColumnsOpen(false)
    setFilterOpen(false)
    setAnchorEl(undefined)
  }

  // toolbar with add, edit, delete, filter/search column select.
  return (
    <Toolbar className={classes.toolbar} disableGutters>
      <div className={classes.leftButtons}>
        <RowSelect size={size} setSize={setSize}/>
        <FilterChipBar<T> instance={instance} />
      </div>
      <div className={classes.rightButtons}>
        <ColumnHidePage<T> instance={instance} onClose={handleClose} show={columnsOpen} anchorEl={anchorEl} />
        <FilterPage<T> instance={instance} onClose={handleClose} show={filterOpen} anchorEl={anchorEl} />
        <SmallIconActionButton<T>
          instance={instance}
          icon={<CachedIcon />}
          onClick={() => onRefresh}
          label='Refresh Table'
          variant='right'
        />
        <SmallIconActionButton<T>
          instance={instance}
          icon={<ViewColumnsIcon />}
          onClick={() => handleColumnsClick}
          label='Show / hide columns'
          variant='right'
        />
        <SmallIconActionButton<T>
          instance={instance}
          icon={<FilterListIcon />}
          onClick={() => handleFilterClick}
          label='Filter by columns'
          variant='right'
        />
      </div>
    </Toolbar>
  )
}
