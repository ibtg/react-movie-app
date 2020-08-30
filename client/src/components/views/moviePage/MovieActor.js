import React from 'react';
import { IMAGE_BASE_URL } from '../../Config';

import './MovieActor.scss';
import { Fragment } from 'react';

// gradient images, add event listenr , useEffect -> useSate number
function MovieActor(props) {
  // console.log(props.castInfo);
  //console.log(props.directorInfo);
  return (
    <div className="actors__container">
      <h4>DIRETOR / MAIN ACTORS</h4>
      <div className="actors">
        <div className="actor__item">
          <a
            className="actor__link"
            href={`http://google.com/search?q=${props.directorInfo.name}`}
            target="_blank"
          >
            <img
              className="actors__image"
              src={
                props.directorInfo
                  ? `${IMAGE_BASE_URL}w200${props.directorInfo.profile_path}`
                  : null
              }
              alt={props.directorInfo.name}
            />
          </a>
          <span className="actor__name">{props.directorInfo.name}</span>
        </div>
        {props.castInfo.map(
          (actor, index) =>
            index <= 6 && (
              <div className="actor__item" key={index}>
                <a
                  className="actor__link"
                  href={`http://google.com/search?q=${actor.name}`}
                  target="_blank"
                >
                  <img
                    key={index}
                    className="actors__image"
                    src={
                      actor.profile_path
                        ? `${IMAGE_BASE_URL}w200${actor.profile_path}`
                        : null
                    }
                    alt={actor.name}
                  />
                </a>
                <span className="actor__name">{actor.name}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default MovieActor;
