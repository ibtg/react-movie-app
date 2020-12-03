import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY } from '../../Config';
import './LandingPage.scss';
import Display from '../DisplayPage/Display'
import { MdKeyboardArrowDown } from 'react-icons/md';

function LandingPage(props) {
  const [trending, setTrending] = useState([])
  const [popularMovie, setPopularMovie] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
  const [popularTV, setPopularTV] = useState([])
  const [topRatedTV, setTopRatedTV] = useState([])
  

  useEffect(() => {
    // TRENDING
    const trendingUrl = `${API_URL}trending/all/day?api_key=${API_KEY}`
    fetchPages(trendingUrl).then((response) => {
      setTrending(response.results)
    })

    // MOVIE - POPULAR
    const popularMovieUrl = `${API_URL}movie/popular?api_key=${API_KEY}`
    fetchPages(popularMovieUrl).then((response) => {
      setPopularMovie(response.results)
    })

    // MOVIE - TOP RATED
    const topRatedMovieUrl = `${API_URL}movie/top_rated?api_key=${API_KEY}`
    fetchPages(topRatedMovieUrl).then((response) => {
      setTopRatedMovie(response.results)
    })

    // MOVIE - NOW PLAYING
    const nowPlayingMovieUrl = `${API_URL}movie/now_playing?api_key=${API_KEY}`
    fetchPages(nowPlayingMovieUrl).then((response) => {
      setNowPlayingMovie(response.results)
    })

    // TV - POPULAR
    const popularTVUrl = `${API_URL}tv/popular?api_key=${API_KEY}`
    fetchPages(popularTVUrl).then((response) => {
      setPopularTV(response.results)
    })

    // TOP RATED
    const topRatedTVUrl = `${API_URL}tv/top_rated?api_key=${API_KEY}`
    fetchPages(topRatedTVUrl).then((response) => {
      setTopRatedTV(response.results)
    })

  }, []);

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
    <div className="container">
      <Display 
      pages={trending} 
      title="TRENDING"
      ></Display>

      <Display 
      pages={popularMovie} 
      title="POPULAR MOVIES"
      ></Display>

      <Display 
      pages={topRatedMovie} 
      title="TOP RATED MOVIES"
      ></Display>
      
      <Display 
      pages={nowPlayingMovie} 
      title="NOW PLAYING MOVIES"
      ></Display>
      
      <Display 
      pages={popularTV} 
      title="POPULAR TV SERIES"
      ></Display>
      
      <Display 
      pages={topRatedTV} 
      title="TOP RAETED TV SERIES"
      ></Display>
    </div>
  );
}

export default withRouter(LandingPage);
// popularMovie={popularMovie} 
// topRatedMovie={topRatedMovie}
// nowPlayingMovie={nowPlayingMovie}
// popularTV={popularTV}
// topRatedTV={topRatedTV}


// {Movies.length !== 0 && <Grid movies={Movies}></Grid>}
// <div className="movie__buttonContainer">
//   <button className="movie__button" onClick={loadMoreItems}>
//     <MdKeyboardArrowDown
//       style={{ width: '100%', height: '40px' }}
//     ></MdKeyboardArrowDown>
//   </button>
// </div>