import React from 'react';

import NavBar from './NavBar';

function MainLayout({ children }: React.PropsWithChildren<React.ReactNode | React.ReactNodeArray>) {
  // todo: probably want to add a container comp that scales responsively and wrap the children in that.
  return (
    <div className="main-layout min-h-full">
      <NavBar />
      <div className="flex">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
