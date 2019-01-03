import React from 'react';

interface ButtonProps {
    className?: string;
    name?: string;
    onClick?: any;
    value?: string;
    type: string;
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
    return (
        <button { ...props }>
            { props.name }
        </button>
    );
};
