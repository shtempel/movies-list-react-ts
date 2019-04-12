import React from 'react';

type ButtonType = 'button' | 'reset' | 'submit';

interface ButtonProps {
    className?: string;
    name?: string;
    onClick?: any;
    value?: string;
    type: ButtonType;
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
    return (
        <button { ...props } >
            { props.name }
        </button>
    );
};
