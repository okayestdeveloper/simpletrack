import React from 'react';
import { Menu } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import Divider from 'lib/components/Divider';

function UserMenu(): React.ReactElement {
  function activeClass(isActive: boolean) {
    return isActive ? 'bg-blue-500' : '';
  }

  function menuItem(text: string, path: string) {
    return (
      <Menu.Item>
        {({ active }: {active: boolean;}) => (
          <Link to={path} className={activeClass(active)}>{text}</Link>
        )}
      </Menu.Item>
    );
  }

  // todo: maybe add a Transition? https://headlessui.dev/react/menu#transitions
  return (
    <div className="user-menu w-full flex justify-end">
      <Menu>
        <Menu.Button aria-label="User account menu"><UserCircleIcon /></Menu.Button>
        <Menu.Items>
          {menuItem('Profile', '/profile')}
          {menuItem('Company Details', '/account')}
          <Divider />
          {menuItem('Logout', '/logout')}
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default UserMenu;
