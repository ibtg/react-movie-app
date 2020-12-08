import React, {useRef, useState} from 'react';
import './Display.scss';
import Card from '../Card/Card'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

const Display = ({title, pages, url}) => {
  const displayItemRef = useRef(null)
  const [right, setRight] = useState(0)
  const history = useHistory();


  const toViewAllpage = () =>{
    history.push({
      pathname:`/view/${title}`,
      state:{
        url:url,
        title:title}
    })

  }

  const onLeft = () =>{
    const left = right - 1 < 1 ? 'none' : right-1

    if (left === 'none'){
      displayItemRef.current.style.transform = left
      setRight(0)
    }
    else{
      displayItemRef.current.style.transform = `translateX(-${15 * left}vw)`
      setRight(left)
    }
  }

  const onRight = () =>{
    if(right<14){
      displayItemRef.current.style.transform = `translateX(-${15 * (right+1)}vw)`
      setRight(right+1)
    }
  }

  return(
    <section className="display__container">
      <div className="display__text">
        <h2 className="display__title">{title}</h2>
        <span className="display__viewAll" onClick={toViewAllpage}>View all</span>
      </div>
      <div className="display__items">
        {right > 0 ? <MdKeyboardArrowLeft className="display__leftBtn display__button" onClick={onLeft}></MdKeyboardArrowLeft>: ''}
        <ul className="display__item" ref={displayItemRef}>
          {pages.map((page) => (
          <Card page={page} key={page.id}></Card>))} 
        </ul>
        <MdKeyboardArrowRight className="display__rightBtn display__button" onClick={onRight}></MdKeyboardArrowRight>
      </div>
  </section>
  )
}

export default Display;