import React from 'react';
import './NoImage.scss';
function NoImage(props) {
  return (
    <div className="noImage">
      <div>No Image</div>
      <div>{props.name}</div>
    </div>
  );
}

export default NoImage;
