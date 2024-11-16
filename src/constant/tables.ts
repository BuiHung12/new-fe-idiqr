import {ActionDef, ColumnDef} from "../pages/tables/MyTables.tsx";

export interface TableInstance<T extends Record<string, unknown>> {
  filterColumns: {
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
  actionDefs: ActionDef[] | null,
  changeHideColumn: (id: number, visible: boolean) => void;
}

export const tableConfig = () => {
  const userConfig = {
    filterColumns: [
      {
        id: 1,
        name: "Username",
        column: "username",
        type: "number",
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
      { id: 1, isVisible: true, headerName: "Username", field: "userName", type: "string" },
      { id: 2, isVisible: false, headerName: "Password", field: "passWord", type: "string" },
      { id: 3, isVisible: true, headerName: "Name", field: "name", type: "string" },
      { id: 4, isVisible: true, headerName: "Address", field: "address", type: "string" },
      { id: 5, isVisible: true, headerName: "Create Time", field: "createTime", type: "string" },
    ],
    actionDefs: [
      { id: 1, headerName: "Username", field: "userName", type: "string",
        viewModalSetting: {isShow: true}, editModalSetting: {isShow: true, isMustInput: true, isEdit: false}, addModalSetting: {isShow: true, isMustInput: true}},
      { id: 2, headerName: "Password", field: "passWord", type: "string",
        viewModalSetting: {isShow: false}, editModalSetting: {isShow: false, isMustInput: false, isEdit: false}, addModalSetting: {isShow: true, isMustInput: true}},
      { id: 3, headerName: "Name", field: "name", type: "string",
        viewModalSetting: {isShow: true}, editModalSetting: {isShow: true, isMustInput: false, isEdit: true}, addModalSetting: {isShow: true, isMustInput: false}},
      { id: 4, headerName: "Address", field: "address", type: "string",
        viewModalSetting: {isShow: true}, editModalSetting: {isShow: true, isMustInput: false, isEdit: true}, addModalSetting: {isShow: true, isMustInput: false}},
      { id: 5, headerName: "Create Time", field: "createTime", type: "string",
        viewModalSetting: {isShow: true}, editModalSetting: {isShow: false, isMustInput: false, isEdit: false}, addModalSetting: {isShow: false, isMustInput: false}},
    ]
  }

  const transferConfig = {
    filterColum: [
      {
        id: 1,
        name: "Mã đợt gán",
        column: "session_code",
        type: "string",
        canFilter: true,
      },
      {
        id: 2,
        name: "Tên sản phẩm",
        column: "product_name",
        type: "string",
        canFilter: true,
      },
      {
        id: 3,
        name: "Mã sản phẩm",
        column: "product_code",
        type: "string",
        canFilter: true,
      },
      {
        id: 4,
        name: "Mã đại lý",
        column: "agent_user_name",
        type: "string",
        canFilter: true,
      },
      {
        id: 5,
        name: "Tên đại lý",
        column: "agent_name",
        type: "string",
        canFilter: true,
      },
      {
        id: 6,
        name: "Ngày xuất",
        column: "export_date",
        type: "date",
        canFilter: true,
      },
      {
        id: 7,
        name: "Ngày gán",
        column: "create_time",
        type: "date",
        canFilter: true,
      },
      {
        id: 8,
        name: "Số lượng",
        column: "amount",
        type: "number",
        canFilter: true,
      },
      {
        id: 9,
        name: "Trạng thái",
        column: "status",
        type: "string",
        canFilter: true,
      },
      {
        id: 10,
        name: "Người tạo ID",
        column: "createBy",
        type: "string",
        canFilter: true,
      },
    ],
    columnDefs: [
      { id: 1, isVisible: true, headerName: "STT", field: "stt", type: "number"},
      { id: 2, isVisible: true, headerName: "Mã đợt gán", field: "sessionCode", type: "string"},
      { id: 3, isVisible: true, headerName: "Tên sản phẩm", field: "productName", type: "string"},
      { id: 4, isVisible: true, headerName: "Mã sản phẩm", field: "productCode", type: "string"},
      { id: 5, isVisible: true, headerName: "Mã đại lý", field: "agentUserName", type: "string"},
      { id: 6, isVisible: true, headerName: "Tên đại lý", field: "agentName", type: "string"},
      { id: 7, isVisible: true, headerName: "Ngày xuất", field: "exportDate", type: "string"},
      { id: 8, isVisible: true, headerName: "Ngày gán", field: "createTime", type: "string"},
      { id: 9, isVisible: true, headerName: "Số lượng", field: "amount", type: "number"},
      { id: 10, isVisible: true, headerName: "Trạng thái", field: "status", type: "string"},
      { id: 11, isVisible: true, headerName: "Người tạo ID", field: "createBy", type: "string"},
    ]
  }

  return {userConfig, transferConfig}
}