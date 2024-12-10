/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'


function PopMovTv() {
    const [showData,setShowData]=useState("");

    const API_KEY = import.meta.env.VITE_API_KEY
    const img_base_path="https://image.tmdb.org/t/p/original"


     async function popMov(){
        const response=await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`);
      setShowData(response.data.results)
     }

     async function popTv(){
        const response=await axios.get(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${API_KEY}`);
        setShowData(response.data.results)

     }

     useEffect(()=>{
      popMov()
     },[])


  return (
    <div>
        <button onClick={popMov}>Popular Movie</button>
        <button onClick={popTv}>Popular TV-Show</button>
        <div className="show">
          {showData.length > 0 &&
            showData.map((item)=>{
            return(
               <div className="images" key={item.id}>
                <img src={img_base_path+item.poster_path} alt="" />
                <h3>{item.title || item.name}</h3>
                <h5>{new Date(item.release_date).toDateString() || new Date(item.first_air_date).toDateString()}</h5>
                <p>{item.genre_ids[0] || item.genre_ids || item.id}</p>

               </div>
            )
          })
           }
      </div>
    </div>
  )
}

export default PopMovTv
