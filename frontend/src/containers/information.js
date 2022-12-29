/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

  const getTag = (tags) => {
    console.log('tags:', tags)
    return (
      <>
        {/* TODO Part III-2-a render tags */}
        {
          tags.map((t) => (
            <div className="tag" key={t}>{t}</div>
          ))
        }
      </>
    )
  }
  const getPriceTag = (price) => {
    let priceText = ""
    for (let i = 0; i < price; i++)
      priceText += "$"
    return (
      <>
        {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
        <div className="tag" key={priceText}>{priceText}</div>
      </>
    )
  }

  const getBusiness = (time) => {
    {/* TODO Part III-2-c: render business time for each day*/ }

    const day = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
    console.log("getBusiness - time:", time);
    return (
      <div className="businessTime">
        {
          time.all === undefined ? (
            day.map((d) => (
              <div className='singleDay' key={d}>
                <div className="day">{d}</div>
                <div className="time">
                  {time[d] !== undefined ? time[d] : 'Closed'}
                  { console.log('timed', time[d]) }
                  {/* {time[d] !== undefined ? time[d].split('-').join('-') : 'Closed'} */}
                </div>
              </div>
            ))
          ) : (
            day.map((d) => (
              <div className='singleDay' key={d}>
                <div className="day">{d}</div>
                {
                  time[d] !== undefined ?
                    (<div className="time">{time.all}</div>) : null
                }
              </div>
            ))
          )
        }
      </div>

    )

  }

  return (
    <div className='infoContainer'>
      {console.log("information - infoContainer")}
      <h2>{info.name}</h2>

      <div className='infoRow'>
        <div className='rate'>
          {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

        </div>
        <div className='distance'>{info.distance / 1000} km</div>
      </div>

      <div className='infoRow'>
        {getPriceTag(info.price)}
        {getTag(info.tag)}
      </div>

      <h5>Business hours:</h5>
      {getBusiness(info.time)}
    </div>
  )
}
export default Information