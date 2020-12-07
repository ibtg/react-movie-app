import React from 'react';
import { useHistory } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../Config';
import './Card.scss' 


const Card = ({page}) => {
  const history = useHistory();

  const toMoviePage = () =>{
    history.push({
      pathname:`/contents/${page.id}`,
      state:{
        id:page.id}
    })

  }

  return(
  <li className="card__imageContainer">
    {page.poster_path !== null ? 
    <img className="card__image"
      onClick={toMoviePage}
      src={`${IMAGE_BASE_URL}w500${page.poster_path}`}
      alt={page.title}
    /> :
    <div className="card__no" >No Image</div>
      }

    
    <span className="card__title">{page.title}</span>
  </li>

  )

}

export default Card;