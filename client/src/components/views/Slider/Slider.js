import React from 'react'
import Card from '../Card/Card'
import './Slider.scss';

const Slider = ({pages}) => {
  return (
    <div className="display__item">
      {pages.map((page) => (
      <Card page={page} key={page.id}></Card>))} 
    </div>
  )
}

export default Slider
