import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { Icon } from '../../components';

interface RatingProps {
    voteAverage?: number;
    voteCount?: number;
    title?: string;
}

export const Rating: FunctionComponent<RatingProps> = (props: RatingProps) => {
    const { voteAverage, voteCount, title } = props;

    const setPaddingForRating = (rating: any) => {
        return Number.isInteger(rating);
    };

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
