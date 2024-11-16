export type RoleSidebarVisibility = {
  dashboard: boolean;
  codeManage: {
    naviCode: boolean;
    assignNaviCode: boolean;
    importCode: boolean;
    activeRole: boolean;
  } | null;
  activeManage: {
    productList: boolean;
    agentList: boolean;
    productAssign: boolean;
    transfer: boolean;
    revertCode: boolean;
    uploadCode: boolean;
    domain: boolean;
  } | null;
  otherConvenient: {
    consumerActive: boolean;
    cancelActive: boolean;
    assignSerial: boolean;
  } | null;
  accountManage: {
    users: boolean;
    staffList: boolean;
    profile: boolean;
  } | null;
  authentication: {
    signin: boolean;
    signup: boolean;
  } | null;
  guild: boolean;
};

type RoleSidebarVisibilityMap = {
  ROLE_ADMIN: RoleSidebarVisibility;
  ROLE_COMPANY: RoleSidebarVisibility;
  ROLE_STAFF: RoleSidebarVisibility;
  ROLE_DAILY: RoleSidebarVisibility;
  ROLE_DAILY_2: RoleSidebarVisibility;
  ROLE_DAILY_3: RoleSidebarVisibility;
  ROLE_UP_TIN: RoleSidebarVisibility;
  ROLE_GUEST: RoleSidebarVisibility;
};

export const RoleSidebar : RoleSidebarVisibilityMap = {
  ROLE_ADMIN: {
    dashboard: true,
    codeManage: {
      naviCode: true,
      assignNaviCode: true,
      importCode: true,
      activeRole: true,
    },
    activeManage: {
      productList: false,
      agentList: false,
      productAssign: false,
      transfer: false,
      revertCode: false,
      uploadCode: true,
      domain: true,
    },
    otherConvenient: null,
    accountManage: {
      users: true,
      staffList: false,
      profile: true,
    },
    authentication: {
      signin: true,
      signup: false,
    },
    guild: false,
  },
  ROLE_COMPANY: {
    dashboard: true,
    codeManage: {
      naviCode: true,
      assignNaviCode: true,
      importCode: false,
      activeRole: true,
    },
    activeManage: {
      productList: true,
      agentList: false,
      productAssign: true,
      transfer: false,
      revertCode: true,
      uploadCode: false,
      domain: true,
    },
    otherConvenient: {
      consumerActive: true,
      cancelActive: false,
      assignSerial: true,
    },
    accountManage: {
      users: true,
      staffList: true,
      profile: false,
    },
    authentication: {
      signin: true,
      signup: false,
    },
    guild: false,
  },
  ROLE_STAFF: {
    dashboard: true,
    codeManage: {
      naviCode: true,
      assignNaviCode: true,
      importCode: false,
      activeRole: true,
    },
    activeManage: {
      productList: true,
      agentList: false,
      productAssign: true,
      transfer: false,
      revertCode: true,
      uploadCode: false,
      domain: true,
    },
    otherConvenient: {
      consumerActive: true,
      cancelActive: false,
      assignSerial: true,
    },
    accountManage: {
      users: true,
      staffList: true,
      profile: false,
    },
    authentication: {
      signin: true,
      signup: false,
    },
    guild: false,
  },
  ROLE_DAILY: {
    dashboard: true,
    codeManage: null,
    activeManage: {
      productList: true,
      agentList: false,
      productAssign: true,
      transfer: false,
      revertCode: true,
      uploadCode: false,
      domain: true,
    },
    otherConvenient: {
      consumerActive: true,
      cancelActive: false,
      assignSerial: true,
    },
    accountManage: null,
    authentication: {
      signin: true,
      signup: false,
    },
    guild: false,
  },
  ROLE_DAILY_2: {
    dashboard: true,
    codeManage: null,
    activeManage: {
      productList: true,
      agentList: false,
      productAssign: true,
      transfer: false,
      revertCode: true,
      uploadCode: false,
      domain: true,
    },
    otherConvenient: {
      consumerActive: true,
      cancelActive: false,
      assignSerial: true,
    },
    accountManage: null,
    authentication: {
      signin: true,
      signup: false,
    },
    guild: false,
  },
  ROLE_DAILY_3: {
    dashboard: true,
    codeManage: null,
    activeManage: {
      productList: true,
      agentList: false,
      productAssign: true,
      transfer: false,
      revertCode: true,
      uploadCode: false,
      domain: true,
    },
    otherConvenient: {
      consumerActive: true,
      cancelActive: false,
      assignSerial: true,
    },
    accountManage: null,
    authentication: {
      signin: true,
      signup: false,
    },
    guild: true,
  },
  ROLE_UP_TIN: {
    dashboard: true,
    codeManage: null,
    activeManage: null,
    otherConvenient: null,
    accountManage: {
      users: false,
      staffList: false,
      profile: false,
    },
    authentication: {
      signin: true,
      signup: false,
    },
    guild: true,
  },
  ROLE_GUEST: {
    dashboard: false,
    codeManage: null,
    activeManage: null,
    otherConvenient: null,
    accountManage: null,
    authentication: {
      signin: true,
      signup: false,
    },
    guild: false,
  },
};