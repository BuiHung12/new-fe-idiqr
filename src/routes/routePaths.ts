import {BASE_PATH_NGINX} from "../constant/constant.ts";

const basePath = process.env.MODE === 'production' ? BASE_PATH_NGINX : '';

export const PATHS = {
  codeManage: {
    naviCode: `${basePath}/code-manager/navi-code`,
    assignNaviCode: `${basePath}/code-manager/assign-navi-code`,
    importCode: `${basePath}/code-manager/import-code`,
    activeRole: `${basePath}/code-manager/active-role`,
  },
  activeManage: {
    productList: `${basePath}/active-manager/products`,
    agentList: `${basePath}/active-manager/agents`,
    productAssign: `${basePath}/active-manager/product-assign`,
    transfer: `${basePath}/active-manager/transfer`,
    revertCode: `${basePath}/active-manager/revert-code`,
    uploadCode: `${basePath}/active-manager/upload-code`,
    domain: `${basePath}/active-manager/domain`,
  },
  otherConvenient: {
    consumerActive: `${basePath}/convenient/consumer-active`,
    cancelActive: `${basePath}/convenient/cancel-active`,
    assignSerial: `${basePath}/convenient/assign-serial`,
  },
  accountManage: {
    users: `${basePath}/account/users`,
    staffList: `${basePath}/account/staffs`,
    profile: `${basePath}/account/profile`,
  },
  auth: {
    signIn: `${basePath}/auth/signin`,
    signUp: `${basePath}/auth/signup`,
  },
  guild: `${basePath}/guild`
};
