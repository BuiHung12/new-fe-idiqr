import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";
import {MouseEvent, useCallback, useEffect, useState} from "react";
import useFetch from "../../api/useFetch.api.ts";
import {tableConfig, TableInstance} from "../../constant/tables.ts";
import {alertOption} from "../../constant/alertOptions.ts";
import ProductAssignTable from "../tables/product-assign/ProductAssignTable.tsx";
import ProductAssignInput from "../tables/product-assign/ProductAssignInput.tsx";

export interface Session extends Record<string, unknown>{
  stt: number,
  sessionCode: string;
  productName: string;
  productCode: string;
  agentUserName: string;
  agentName: string;
  exportDate: string;
  createTime: string;
  amount: number;
  status: string;
  createBy: string;
}

interface ProductAssignData {
  count: number;
  users: Session[];
}


const ProductAssign = () => {

  const { request } = useFetch();
  const [totalCounts, setTotalCounts] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [size, setSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TableInstance<Session>['state']['filters']>([]);
  const [selected, setSelected] = useState<Session | null>(null);
  const { transferConfig } = tableConfig();
  const [columnDefs, setColumnDefs] = useState<ColumnDef[]>(transferConfig.columnDefs);
  const [data, setData] = useState<Session[]>([])
  const { notifications } = alertOption();
  const loadData = async () => {
    // const payload = {
    //   page: currentPage,
    //   size: size,
    //   orderBy: "DESC",
    //   filters: filters
    // }
    //
    // const res = await request<TransferDate>(listUserApi, 'POST', payload);
    // const resultDate = res.data;
    // if (resultDate) {
    //   setTotalCounts(resultDate.count);
    //   const newLastPage = Math.ceil(resultDate.count / size);
    //   setLastPage(newLastPage);
    //   setData(resultDate.users);
    // }
    setTotalCounts(1);
    setData([{stt: 1, agentName: 'hung', agentUserName: 'hungbv', amount: 100, createBy: 'hung', createTime: '12/12/2024', exportDate: '12/12/2022', productName: 'Sản phẩm 1', productCode: 'ABC', sessionCode: 'ABVC', status: 'hoàn thành'}]);
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

  const onClickShowList = async (data: any) => {
    console.log(data);
  };

  const onClickAgreeCancel = async () => {
    // const res = await request<UserDate>(createUserApi, 'POST', data);
    // if (res.status === 6001) {
    //   Store.addNotification(notifications.createUserError);
    // } else if (res.status === 201) {
    //   Store.addNotification(notifications.createUserSuccess);
    //   loadData().then(() => {
    //   });
    // }
  };


  return (
    <>
      <Breadcrumb pageName="Điều chuyển đại lý" />
      <ProductAssignInput/>
      <ProductAssignTable<Session>
        data={data}
        columnDefs={columnDefs}
        setColumnDefs={setColumnDefs}
        filterColumns={transferConfig.filterColum}
        filters={filters}
        setFilters={setFilters}
        lastPage={lastPage}
        totalCounts={totalCounts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        size={size}
        setSize={setSize}
        setSelected={setSelected}
        onRefresh={onRefresh}
        onClickShowList={onClickShowList}
        onClickAgreeCancel={onClickAgreeCancel}
      />
    </>
  );
}

export default ProductAssign;