import React, {useRef, useState} from 'react';
import './Display.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Slider from '../Slider/Slider'

const Display = ({title, pages, url}) => {
  const displayItemRef = useRef(null)
  const [right, setRight] = useState(0)
  const [pageSection, setPageSection] = useState({0:pages.slice(0, 6), 1:pages.slice(6,12), 2:pages.slice(12,18)})
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
      displayItemRef.current.style.transform = `translateX(-${100 * left}%)`
      setRight(left)
    }
  }

  const onRight = () =>{
    if(right<2){
      displayItemRef.current.style.transform = `translateX(-${(right+1)*100}%)`
      setRight(right+1)
    }else{
      displayItemRef.current.style.transform='none'
      setRight(0)

    }
  }

  return(
    <section className="display__container">
      <div className="display__text">
        <h2 className="display__title">{title}</h2>
        <span className="display__viewAll" onClick={toViewAllpage}>View all</span>
      </div>
      {right > 0 ? <MdKeyboardArrowLeft className="display__leftBtn display__button" onClick={onLeft}></MdKeyboardArrowLeft>: ''}

      <div className="display__items" ref={displayItemRef}>
        {Object.keys(pageSection).map(key => <Slider key={key} pages={pageSection[key]}></Slider> )}
      </div>
      <MdKeyboardArrowRight className="display__rightBtn display__button" onClick={onRight}></MdKeyboardArrowRight>
  </section>
  )
}

export default Display;