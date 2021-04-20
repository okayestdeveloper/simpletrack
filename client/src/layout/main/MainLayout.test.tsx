import { render, cleanup } from '@testing-library/react';
import MainLayout from './MainLayout';

function renderMainLayout() {
  return render(<MainLayout><div>child</div></MainLayout>);
}

describe('MainLayout', () => {
  afterEach(cleanup);

  it('should render the NavBar', () => {
    const { container } = renderMainLayout();
    expect(container.querySelector('.navbar')).toBeInTheDocument();
  });

  it('should render the given children', () => {
    const { getByText } = renderMainLayout();
    expect(getByText('child')).toBeInTheDocument();
  });
});
