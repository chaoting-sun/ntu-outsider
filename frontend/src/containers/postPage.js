import React, { useState, useEffect } from 'react'
import '../css/restaurantPage.css'
import Information from './information';
import Comment from './comment';
import { useParams } from 'react-router-dom'

// import axios from 'axios'
// const instance = axios.create({
//   baseURL: 'http://localhost:4000/api'
// })

const PostPage = () => {
  const { id } = useParams()
  const [info, setInfo] = useState({})
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  // const getInfo = async () => {
  //   // TODO Part III-2: get a restaurant's info
  //   const {data: { message, contents }} = await instance.get('/getInfo', { params: { id: id } });
  //   setInfo(contents);
  // }
  // const getComments = async () => {
  //   // TODO Part III-3: get a restaurant's comments
  //   const {data: { message, contents }} = await instance.get('/getCommentsByRestaurantId', { params: { restaurantId: id } });
  //   setComments(contents);
  // }

  // useEffect(() => {
  //   if (Object.keys(info).length === 0) {
  //     getInfo()
  //   }
  // }, [])

  useEffect(() => {
    if (loading) {
      // getComments();
      setLoading(false);
    }
  }, [comments])

  /* TODO Part III-2-b: calculate the average rating of the restaurant */
  let rating = 0;
  if (comments.length) {
    for (let i = 0; i < comments.length; i++)
      rating += comments[i].rating;
    rating /= comments.length;
  }

  return (
    <div className='restaurantPageContainer'>
      {Object.keys(info).length === 0 ? <></> : <Information info={info} rating={rating} />}
      <Comment
        restaurantId={id}
        comments={comments}
        setComments={setComments}
        setLoad={setLoading}
      />
    </div>
  )
}
export default PostPage