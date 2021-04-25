import React from 'react';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import SiteSearch from 'lib/components/SiteSearch';
import UserMenu from './UserMenu';

function NavBar(): React.ReactElement {
  return (
    <nav className="navbar is-fixed-top shadow-md" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          {/* todo: link to home page */}
          <div className="w-8"><LocationMarkerIcon className="text-blue-700" /></div>
          <h1>SimpleTrack</h1>
        </div>

        <button
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start flex-grow">
          <div className="navbar-item w-1/3">
            <SiteSearch />
          </div>
        </div>
        <div className="navbar-end">
          { /* todo: notifications */ }
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
