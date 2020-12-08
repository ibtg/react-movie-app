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
      displayItemRef.current.style.transform = `translateX(-${200 * left}px)`
      setRight(left)
    }
  }
  //right가 1일 때 click -> -180px -> right:2
  // 이때 left는 none이 되어야 한다 

  //right가 2일 때 click -> -360px -> right:3
  // 이때 left는 -180이 되어야 한다 

  
  //right가 3일 때 click -> -540px -> right:4
  // 이때 left는 -360이 되어야 한다 

  
  //right가 4일 때 click -> -720px -> right:5
  // 이때 left는 -540이 되어야 한다 

  const onRight = () =>{
    if(right<13){
      displayItemRef.current.style.transform = `translateX(-${200 * (right+1)}px)`
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