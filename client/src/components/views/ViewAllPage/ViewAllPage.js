import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL, API_KEY } from '../../Config';
import Card from '../Card/Card'
import './ViewAllPage.scss';


const ShowAllPage = (props) => {

  const [fetching, setFetching] = useState(false)
  const [movies, setMovies] = useState([])
  const [pageNumber, setPageNumber] = useState(4)
  const url = useLocation().state.url
  const title = useLocation().state.title


  useEffect(() => {
    const endpoint1 = `${API_URL}${url}?api_key=${API_KEY}&languate=en-US&page=1`;
    const endpoint2 = `${API_URL}${url}?api_key=${API_KEY}&languate=en-US&page=2`;
    const endpoint3 = `${API_URL}${url}?api_key=${API_KEY}&languate=en-US&page=3`;

    console.log("endpoint: ", endpoint1)

    Promise.all([
      fetch(endpoint1),
      fetch(endpoint2),
      fetch(endpoint3)])
      .then(([endpoint1, endpoint2, endpoint3 ]) => Promise.all([endpoint1.json(), endpoint2.json(), endpoint3.json()]))
      .then(([data1, data2, data3]) =>{
        setMovies([...movies, ...data1.results, ...data2.results, ...data3.results])
      })



  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    
  })


  const fetchPages = async (endpoint) => {
    setFetching(true)
    await fetch(endpoint)
    .then((response) => response.json())
    .then((response)=>{
      setMovies([...movies, ...response.results])
    })
    setFetching(false)
    
  };


  const handleScroll = () =>{
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if((scrollTop + clientHeight + 100)>= scrollHeight && fetching === false){
      setPageNumber(pageNumber+1)
      const endpoint = `${API_URL}${url}?api_key=${API_KEY}&languate=en-US&page=${pageNumber}`;
      fetchPages(endpoint)
      console.log("handleScroll")
    }

    
  }

  return(
    <section className="allPage__container">
    <h2 className="allPage__title">{title}</h2>
    <ul className="allPage__lists">
      {movies.map((movie) => (
        <Card page={movie} key={movie.id}></Card>
        
        ))} 
    </ul>
  </section>
  )
}

export default ShowAllPage;