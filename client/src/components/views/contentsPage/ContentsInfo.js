import React from 'react';
import './ContentsInfo.scss';
import Like from './Like';

const ContentsInfo = (props) => {
  const {
    adult, backdrop, genres, original_language, 
    overview, popularity, release_date, runtime, 
    title, vote_average, casts, director, id} = props

  return (
    <div className="contentsInfo__container">
      <section className="contensInfo__info">
        <h3 className="contensInfo__title">{title}</h3>
        <div className="contentsInfo__rating">
          <span className="rating__title">RATING : </span>
          <span className="rating__contents">{vote_average}</span>
          <span className="rating__title">POPULARITY : </span>
          <span className="rating__contents">{popularity}</span>
          <span className="rating__runtime">{runtime}min</span>
          {adult &&<span className="rating__adult">`19`</span>}
        </div>

        <p className="contentsInfo__overview">{overview}</p>

        <div className="contentsInfo__casts">
          <div className="casts__category">
            <span className="casts__title" >DIRECTOR</span>
            <span>{director}</span>
          </div>
          <div className="casts__category">
            <span className="casts__title">CASTS</span>  
            <span className="casts__members">{casts[0] && casts[0].name}, </span>
            <span className="casts__members">{casts[1] && casts[1].name}, </span>
            <span className="casts__members">{casts[2] && casts[2].name} </span>
          </div>
          <div className="casts__category">
            <span className="casts__title" >OVERVIEW</span>
            <span className="overview__members">{original_language && original_language.toUpperCase()}</span>
            {genres && genres.map((genre) => (
            <span className="overview__members" key={genre.id}>{genre.name}</span>))} 
              <span>{release_date && release_date.split("-")[0]}</span>
          </div>
        </div>
        <Like
        userFrom={localStorage.getItem('userId')}
        id={id}
        title={title}
        ></Like>


      </section>
      <div className="contentsInfo__imageContainer">
        <img
        className="contentsInfo__image"
        src={backdrop}
        />
      </div>

    </div>
  );
}

export default ContentsInfo;
