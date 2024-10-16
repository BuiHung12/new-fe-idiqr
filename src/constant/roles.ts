export type RoleSidebarVisibility = {
  dashboard: {
    eCommerce: boolean;
  } | null;
  calendar: boolean;
  profile: boolean;
  forms: {
    formElements: boolean;
    formLayout: boolean;
  } | null;
  tables: boolean;
  settings: boolean;
  chart: boolean;
  uiElements: {
    alerts: boolean;
    buttons: boolean;
  } | null;
  authentication: {
    signin: boolean;
    signup: boolean;
  } | null;
  users: boolean;
};

type RoleSidebarVisibilityMap = {
  ADMIN: RoleSidebarVisibility;
  USER: RoleSidebarVisibility;
  GUEST: RoleSidebarVisibility;
};

export const RoleSidebar : RoleSidebarVisibilityMap = {
  ADMIN: {
    dashboard: {
      eCommerce: true,
    },
    calendar: true,
    profile: true,
    forms: {
      formElements: true,
      formLayout: true,
    },
    tables: true,
    settings: true,
    chart: true,
    uiElements: {
      alerts: true,
      buttons: true,
    },
    authentication: {
      signin: false,
      signup: true,
    },
    users: true
  },
  USER: {
    dashboard: {
      eCommerce: true,
    },
    calendar: true,
    profile: true,
    forms: {
      formElements: false,
      formLayout: true,
    },
    tables: false,
    settings: false,
    chart: false,
    uiElements: {
      alerts: true,
      buttons: false,
    },
    authentication: {
      signin: false,
      signup: true,
    },
    users: false,
  },
  GUEST: {
    dashboard: null,
    calendar: true,
    profile: false,
    forms: null,
    tables: false,
    settings: false,
    chart: false,
    uiElements: null,
    authentication: {
      signin: true,
      signup: true,
    },
    users: false
  },
};