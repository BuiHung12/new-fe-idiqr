import {BASE_PATH_NGINX} from "../constant/constant.ts";

const basePath = process.env.MODE === 'production' ? BASE_PATH_NGINX : '';

export const PATHS = {
  calendar: `${basePath}/calendar`,
  profile: `${basePath}/profile`,
  forms: {
    elements: `${basePath}/forms/form-elements`,
    layout: `${basePath}/forms/form-layout`,
  },
  tables: `${basePath}/tables`,
  settings: `${basePath}/settings`,
  chart: `${basePath}/chart`,
  ui: {
    alerts: `${basePath}/ui/alerts`,
    buttons: `${basePath}/ui/buttons`,
  },
  auth: {
    signIn: `${basePath}/auth/signin`,
    signUp: `${basePath}/auth/signup`,
  },
  users: `${basePath}/users`,
};
