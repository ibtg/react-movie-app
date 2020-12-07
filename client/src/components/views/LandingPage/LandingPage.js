import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY,IMAGE_BASE_URL } from '../../Config';
import './LandingPage.scss';
import Display from '../DisplayPage/Display'
import { MdKeyboardArrowDown } from 'react-icons/md';
import ContentsInfo from '../contentsPage/ContentsInfo'

function LandingPage(props) {
  const [movieObj, setMovieObj] = useState({})
  useEffect(() => {

      const fetchData = async () => {
      const trendingUrl = `${API_URL}trending/movie/day?api_key=${API_KEY}`
      const popularMovieUrl = `${API_URL}movie/popular?api_key=${API_KEY}`
      const topRatedMovieUrl = `${API_URL}movie/top_rated?api_key=${API_KEY}`
      const nowPlayingMovieUrl = `${API_URL}movie/now_playing?api_key=${API_KEY}`
      const upcomingMovieUrl = `${API_URL}movie/upcoming?api_key=${API_KEY}`

      await Promise.all([
        fetchPages(trendingUrl),
        fetchPages(popularMovieUrl),
        fetchPages(topRatedMovieUrl),
        fetchPages(nowPlayingMovieUrl),
        fetchPages(upcomingMovieUrl)])
        .then(([trending, popular, top, nowpaying, upcoming])=>{
          setMovieObj({
          'TRENDING': trending.results, 
          'POPULAR MOVIES': popular.results,
          'TOP RATED MOVIES':top.results,
          "NOW PLAYING MOVIES":nowpaying.results,
          "UP COMING MOVIES":upcoming.results
        })})
    }
    fetchData()

  }, []);

  console.log("trending: ", movieObj.TRENDING&& movieObj.TRENDING[0])
  // console.log("trending: ", Object.keys(movieObj))
  // console.log("trending: ", trending)

  // const loadMoreItems = () => {
  //   const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&languate=en-US&page=${CurrentPage}`;
  //   fetchPages(endpoint).then((response) => {
  //     setMovies([...Movies, ...response.results]);
  //     setCurrentPage(response.page + 1);
  //   });
  // };

  const fetchPages = async (endpoint) => {
    const response = await fetch(endpoint).then((response) => response.json());
    return response;
  };

  return (
    <>
      {movieObj.TRENDING && 
      <div className="landingPage__imageContainer">
        <div className="landingPage__info">
          <h1 className="landingPage__trending">TRENDING MOVIE</h1>
          <h2 className="landingPage__title">{movieObj.TRENDING[0].title}</h2>
          <p className="landingPage__overview">{movieObj.TRENDING[0].overview}</p>
        </div>

        <img
        className="landingPage__image"
        src={`${IMAGE_BASE_URL}w1280${movieObj.TRENDING[0].backdrop_path}` }
        />
        </div>
      }
      <div className="container">
      {
      Object.keys(movieObj).length !==0 && 
      Object.keys(movieObj).map((category, index) =>(
        <Display
        key={index}
        pages={movieObj[category]}
        title={category}
        ></Display>
        ))
        }
      </div>
    </>

 

    );
}

export default withRouter(LandingPage);