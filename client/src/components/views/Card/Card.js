import React from 'react';
import { IMAGE_BASE_URL } from '../../Config';
import './Card.scss' 


const Card = ({page}) => {
  const title = page.title ? page.title : page.name
  return(
  <li className="card__imageContainer">
    <img className="card__image"
    src={`${IMAGE_BASE_URL}w500${page.poster_path}`}
    alt={title}
    />
    <span className="card__title">{title}</span>
  </li>

  )

}

export default Card;