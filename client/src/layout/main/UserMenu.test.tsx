import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

import UserMenu from './UserMenu';

function makeHistory(initialEntries = [ '/' ]) {
  return createMemoryHistory({ initialEntries });
}

interface RenderParams {
  history?: MemoryHistory;
}

function renderUserMenu({
  history = makeHistory(),
}: RenderParams = {}) {
  return render(
    <Router history={history}>
      <UserMenu />
    </Router>,
  );
}

describe('UserMenu', () => {
  afterEach(cleanup);

  it('should render a menu with profile, company settings, and logout', () => {
    const { container, getByText } = renderUserMenu();
    const btn = container.querySelector('button') as HTMLButtonElement;

    userEvent.click(btn);

    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('Company Details')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it.each([
    ['/profile', 'Profile'],
    ['/account', 'Company Details'],
    ['/logout', 'Logout']
  ])('should go to %s page when %s is clicked', (url, name) => {
    const history = makeHistory();
    history.push = jest.fn();
    history.replace = jest.fn();
    const { container, getByText } = renderUserMenu({ history });
    const btn = container.querySelector('button') as HTMLButtonElement;
    userEvent.click(btn);
    const link = getByText(name) as HTMLAnchorElement;

    userEvent.click(link);

    expect(history.push).toHaveBeenCalledWith(url);
  });
});
