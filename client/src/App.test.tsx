import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from './App';

function makeHistory(initialEntries = [ '/' ]) {
  return createMemoryHistory({ initialEntries });
}

interface RenderParams {
  history?: MemoryHistory;
}

function renderApp({ history = makeHistory() }: RenderParams = {}) {
  return render(
    <Router history={history}>
      <App />
    </Router>,
  );
}

describe('App', () => {
  it.each([
    [ 'Login', '/', '.login-page' ],
    [ 'Dashboard', '/dashboard', '.dashboard-page' ],
  ])('should render the %s page when route is "%s"', (name, path, selector) => {
    const history = makeHistory([ path ]);
    const { container } = renderApp({ history });

    expect(container.querySelector(selector)).toBeInTheDocument();
  });
});
