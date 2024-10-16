import {ColumnDef} from "../pages/tables/MyTables.tsx";

export interface TableInstance<T extends Record<string, unknown>> {
  allColumns: {
    id: number;
    name: string;
    column: string;
    type: string;
    canFilter: boolean;
  }[];
  state: {
    filters: {
      id: number;
      column: string;
      operator: string | undefined;
      value: string | undefined;
      type: string
    }[];
  };
  setFilter: (columnId: number, column: string, operator: string | undefined, value: string | undefined, type: string) => void;
  setAllFilters: (filters: TableInstance<T>['state']['filters']) => void;
  columnDefs: ColumnDef[],
  changeHideColumn: (id: number, visible: boolean) => void;
}

export const tableConfig = () => {
  const userConfig = {
    filterColum: [
      {
        id: 1,
        name: "Username",
        column: "user_name",
        type: "string",
        canFilter: true,
      },
      {
        id: 2,
        name: "Name",
        column: "name",
        type: "string",
        canFilter: true,
      },
      {
        id: 3,
        name: "Address",
        column: "address",
        type: "string",
        canFilter: true,
      },
    ],
    columnDefs: [
      { id: 1, isVisible: true, headerName: "Username", field: "username", type: "string",
        viewModalSetting: {isShow: true}, editModalSetting: {isShow: true, isMustInput: true, isEdit: false}, addModalSetting: {isShow: true, isMustInput: true}},
      { id: 2, isVisible: false, headerName: "Password", field: "password", type: "string",
        viewModalSetting: {isShow: false}, editModalSetting: {isShow: false, isMustInput: false, isEdit: false}, addModalSetting: {isShow: true, isMustInput: true}},
      { id: 3, isVisible: true, headerName: "Name", field: "name", type: "string",
        viewModalSetting: {isShow: true}, editModalSetting: {isShow: true, isMustInput: false, isEdit: true}, addModalSetting: {isShow: true, isMustInput: false}},
      { id: 4, isVisible: true, headerName: "Address", field: "address", type: "string",
        viewModalSetting: {isShow: true}, editModalSetting: {isShow: true, isMustInput: false, isEdit: true}, addModalSetting: {isShow: true, isMustInput: false}},
      { id: 5, isVisible: true, headerName: "Create Time", field: "createTime", type: "string",
        viewModalSetting: {isShow: true}, editModalSetting: {isShow: false, isMustInput: false, isEdit: false}, addModalSetting: {isShow: false, isMustInput: false}},
    ]
  }

  return {userConfig}
}