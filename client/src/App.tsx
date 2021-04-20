import { Switch } from 'react-router';

import AppRoute from 'routing/AppRoute';

function App() {
  return (
    <Switch>
      <AppRoute path="/" title="Login" authRequired={false} exact>
        <div className="login-page">
          <h1 className="title">Login</h1>
          <p>todo:</p>
        </div>
      </AppRoute>
      <AppRoute path="/dashboard" title="Dashboard" authRequired={false}>
        <div className="dashboard-page">
          <h1 className="title">Dashboard</h1>
          <p>todo:</p>
        </div>
      </AppRoute>
    </Switch>
  );
}

export default App;
