import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IMAGE_BASE_URL, API_URL, API_KEY } from '../../Config';
import './Card.scss' 


const Card = ({page, type}) => {
  const history = useHistory();
  // const [genreList, setGenreList] = useState([]);
  // useEffect(() => {
  //   // get genres
  //   const endpointGenres = `${API_URL}genre/${type}/list?api_key=${API_KEY}`;
  //   fetch(endpointGenres)
  //   .then((response) => response.json())
  //   .then((response) => {
  //     setGenreList(response.genres)
  //   });
  // }, [])
  // console.log("genre: ", genreList)

  const toMoviePage = () =>{
    // let endpointInfo1 = `${API_URL}movie/${page.id}?api_key=${API_KEY}`;
    // let endpointInfo2 = `${API_URL}tv/${page.id}?api_key=${API_KEY}`;
    history.push({
      pathname:`/contents/${page.id}`,
      state:{
        // page: page,
        type:type,
        id:page.id}
    })

    // const endpointInfoFetch1 = fetch(endpointInfo1)
    // .then((response) => response.json())
    // .then((response) => {
    //   console.log("endpointInfo1: ", response)
    // });

    // const endpointInfoFetch2 = fetch(endpointInfo2)
    // .then((response) => response.json())
    // .then((response) => {
    //   console.log("endpointInfo2: ", response)
    // });

  }

  const title = page.title ? page.title : page.name
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