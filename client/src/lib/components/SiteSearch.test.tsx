import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';

import SiteSearch from './SiteSearch';

function renderSiteSearch() {
  return render(<SiteSearch />);
}

describe('SiteSearch', () => {
  afterEach(cleanup);

  // todo: I haven't really defined what site search should do, so this is a placeholder.

  it('should search all the things and show results', () => {
    const { container } = renderSiteSearch();
    const input = container.querySelector('.site-search input') as HTMLInputElement;
    const btn = container.querySelector('.site-search button') as HTMLButtonElement;

    userEvent.paste(input, 'keg');
    userEvent.click(btn);

    expect(false).toEqual(true);
  });
});
