import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import SiteSearch from 'lib/components/SiteSearch';
import UserMenu from './UserMenu';

function NavBar(): React.ReactElement {
  return (
    <nav className="navbar flex justify-between" role="navigation" aria-label="main navigation">
      <div className="w-1/4">
        <SearchIcon className="mr-4 text-blue-500" /> SimpleTrack
      </div>
      <div className="flex-grow">
        <SiteSearch />
      </div>
      <div className="w-1/4">
        { /* todo: notifications */ }
        <UserMenu />
      </div>
    </nav>
  );
}

export default NavBar;
