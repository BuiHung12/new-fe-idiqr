import { Box, Checkbox, FormControlLabel, Popover, Typography } from '@mui/material'
import { ReactElement } from 'react'
import {TableInstance} from "../../constant/tables.ts";

interface ColumnHidePageProps<T extends Record<string, unknown>> {
  instance: TableInstance<T>
  anchorEl?: Element
  onClose: () => void
  show: boolean
}

const id = 'popover-column-hide'

export function ColumnHidePage<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
}: ColumnHidePageProps<T>): ReactElement | null {
  const { columnDefs, changeHideColumn } = instance

  return columnDefs.length > 1 ? (
    <div>
      <Popover
        anchorEl={anchorEl}
        sx={{ p: 4 }}
        id={id}
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
        <Box sx={{ p: 4 }}>
          <Typography sx={{ fontWeight: 500, padding: '0 24px 24px 0', textTransform: 'uppercase' }}>
            Visible Columns
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 198px)',
              '@media (max-width: 600px)': {
                gridTemplateColumns: 'repeat(1, 160px)',
              },
              gridColumnGap: 6,
              gridRowGap: 6,
            }}
          >
            {columnDefs.map((column) => (
              <FormControlLabel
                key={column.id}
                control={<Checkbox value={`${column.id}`}/>}
                label={column.headerName}
                checked={column.isVisible}
                onChange={() => changeHideColumn(column.id, !column.isVisible)}
              />
            ))}
          </Box>
        </Box>
      </Popover>
    </div>
  ) : null
}
