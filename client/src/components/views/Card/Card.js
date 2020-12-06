import React from 'react';
import { useHistory } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../Config';
import './Card.scss' 


const Card = ({page, type}) => {
  const history = useHistory();

  const toMoviePage = () =>{
    history.push({
      pathname:`/contents/${page.id}`,
      state:{
        type:type,
        id:page.id}
    })

  }

  const title = page.title ? page.title : page.name
  // console.log("page: ", page)
  return(
  <li className="card__imageContainer">
    <img className="card__image"
      onClick={toMoviePage}
      src={`${IMAGE_BASE_URL}w500${page.poster_path}`}
      alt={title}
    />
    <span className="card__title">{title}</span>
  </li>

  )

}

export default Card;