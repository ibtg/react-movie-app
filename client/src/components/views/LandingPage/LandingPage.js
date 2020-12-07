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
  const [upcomingMovie, setupcomingMovie] = useState([])
  

  useEffect(() => {
    // TRENDING
    const trendingUrl = `${API_URL}trending/movie/day?api_key=${API_KEY}`
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

    // MOVIE - UP COMING
    const upcomingMovieVUrl = `${API_URL}movie/upcoming?api_key=${API_KEY}`
    fetchPages(upcomingMovieVUrl).then((response) => {
      setupcomingMovie(response.results)
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
      pages={upcomingMovie} 
      title="UP COMING MOVIES"
      ></Display>
      
    </div>
  );
}

export default withRouter(LandingPage);