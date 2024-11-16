import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/logo.svg';
import CustomParentNavLink from "./CustomParentNavLink.tsx";
import CustomChildNavLink from "./CustomChildNavLink.tsx";
import CustomNavLink from "./CustomNavLink.tsx";
import {
  AuthenticationIcon,
  ChartIcon,
  DashboardIcon,
  FormsIcon,
} from "../Icons/Icons.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../stores/store.ts";
import {selectAuth} from "../../stores/slices/authSlice.ts";
import {useTranslation} from "react-i18next";
import {PATHS} from "../../routes/routePaths.ts";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const { t } = useTranslation();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  const auth = useSelector((state: RootState) => selectAuth(state))
  const  roleSidebar = auth.roleSidebarVisible;

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      // style={{display: "none"}}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              {t('menu.menu')}
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {roleSidebar.dashboard && <CustomNavLink title={t('menu.dashboard')} to={'/'} visible={pathname === '/' || pathname.includes('dashboard')} icon={<DashboardIcon/>}/>}
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Forms --> */}
              {roleSidebar.codeManage != null && <SidebarLinkGroup
                  activeCondition={
                    pathname === '/code-manager' || pathname.includes('code-manager')
                  }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <CustomParentNavLink title={t('menu.codeManage.name')} visible={pathname === '/code-manager' || pathname.includes('code-manager')} open={open} handleClick={handleClick}
                                           sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} icon={<FormsIcon/>}/>
                      <div
                        className={`overflow-hidden transition-all duration-800 ${
                          open ? 'max-h-[500px]' : 'max-h-0'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {roleSidebar.codeManage != null && roleSidebar.codeManage.naviCode && <CustomChildNavLink title={t('menu.codeManage.naviCode.name')} to={PATHS.codeManage.naviCode}/>}
                          {roleSidebar.codeManage != null && roleSidebar.codeManage.assignNaviCode && <CustomChildNavLink title={t('menu.codeManage.assignNaviCode.name')} to={PATHS.codeManage.assignNaviCode}/>}
                          {roleSidebar.codeManage != null && roleSidebar.codeManage.importCode && <CustomChildNavLink title={t('menu.codeManage.importCode.name')} to={PATHS.codeManage.importCode}/>}
                          {roleSidebar.codeManage != null && roleSidebar.codeManage.activeRole && <CustomChildNavLink title={t('menu.codeManage.activeRole.name')} to={PATHS.codeManage.activeRole}/>}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>}

              {/* <!-- Menu Item Forms --> */}
              {roleSidebar.activeManage != null && <SidebarLinkGroup
                  activeCondition={
                    pathname === '/active-manager' || pathname.includes('active-manager')
                  }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <CustomParentNavLink title={t('menu.activeManage.name')} visible={pathname === '/active-manager' || pathname.includes('active-manager')} open={open} handleClick={handleClick}
                                           sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} icon={<FormsIcon/>}/>
                      <div
                        className={`overflow-hidden transition-all duration-800 ${
                          open ? 'max-h-[500px]' : 'max-h-0'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {roleSidebar.activeManage != null && roleSidebar.activeManage.productList && <CustomChildNavLink title={t('menu.activeManage.productList.name')} to={PATHS.activeManage.productList}/>}
                          {roleSidebar.activeManage != null && roleSidebar.activeManage.agentList && <CustomChildNavLink title={t('menu.activeManage.agentList.name')} to={PATHS.activeManage.agentList}/>}
                          {roleSidebar.activeManage != null && roleSidebar.activeManage.productAssign && <CustomChildNavLink title={t('menu.activeManage.productAssign.name')} to={PATHS.activeManage.productAssign}/>}
                          {roleSidebar.activeManage != null && roleSidebar.activeManage.transfer && <CustomChildNavLink title={t('menu.activeManage.transfer.name')} to={PATHS.activeManage.transfer}/>}
                          {roleSidebar.activeManage != null && roleSidebar.activeManage.revertCode && <CustomChildNavLink title={t('menu.activeManage.revertCode.name')} to={PATHS.activeManage.revertCode}/>}
                          {roleSidebar.activeManage != null && roleSidebar.activeManage.uploadCode && <CustomChildNavLink title={t('menu.activeManage.uploadCode.name')} to={PATHS.activeManage.uploadCode}/>}
                          {roleSidebar.activeManage != null && roleSidebar.activeManage.domain && <CustomChildNavLink title={t('menu.activeManage.domain.name')} to={PATHS.activeManage.domain}/>}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>}
              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Forms --> */}
              {roleSidebar.otherConvenient != null && <SidebarLinkGroup
                  activeCondition={
                    pathname === '/convenient' || pathname.includes('convenient')
                  }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <CustomParentNavLink title={t('menu.activeManage.name')} visible={pathname === '/convenient' || pathname.includes('convenient')} open={open} handleClick={handleClick}
                                           sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} icon={<FormsIcon/>}/>
                      <div
                        className={`overflow-hidden transition-all duration-800 ${
                          open ? 'max-h-[500px]' : 'max-h-0'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {roleSidebar.otherConvenient != null && roleSidebar.otherConvenient.consumerActive && <CustomChildNavLink title={t('menu.otherConvenient.consumerActive.name')} to={PATHS.otherConvenient.consumerActive}/>}
                          {roleSidebar.otherConvenient != null && roleSidebar.otherConvenient.cancelActive && <CustomChildNavLink title={t('menu.otherConvenient.cancelActive.name')} to={PATHS.otherConvenient.cancelActive}/>}
                          {roleSidebar.otherConvenient != null && roleSidebar.otherConvenient.assignSerial && <CustomChildNavLink title={t('menu.otherConvenient.assignSerial.name')} to={PATHS.otherConvenient.assignSerial}/>}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>}
              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Forms --> */}
              {roleSidebar.accountManage != null && <SidebarLinkGroup
                  activeCondition={
                    pathname === '/account' || pathname.includes('account')
                  }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <CustomParentNavLink title={t('menu.accountManage.name')} visible={pathname === '/account' || pathname.includes('account')} open={open} handleClick={handleClick}
                                           sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} icon={<FormsIcon/>}/>
                      <div
                        className={`overflow-hidden transition-all duration-800 ${
                          open ? 'max-h-[500px]' : 'max-h-0'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {roleSidebar.accountManage != null && roleSidebar.accountManage.users && <CustomChildNavLink title={t('menu.accountManage.users.name')} to={PATHS.accountManage.users}/>}
                          {roleSidebar.accountManage != null && roleSidebar.accountManage.staffList && <CustomChildNavLink title={t('menu.accountManage.staffList.name')} to={PATHS.accountManage.staffList}/>}
                          {roleSidebar.accountManage != null && roleSidebar.accountManage.profile && <CustomChildNavLink title={t('menu.accountManage.profile.name')} to={PATHS.accountManage.profile}/>}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>}
              {/* <!-- Menu Item Forms --> */}

            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              {t('menu.others')}
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              {roleSidebar.guild && <CustomNavLink title={t('menu.guild')} to={PATHS.guild} visible={pathname.includes('guild')} icon={<ChartIcon/>}/>}
              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Auth Pages --> */}
              {roleSidebar.authentication != null && <SidebarLinkGroup
                activeCondition={
                  pathname === '/auth' || pathname.includes('auth')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <CustomParentNavLink title={t('menu.authentication')} visible={pathname === '/auth' || pathname.includes('auth')} open={open} handleClick={handleClick}
                                           sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} icon={<AuthenticationIcon/>}/>
                      <div
                        className={`overflow-hidden transition-all duration-800 ${
                          open ? 'max-h-[500px]' : 'max-h-0'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {roleSidebar.authentication != null && roleSidebar.authentication.signin && <CustomChildNavLink title={t('menu.signin')} to={PATHS.auth.signIn}/>}
                          {roleSidebar.authentication != null && roleSidebar.authentication.signup && <CustomChildNavLink title={t('menu.signup')} to={PATHS.auth.signUp}/>}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>}
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
