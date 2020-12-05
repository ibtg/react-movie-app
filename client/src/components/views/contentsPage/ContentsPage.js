import React, { useEffect, useState,useRef } from 'react';
import {  IMAGE_BASE_URL, API_URL, API_KEY } from '../../Config';
import ContentsInfo from './ContentsInfo'
import Like from './Like';
import './ContentsPage.scss';
import {useLocation} from 'react-router-dom';
import Card from '../Card/Card';
import Display from '../DisplayPage/Display'


const ContentsPage = () => {
  const [contents, setContents] = useState([]);
  const [casts, setCasts] = useState([]);
  const [director, setDirector] = useState('');
  const [recommendations, setRecommendations] = useState([])

  const contentsType = useLocation().state.type
  // const contentsPage = useLocation().state.page
  // const contentsGenreList = useLocation().state.genreList
  const contentsId = useLocation().state.id
  

  useEffect(() => {
    // get contents
    let endpointInfo = `${API_URL}${contentsType}/${contentsId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
    .then((response) => response.json())
    .then((response) => {
      setContents(response);
    });

    // get casts and director
    const endpointCrew = `${API_URL}${contentsType}/${contentsId}/credits?api_key=${API_KEY}`;
    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        response.cast ? setCasts(response.cast) : setCasts('UNDEFINED');
        response.crew.length === 0
          ? setDirector('UNDEFINED')
          : setDirector(response.crew[0].name);
      });

    // get recommendations
    const recommendationContens = `${API_URL}${contentsType}/${contentsId}/recommendations?api_key=${API_KEY}`;
    fetch(recommendationContens)
      .then((response) => response.json())
      .then((response) => {
        setRecommendations(response)
      });

  }, []);


  // show movie info, recommendation
  return (
    <div className="contentPage__container">
      <ContentsInfo
        adult={contents.adult}
        backdrop={`${IMAGE_BASE_URL}w780${contents.backdrop_path}`}
        genres={contents.genres}
        original_language={contents.original_language}
        overview={contents.overview}
        popularity={contents.popularity}
        release_date={contents.release_date}
        runtime={contents.runtime}
        title={contents.title}
        vote_average={contents.vote_average}
        casts={casts}
        director={director}
      >
      </ContentsInfo>
      <div className="contentPage__recommendationContainer">
      { recommendations.length !== 0 &&
      <Display 
      pages={recommendations.results} 
      title="RECOMMENDATIONS"
      ></Display>}
      </div>
    </div>

  );
}

// 아래에 recommendation보여줄 것
export default ContentsPage;

// {Movie.length !== 0 && <MovieInfo movieInfo={Movie}></MovieInfo>}
// {Casts.length !== 0 && (
//   <MovieActor castInfo={Casts} directorInfo={Director}></MovieActor>
// )}

      {/* <img 
      className="contentPage__image"
      src={`${IMAGE_BASE_URL}original${contentsPage.backdrop_path}`} 
      alt="background image"/>
      <Like
        movieInfo={Movie}
        // movieId={movieId}
        userFrom={localStorage.getItem('userId')}
      ></Like> */}

            
      // <div className="recommendations__container">
      //   {recommendations.length !==0 &&       
      //   <ul className="recommendations__item" >
      //     {recommendations.map((page) => (
      //     <Card page={page} key={page.id} type={contentsType}></Card>))} 
      //   </ul>}

      // </div>