import React from 'react';
import { IconName } from '@fortawesome/fontawesome-common-types';

export type IconPrefix = | 'fa' | 'fas' | 'far';

interface IconProps {
    className?: string;
    id?: string;
    title?: string;
    icon: IconName;
    iconPrefix: IconPrefix;
    onIconClick?: any;
}

export const Icon = (props: IconProps) => {
    return (
        <i className={ `${ props.className }  ${ props.iconPrefix } fa-${ props.icon }` }
           title={props.title}
           id={ props.id }
           onClick={ props.onIconClick }/>
    );
};