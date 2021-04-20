import { MemoryHistory, createMemoryHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';

import AppRoute from './AppRoute';
import { isLoggedIn as _isLoggedIn } from 'lib/services/authentication/authentication';
import mockLocation from 'lib/testing/location.mock';

jest.mock('lib/services/authentication/authentication', () => ({
  isLoggedIn: jest.fn(),
}));
const isLoggedIn = _isLoggedIn as jest.Mock;
isLoggedIn.mockReturnValue(true);

interface RenderParams {
  history?: MemoryHistory;
}

function renderAppRoute({
  history = createMemoryHistory({ initialEntries: [ '/' ] }),
}: RenderParams = {}) {
  function renderProp() {
    return <div>render prop</div>;
  }

  return {
    ...render(
      <Router history={history}>
        <Switch>
          <AppRoute title="Home" path="/" layout="main" exact>
            <p>Home</p>
          </AppRoute>
          <AppRoute title="Dashboard" path="/dashboard" layout="main">
            <div>Dashboard</div>
          </AppRoute>
          <AppRoute title="Render Prop" path="/render-prop" layout="main" render={renderProp} />
        </Switch>
      </Router>,
    ),
    history,
  };
}

describe('AppRoute', () => {
  let resetLoc: Function;
  let replace: jest.Mock;

  beforeEach(() => {
    replace = jest.fn();
    resetLoc = mockLocation({ replace });
    isLoggedIn.mockReturnValue(true);
  });

  afterEach(() => {
    resetLoc();
    cleanup();
    isLoggedIn.mockClear();
  });

  it('should render whatever component is a child', () => {
    const { getByText } = renderAppRoute();
    expect(getByText('Home')).toBeInTheDocument();
  });

  it('should render the target page on navigation', async () => {
    const history = createMemoryHistory({ initialEntries: [ '/dashboard' ] });
    const { getByText } = renderAppRoute({ history });
    expect(getByText('Dashboard')).toBeInTheDocument();
  });

  it('should allow a render prop to render the page', () => {
    const history = createMemoryHistory({ initialEntries: [ '/render-prop' ] });
    const { getByText } = renderAppRoute({ history });
    expect(getByText('render prop')).toBeInTheDocument();
  });

  it('should redirect to a login url if not logged in on mount', () => {
    isLoggedIn.mockReturnValue(false);
    const { queryByText } = renderAppRoute();

    expect(queryByText('Home')).not.toBeInTheDocument();
    expect(replace).toHaveBeenCalledWith(process.env.BL_APP_LOGIN_URL);
  });

  it('should render pages with "main" as layout with MainLayout', () => {
    const { history, container } = renderAppRoute();
    history.push('/dashboard');

    const el = container.querySelector('.main-layout');
    expect(el).toBeInTheDocument();
  });
});
