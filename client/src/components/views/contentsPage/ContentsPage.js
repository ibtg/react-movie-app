import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY } from '../../Config';
import ContentsInfo from './ContentsInfo'
import './ContentsPage.scss';
import {useLocation} from 'react-router-dom';
import Display from '../DisplayPage/Display'


const ContentsPage = () => {
  const [contents, setContents] = useState([]);
  const [casts, setCasts] = useState([]);
  const [director, setDirector] = useState('');
  const [recommendations, setRecommendations] = useState([])
  const contentsId = useLocation().state.id
  

  useEffect(() => {
    
    // get contents
    let endpointInfo = `${API_URL}movie/${contentsId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
    .then((response) => response.json())
    .then((response) => {
      setContents(response);
    });

    // get casts and director
    const endpointCrew = `${API_URL}movie/${contentsId}/credits?api_key=${API_KEY}`;
    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        response.cast ? setCasts(response.cast) : setCasts('UNDEFINED');
        response.crew.length === 0
          ? setDirector('UNDEFINED')
          : setDirector(response.crew[0].name);
      });

    // get recommendations
    const recommendationContens = `${API_URL}movie/${contentsId}/recommendations?api_key=${API_KEY}`;
    fetch(recommendationContens)
      .then((response) => response.json())
      .then((response) => {
        setRecommendations(response)
      });

  }, [contentsId]);


  return (
    <div className="contentPage__container">
      <ContentsInfo
        adult={contents.adult}
        backdrop_path={contents.backdrop_path}
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
        id={contentsId}
        poster_path={contents.poster_path}
      >
      </ContentsInfo>
      <div className="contentPage__recommendationContainer">
      { recommendations.results && recommendations.results.length !==0 ?
      <Display 
      pages={recommendations.results} 
      title="RECOMMENDATIONS"
      url={`movie/${contentsId}/recommendations`}
      ></Display> :
      <div className="contentPage__recommendationNone">
        NO RECOMMENDATIONS RESULTS
        </div>
      }
      
      </div>
    </div>

  );
}

export default ContentsPage;

