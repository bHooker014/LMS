import React from 'react';

const StarRating = ({rating}) => {
let newRating = rating/2;

const stars =[];
    for (let i =1; i <= 5; i++) {
        if (i <= newRating) {
            stars.push(<i key={i} className='stars-yo fas fa-star'></i>)
        } else if (i === Math.ceil(newRating) && !Number.isInteger(newRating)){
            stars.push(<i key={i} className='stars-yo fas fa-star-half-alt'></i>)
        } else {
            stars.push(<i key={i} className='stars-yo far fa-star'></i>)
        }
    }

    return (
        <>
        {stars}
        </>
    );

};

export default StarRating;