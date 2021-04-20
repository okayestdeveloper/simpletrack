import { render, cleanup } from '@testing-library/react';
import NavBar from './NavBar';

function renderNavBar() {
  return render(<NavBar />);
}

describe('NavBar', () => {
  afterEach(cleanup);

  it('should render a navbar with brand name, search, and user menu', () => {
    const { container } = renderNavBar();
    expect(container.querySelector('.navbar')).toBeInTheDocument();
    expect(container.querySelector('.site-search')).toBeInTheDocument();
    expect(container.querySelector('.user-menu')).toBeInTheDocument();
  });
});
