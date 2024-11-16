import {TableInstance} from "./../../../constant/tables.ts";
import React, {MouseEventHandler, useCallback, useState} from "react";
import Pagination from "./../Pagination.tsx";
import SimpleDialog from "../dialog/SimpleDialog.tsx";
import {Session} from "../../Transfers/Transfers.tsx";
import {ColumnDef} from "../MyTables.tsx";
import {TransferTableToolbar} from "../transfer/TransferTableToolbar.tsx";
import ProductAssignSimpleTable from "./ProductAssignSimpleTable.tsx";

interface ProductAssignTableProps<T extends Record<string, unknown>> {
  data: T[],
  columnDefs: ColumnDef[],
  filterColumns: TableInstance<T>['filterColumns'];
  setColumnDefs: React.Dispatch<React.SetStateAction<ColumnDef[]>>;
  filters: TableInstance<T>['state']['filters'];
  setFilters: React.Dispatch<React.SetStateAction<TableInstance<T>['state']['filters']>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  setSelected: React.Dispatch<React.SetStateAction<Session | null>>
  lastPage: number;
  totalCounts: number;
  onRefresh: MouseEventHandler,
  onClickShowList: (row: any) => void;
  onClickAgreeCancel: () => void;
}

const ProductAssignTable = <T extends Record<string, unknown>>({
                                                       data,
                                                       columnDefs,
                                                       filterColumns,
                                                       setColumnDefs,
                                                       filters,
                                                       setFilters,
                                                       currentPage,
                                                       setCurrentPage,
                                                       size,
                                                       setSize,
                                                       setSelected,
                                                       lastPage,
                                                       totalCounts,
                                                       onRefresh,
                                                       onClickShowList,
                                                       onClickAgreeCancel
                                                     }: ProductAssignTableProps<T>) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewListClick = (data: any) => {
    onClickShowList(data);
  };

  const handleCancelClick = (data: any) => {
    setSelected(data);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    onClickAgreeCancel();
    setIsDialogOpen(false);
  };


  const handleClose = () => {
    setIsDialogOpen(false);
  };


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
    columnDefs: columnDefs,
    actionDefs: null,
    filterColumns: filterColumns,
    state: {
      filters
    },
    setFilter,
    setAllFilters,
    changeHideColumn
  };

  return (
    <>
      <TransferTableToolbar instance={instance} {...{ onRefresh, size, setSize }} />
      <ProductAssignSimpleTable
        columnDefs={columnDefs}
        data={data}
        handleCancelClick={handleCancelClick}
        handleViewListClick={handleViewListClick}
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
      <SimpleDialog
        open={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Xác nhận"
        message="Bạn có chắc chắn muốn thực hiện hành động này?"
      />
    </>
  );
};

export default ProductAssignTable;
