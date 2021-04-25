import React from 'react';
import { Menu } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import Divider from 'lib/components/Divider';

function UserMenu(): React.ReactElement {
  function activeClass(isActive: boolean) {
    return isActive ? 'bg-blue-400' : '';
  }

  function menuItem(text: string, path: string) {
    return (
      <Menu.Item>
        {({ active }: {active:boolean;}) => (
          <Link to={path} className={`${activeClass(active)} navbar-item`}>{text}</Link>
        )}
      </Menu.Item>
    );
  }

  // todo: maybe add a Transition? https://headlessui.dev/react/menu#transitions
  return (
    <Menu as="div" className="navbar-item has-dropdown is-hoverable navbar-user-menu">
      <Menu.Button as="a" aria-label="User account menu" className="navbar-link">
        <div className="w-8"><UserCircleIcon className="text-gray-500" /></div>
      </Menu.Button>
      <Menu.Items as="div" className="navbar-dropdown is-right">
        {menuItem('Profile', '/profile')}
        {menuItem('Company Details', '/account')}
        <Divider />
        {menuItem('Logout', '/logout')}
      </Menu.Items>
    </Menu>
  );
}

export default UserMenu;
