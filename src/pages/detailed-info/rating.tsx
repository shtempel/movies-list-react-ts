import React, { FC } from 'react';

import cn from 'classnames';
import { Icon } from '../../components';

interface RatingProps {
    voteAverage?: number;
    voteCount?: number;
    title?: string;
}

export const Rating: FC<RatingProps> = (props: RatingProps) => {
    const { voteAverage, voteCount, title } = props;

    const setPaddingForRating = (rating: any) => Number.isInteger(rating);

    return (
        <div className='rating-tagline'>
            <span className={ cn('rating',
                {
                    'integer-border ': setPaddingForRating(voteAverage),
                    'fractional-border': !setPaddingForRating(voteAverage)
                }) }>
            { voteAverage }
            </span>
            <Icon iconPrefix='fa'
                  title={ title }
                  icon='thumbs-up'/>
            <span>{ voteCount }</span>
        </div>
    );
};
