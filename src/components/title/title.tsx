import React from 'react';

interface TitleProps {
    className: string;
    title: string;
}

export const Title = (props: TitleProps) => {
    return <span { ...props }>{ props.title }</span>;
};

