import React from "react";
import {Route, Routes} from "react-router-dom";
import PageTitle from "../components/PageTitle.tsx";
import ECommerce from "../pages/Dashboard/ECommerce.tsx";
import Calendar from "../pages/Calendar.tsx";
import Profile from "../pages/Profile.tsx";
import FormElements from "../pages/Form/FormElements.tsx";
import FormLayout from "../pages/Form/FormLayout.tsx";
import Tables from "../pages/Tables.tsx";
import Settings from "../pages/Settings.tsx";
import Chart from "../pages/Chart.tsx";
import Alerts from "../pages/UiElements/Alerts.tsx";
import Buttons from "../pages/UiElements/Buttons.tsx";
import SignIn from "../pages/Authentication/SignIn.tsx";
import SignUp from "../pages/Authentication/SignUp.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../stores/store.ts";
import {selectAuth} from "../stores/slices/authSlice.ts";
import {PATHS} from "./routePaths.ts";
import Users from "../pages/Users/User.tsx";

export const AppRouter: React.FC = () => {

  const auth = useSelector((state: RootState) => selectAuth(state))
  const  roleSidebar = auth.roleSidebarVisible;

  return (
    <Routes>
      {roleSidebar.dashboard && roleSidebar.dashboard.eCommerce && <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
      />}
      {roleSidebar.calendar && <Route
          path={PATHS.calendar}
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
      />}
      {roleSidebar.profile && <Route
          path={PATHS.profile}
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
      />}
      {roleSidebar.forms && roleSidebar.forms.formElements && <Route
          path={PATHS.forms.elements}
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
      />}
      {roleSidebar.forms && roleSidebar.forms.formLayout && <Route
          path={PATHS.forms.layout}
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
      />}
      {roleSidebar.tables && <Route
          path={PATHS.tables}
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
      />}
      {roleSidebar.settings && <Route
          path={PATHS.settings}
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
      />}
      {roleSidebar.chart && <Route
          path={PATHS.chart}
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
      />}
      {roleSidebar.uiElements && roleSidebar.uiElements.alerts && <Route
          path={PATHS.ui.alerts}
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
      />}
      {roleSidebar.uiElements && roleSidebar.uiElements.buttons && <Route
          path={PATHS.ui.buttons}
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
      />}
      {roleSidebar.authentication && roleSidebar.authentication.signin && <Route
          path={PATHS.auth.signIn}
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
      />}
      {roleSidebar.authentication && roleSidebar.authentication.signup && <Route
          path={PATHS.auth.signUp}
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
      />}
      {roleSidebar.users && <Route
          path={PATHS.users}
          element={
            <>
              <PageTitle title="Users | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Users />
            </>
          }
      />}
    </Routes>
  );

}