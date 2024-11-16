import {TableInstance} from "../../constant/tables.ts";
import React, {MouseEvent, MouseEventHandler, useCallback, useState} from "react";
import {TableToolbar} from "./TableToolbar.tsx";
import Pagination from "./Pagination.tsx";
import SimpleTable from "./SimpleTable.tsx";
import ActionModelForm from "./ActionModelForm.tsx";

export interface ViewModelSetting {
  isShow: boolean;
}

export interface AddModelSetting {
  isShow: boolean;
  isMustInput: boolean;
}

export interface EditModelSetting {
  isShow: boolean;
  isMustInput: boolean;
  isEdit: boolean;
}

export interface ColumnDef {
  id: number,
  headerName: string,
  field: string;
  type: string;
  isVisible: boolean;
}

export interface ActionDef {
  id: number,
  headerName: string,
  field: string;
  type: string;
  viewModalSetting: ViewModelSetting;
  editModalSetting: EditModelSetting;
  addModalSetting: AddModelSetting;
}

interface MyTableProps<T extends Record<string, unknown>> {
  data: T[],
  columnDefs: ColumnDef[],
  actionDefs: ActionDef[],
  filterColumns: TableInstance<T>['filterColumns'];
  setColumnDefs: React.Dispatch<React.SetStateAction<ColumnDef[]>>;
  filters: TableInstance<T>['state']['filters'];
  setFilters: React.Dispatch<React.SetStateAction<TableInstance<T>['state']['filters']>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
  totalCounts: number;
  onRefresh: MouseEventHandler,
  onSaveEdit: (row: any) => void;
  onCreateNew: (data: any) => void;
  onDeleteRow: (row: any) => void;
}
const MyTables = <T extends Record<string, unknown>>({
  data,
  columnDefs,
  setColumnDefs,
  actionDefs,
  filterColumns,
  filters,
  setFilters,
  currentPage,
  setCurrentPage,
  size,
  setSize,
  lastPage,
  totalCounts,
  onRefresh,
  onSaveEdit,
  onCreateNew,
  onDeleteRow
}: MyTableProps<T>) => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewOnly, setViewOnly] = useState(true);
  const [selectedData, setSelectedData] = useState<Partial<any> | null>(null);

  const handleAddClick = () => {
    setViewOnly(false);
    setSelectedData(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (data: any) => {
    setViewOnly(false);
    setSelectedData(data);
    setIsFormOpen(true);
  };

  const handleViewClick = (data: any) => {
    setViewOnly(true);
    setSelectedData(data);
    setIsFormOpen(true);
  };

  const handleSave = (data: any) => {
    if (selectedData) {
      onSaveEdit(data);
    } else {
      onCreateNew(data);
    }
    setIsFormOpen(false);
  };

  const onAdd = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      handleAddClick();
    },
    []
  )

  const startRow = (currentPage - 1) * size + 1;
  const endRow = Math.min(currentPage * size, totalCounts);

  const setFilter = useCallback((columnId: number, column: string, operator: string | undefined, value: string | undefined, type: string) => {
    setFilters(prevFilters => {
      if (value === undefined) {
        return prevFilters.filter(filter => filter.id !== columnId);
      } else {
        const newFilters = [...prevFilters];
        const filterIndex = newFilters.findIndex(filter => filter.id === columnId);

        if (filterIndex >= 0) {
          newFilters[filterIndex] = { id: columnId, column, operator, value, type };
        } else {
          newFilters.push({ id: columnId, column, operator, value, type });
        }

        return newFilters;
      }
    });
  }, []);

  const setAllFilters = useCallback((newFilters: TableInstance<T>['state']['filters']) => {
    setFilters(newFilters);
  }, []);

  const changeHideColumn = useCallback((id: number, visible: boolean) => {
    setColumnDefs((prevColumns) =>
      prevColumns.map((column) =>
        column.id === id ? { ...column, isVisible: visible } : column
      )
    );
  }, [columnDefs]);

  const instance: TableInstance<T> = {
    filterColumns: filterColumns,
    state: {
      filters
    },
    setFilter,
    setAllFilters,
    columnDefs,
    actionDefs,
    changeHideColumn
  };

  return (
    <>
      <TableToolbar instance={instance} {...{ onAdd, onRefresh, size, setSize }} />
      <SimpleTable
        columnDefs={columnDefs}
        data={data}
        handleViewClick={handleViewClick}
        handleEditClick={handleEditClick}
        handleDeleteClick={onDeleteRow}
      />
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-between w-full">
          <div className="text-gray-600">
            Showing {startRow} - {endRow} / {totalCounts} rows
          </div>
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            maxLength={7}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <ActionModelForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        actionDefs={actionDefs}
        initialData={selectedData || {}}
        viewOnly={viewOnly}
      />
    </>
  );
};

export default MyTables;
