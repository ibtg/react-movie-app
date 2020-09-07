import React from 'react';
import { IMAGE_BASE_URL } from '../../Config';
import './MovieActor.scss';
import NoImage from '../utils/NoImage';

function MovieActor(props) {
  return (
    <div className="actors__container">
      <h4>DIRETOR / STARRING ACTORS</h4>
      <div className="actors">
        <div className="actor__item">
          <a
            className="actor__link"
            href={`http://google.com/search?q=${props.directorInfo.name}`}
            target="_blank"
          >
            {props.directorInfo.profile_path ? (
              <img
                className="actors__image"
                src={`${IMAGE_BASE_URL}w200${props.directorInfo.profile_path}`}
                alt={props.directorInfo.name}
              />
            ) : (
              <NoImage></NoImage>
            )}
          </a>
          <span className="actor__name">
            <span> {props.directorInfo.name}</span>
            <span>Director</span>
          </span>
        </div>
        {props.castInfo.map(
          (actor, index) =>
            index <= 8 && (
              <div className="actor__item" key={index}>
                <a
                  className="actor__link"
                  href={`http://google.com/search?q=${actor.name}`}
                  target="_blank"
                >
                  {actor.profile_path ? (
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
                  ) : (
                    <NoImage></NoImage>
                  )}
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
