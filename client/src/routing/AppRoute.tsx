import React, { useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';

import { isLoggedIn } from 'lib/services/authentication/authentication';
import MainLayout from 'layout/main/MainLayout';
import { assertIsDefined } from 'lib/services/asserts';

interface AppRouteProps extends RouteProps {
  title: string;
  path: string;
  authRequired?: boolean; // default true
  layout?: 'main'; // if layout isn't specified, assume 'main'
}

function AppRoute({
  children,
  path,
  exact = false,
  title,
  authRequired = true,
  layout = 'main',
  ...rest
}: AppRouteProps): React.ReactElement {
  const history = useHistory();
  const loginUrl = process.env.BL_APP_LOGIN_URL;
  assertIsDefined(loginUrl);

  useEffect(() => {
    if (authRequired) {
      if (!isLoggedIn()) {
        window.location.replace(loginUrl);
      }
    }
  }, [ loginUrl, history, authRequired ]);

  function renderChildren() {
    return <MainLayout>{children}</MainLayout>;
  }

  function protectedRender(): React.ReactElement {
    if (!isLoggedIn()) {
      return <div />;
    }

    if (!!children) {
      return (
        <Route
          path={path}
          exact={exact}
          {...rest}
          render={renderChildren}
        />
      );
    }

    return (<Route path={path} exact={exact} {...rest} />);
  }

  return protectedRender();
}

export default AppRoute;
