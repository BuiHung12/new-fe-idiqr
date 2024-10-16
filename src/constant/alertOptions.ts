import {useTranslation} from "react-i18next";
import {iNotification} from "react-notifications-component";

export const alertOption = () => {

  const { t } = useTranslation();

  const notifications: Record<string, iNotification> = {
    loginSuccess: {
      title: t("signInPage.optionAlert.loginSuccessAlerts.title"),
      message: t("signInPage.optionAlert.loginSuccessAlerts.message"),
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    },
    loginError: {
      title: t("signInPage.optionAlert.loginErrorAlerts.title"),
      message: t("signInPage.optionAlert.loginErrorAlerts.message"),
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 10000,
        onScreen: true,
        showIcon: true,
      },
    },
    signupSuccess: {
      title: t("signInPage.optionAlert.signupSuccessAlerts.title"),
      message: t("signInPage.optionAlert.signupSuccessAlerts.message"),
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    },
    signupError1: {
      title: t("signInPage.optionAlert.signupErrorAlerts1.title"),
      message: t("signInPage.optionAlert.signupErrorAlerts1.message"),
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 10000,
        onScreen: true,
        showIcon: true,
      },
    },
    signupError2: {
      title: t("signInPage.optionAlert.signupErrorAlerts2.title"),
      message: t("signInPage.optionAlert.signupErrorAlerts2.message"),
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 10000,
        onScreen: true,
        showIcon: true,
      },
    },
    error: {
      title: t("signInPage.optionAlert.errorAlerts.title"),
      message: t("signInPage.optionAlert.errorAlerts.message"),
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    },
    createUserSuccess: {
      title: t("userPage.optionAlert.createSuccess.title"),
      message: t("userPage.optionAlert.createSuccess.message"),
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    },
    createUserError: {
      title: t("userPage.optionAlert.userExist.title"),
      message: t("userPage.optionAlert.userExist.message"),
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
        showIcon: true,
      },
    },
    updateUserSuccess: {
      title: t("userPage.optionAlert.updateSuccess.title"),
      message: t("userPage.optionAlert.updateSuccess.message"),
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    },
    deleteSuccess: {
      title: t("userPage.optionAlert.deleteSuccess.title"),
      message: t("userPage.optionAlert.deleteSuccess.message"),
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    },
  };

  return {notifications}
}
