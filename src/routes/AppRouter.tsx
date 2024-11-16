import React from "react";
import {Route, Routes} from "react-router-dom";
import PageTitle from "../components/PageTitle.tsx";
import ECommerce from "../pages/Dashboard/ECommerce.tsx";
import SignIn from "../pages/Authentication/SignIn.tsx";
import SignUp from "../pages/Authentication/SignUp.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../stores/store.ts";
import {selectAuth} from "../stores/slices/authSlice.ts";
import {PATHS} from "./routePaths.ts";
import Users from "../pages/Users/User.tsx";
import Transfers from "../pages/Transfers/Transfers.tsx";
import ProductAssign from "../pages/ProductAssign/ProductAssign.tsx";

export const AppRouter: React.FC = () => {

  const auth = useSelector((state: RootState) => selectAuth(state))
  const  roleSidebar = auth.roleSidebarVisible;

  return (
    <Routes>
      {roleSidebar.dashboard && <Route
          index
          element={
            <>
              <PageTitle title="Bảng điều khiển | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.codeManage && roleSidebar.codeManage.naviCode && <Route
          path={PATHS.codeManage.naviCode}
          element={
            <>
              <PageTitle title="Mã điều hướng | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.codeManage && roleSidebar.codeManage.assignNaviCode && <Route
          path={PATHS.codeManage.assignNaviCode}
          element={
            <>
              <PageTitle title="Gán mã điều hướng | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.codeManage && roleSidebar.codeManage.importCode && <Route
          path={PATHS.codeManage.importCode}
          element={
            <>
              <PageTitle title="Đợt phát hành tem | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.codeManage && roleSidebar.codeManage.activeRole && <Route
          path={PATHS.codeManage.activeRole}
          element={
            <>
              <PageTitle title="Thiết lập QRcode | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.activeManage && roleSidebar.activeManage.productList && <Route
          path={PATHS.activeManage.productList}
          element={
            <>
              <PageTitle title="Danh sách sản phẩm | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.activeManage && roleSidebar.activeManage.agentList && <Route
          path={PATHS.activeManage.agentList}
          element={
            <>
              <PageTitle title="Danh sách đại lý | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.activeManage && roleSidebar.activeManage.productAssign && <Route
          path={PATHS.activeManage.productAssign}
          element={
            <>
              <PageTitle title="Kích hoạt sử dụng | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProductAssign />
            </>
          }
      />}
      {roleSidebar.activeManage && roleSidebar.activeManage.transfer && <Route
          path={PATHS.activeManage.transfer}
          element={
            <>
              <PageTitle title="Điều chuyển đại lý | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Transfers />
            </>
          }
      />}
      {roleSidebar.activeManage && roleSidebar.activeManage.revertCode && <Route
          path={PATHS.activeManage.revertCode}
          element={
            <>
              <PageTitle title="Nhập hàng đổi trả | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.activeManage && roleSidebar.activeManage.uploadCode && <Route
          path={PATHS.activeManage.uploadCode}
          element={
            <>
              <PageTitle title="Tra cứu kích hoạt | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.activeManage && roleSidebar.activeManage.domain && <Route
          path={PATHS.activeManage.domain}
          element={
            <>
              <PageTitle title="Quản lý domain | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.otherConvenient && roleSidebar.otherConvenient.consumerActive && <Route
          path={PATHS.otherConvenient.consumerActive}
          element={
            <>
              <PageTitle title="Kích hoạt tiêu dùng | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.otherConvenient && roleSidebar.otherConvenient.cancelActive && <Route
          path={PATHS.otherConvenient.cancelActive}
          element={
            <>
              <PageTitle title="Hủy kích hoạt tem | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.otherConvenient && roleSidebar.otherConvenient.assignSerial && <Route
          path={PATHS.otherConvenient.assignSerial}
          element={
            <>
              <PageTitle title="Gán serial vào id tem | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.accountManage && roleSidebar.accountManage.users && <Route
          path={PATHS.accountManage.users}
          element={
            <>
              <PageTitle title="Danh sách công ty | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Users />
            </>
          }
      />}
      {roleSidebar.accountManage && roleSidebar.accountManage.staffList && <Route
          path={PATHS.accountManage.staffList}
          element={
            <>
              <PageTitle title="Danh sách nhân viên | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.accountManage && roleSidebar.accountManage.profile && <Route
          path={PATHS.accountManage.profile}
          element={
            <>
              <PageTitle title="Cá nhân | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.authentication && roleSidebar.authentication.signin && <Route
          path={PATHS.auth.signIn}
          element={
            <>
              <PageTitle title="Đăng nhập | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
      />}
      {roleSidebar.authentication && roleSidebar.authentication.signup && <Route
          path={PATHS.auth.signUp}
          element={
            <>
              <PageTitle title="Đăng ký | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
      />}
      {roleSidebar.guild && <Route
          path={PATHS.guild}
          element={
            <>
              <PageTitle title="Hướng dẫn | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Users />
            </>
          }
      />}
    </Routes>
  );

}