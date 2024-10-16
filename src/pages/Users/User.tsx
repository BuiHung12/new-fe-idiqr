import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";
import MyTables, {ColumnDef} from "../tables/MyTables.tsx";
import {MouseEvent, useCallback, useEffect, useState} from "react";
import {tableConfig, TableInstance} from "../../constant/tables.ts";
import useFetch from "../../api/useFetch.api.ts";
import {createUserApi, deleteUserApi, listUserApi, updateUserApi} from "../../api/endpoints.ts";
import {alertOption} from "../../constant/alertOptions.ts";
import {Store} from "react-notifications-component";

interface User extends Record<string, unknown>{
  id: string,
  username: string;
  name: string;
  address: string;
  createTime: string;
}

interface UserDate {
  count: number;
  users: User[];
}

const Users = () => {
  const { request } = useFetch();
  const [totalCounts, setTotalCounts] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [size, setSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TableInstance<User>['state']['filters']>([]);
  const { userConfig } = tableConfig();
  const [columnDefs, setColumnDefs] = useState<ColumnDef[]>(userConfig.columnDefs);
  const [data, setData] = useState<User[]>([])
  const { notifications } = alertOption();
  const loadData = async () => {
    const payload = {
      page: currentPage,
      size: size,
      orderBy: "DESC",
      filters: filters
    }

    const res = await request<UserDate>(listUserApi, 'POST', payload);
    const resultDate = res.data;
    if (resultDate) {
      setTotalCounts(resultDate.count);
      const newLastPage = Math.ceil(resultDate.count / size);
      setLastPage(newLastPage);
      setData(resultDate.users);
    }
  }

  useEffect(() => {
    loadData().then(() => {});
  }, []);

  useEffect(() => {
    loadData().then(() => {});
  }, [size, currentPage, filters]);

  const onRefresh = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      loadData().then(() => {});
    },
    []
  )

  const onSaveEdit = async (data: any) => {
    data.createTime = null;
    const res = await request<UserDate>(updateUserApi.replace('{id}', data.id), 'PUT', data);
    if (res.status === 200) {
      Store.addNotification(notifications.updateUserSuccess);
      loadData().then(() => {
      });
    }
  };

  const onCreateNew = async (data: any) => {
    const res = await request<UserDate>(createUserApi, 'POST', data);
    if (res.status === 6001) {
      Store.addNotification(notifications.createUserError);
    } else if (res.status === 201) {
      Store.addNotification(notifications.createUserSuccess);
      loadData().then(() => {
      });
    }
  };


  const onDeleteRow = async (data: any) => {
    const res = await request<UserDate>(deleteUserApi.replace('{id}', data.id), 'DELETE');
    if (res.status === 200) {
      Store.addNotification(notifications.deleteSuccess);
      loadData().then(() => {
      });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Users" />
      <MyTables<User>
        data={data}
        columnDefs={columnDefs}
        setColumnDefs={setColumnDefs}
        allColumns={userConfig.filterColum}
        filters={filters}
        setFilters={setFilters}
        lastPage={lastPage}
        totalCounts={totalCounts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        size={size}
        setSize={setSize}
        onRefresh={onRefresh}
        onCreateNew={onCreateNew}
        onSaveEdit={onSaveEdit}
        onDeleteRow={onDeleteRow}
      />
    </>
  );
};

export default Users;
