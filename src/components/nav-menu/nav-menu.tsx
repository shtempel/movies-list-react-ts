import React, { FunctionComponent } from 'react';

import { Icon } from '..';

import './nav-menu.scss';

interface NavMenuProps {
    menuItems: string[];
}

export const NavMenu: FunctionComponent<NavMenuProps> = (props: NavMenuProps) => {


    return <div className='nav-menu'>
        {
            props.menuItems.map(menuItem => (
                <span className='link' key={ menuItem }>{ menuItem }<Icon icon='arrow-right' iconPrefix='fa'/></span>
            ))
        }
    </div>
};
