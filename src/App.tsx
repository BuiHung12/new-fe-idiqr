import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';

import Loader from './common/Loader';
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import DefaultLayout from './layout/DefaultLayout';
import {useLanguage} from "./locales/useLanguage.ts";
import {AppRouter} from "./routes/AppRouter.tsx";
import {ConfigProvider} from "antd";
import { ReactNotifications } from 'react-notifications-component'

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { language } = useLanguage();
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <div>
      <ReactNotifications />
      <DefaultLayout>
        <ConfigProvider locale={language === 'en' ? enUS : viVN}>
          <AppRouter/>
        </ConfigProvider>
      </DefaultLayout>
    </div>
  );
}

export default App;
