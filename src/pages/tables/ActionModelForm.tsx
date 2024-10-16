import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { ColumnDef } from "./MyTables.tsx";

interface ModelFormProps<T> {
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  columnDefs: ColumnDef[];
  initialData?: Partial<T>;
  viewOnly?: boolean; // New prop for view-only mode
}

const ActionModelForm = <T extends Record<string, any>>({
                                                          open,
                                                          onClose,
                                                          onSave,
                                                          columnDefs,
                                                          initialData = {},
                                                          viewOnly = false, // Default to false
                                                        }: ModelFormProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (field: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formData as T);
    onClose();
  };

  function formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }

  // function parseDate(dateString: string): string {
  //   const [year, month, day] = dateString.split('-');
  //   return `${day}-${month}-${year}`;
  // }

  const typeModal = viewOnly ? 'view' : Object.entries(initialData).length !== 0 ? 'edit' : 'add';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {typeModal === 'view' ? 'View' : typeModal === 'edit' ? 'Edit' : 'Add'} Model
      </DialogTitle>
      <form onSubmit={handleSave}>
        <DialogContent style={{
          paddingTop: '5px', // Increase top padding to prevent the label from being obscured
        }}>
          {columnDefs.map((column) => {
            let visible = true;
            let required = true;
            let disabled = true;
            if (typeModal === 'view') {
              visible = column.viewModalSetting.isShow;
              disabled = true;
              required = false;
            }
            if (typeModal === 'edit') {
              visible = column.editModalSetting.isShow;
              disabled = !column.editModalSetting.isEdit;
              required = column.editModalSetting.isMustInput;
            }
            if (typeModal === 'add') {
              visible = column.addModalSetting.isShow;
              disabled = false;
              required = column.addModalSetting.isMustInput;
            }
            return (<div key={column.id} style={{ marginBottom: '16px' }}>
              {(column.type === 'string' && visible) && (
                <TextField
                  fullWidth
                  label={column.headerName}
                  value={formData[column.field] || ''}
                  onChange={(e) => handleChange(column.field, e.target.value)}
                  disabled={disabled}
                  required={required}
                />
              )}
              {(column.type === 'number' && visible) && (
                <TextField
                  fullWidth
                  label={column.headerName}
                  type="number"
                  value={formData[column.field] || ''}
                  onChange={(e) => handleChange(column.field, Number(e.target.value))}
                  disabled={disabled}
                  required={required}
                />
              )}
              {(column.type === 'date' && visible) && (
                <TextField
                  fullWidth
                  label={column.headerName}
                  type="date"
                  value={formData[column.field] ? formatDate(formData[column.field] as string) : ''}
                  onChange={(e) => handleChange(column.field, e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={disabled}
                  required={required}
                />
              )}
            </div>
          );}
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {viewOnly ? 'Close' : 'Cancel'}
          </Button>
          {!viewOnly && (
            <Button type="submit" color="primary">Save</Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ActionModelForm;
