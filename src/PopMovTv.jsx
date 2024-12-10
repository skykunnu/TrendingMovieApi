/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'


function TopMovTv() {
    const [showData,setShowData]=useState("");

    const API_KEY = import.meta.env.VITE_API_KEY
    const img_base_path="https://image.tmdb.org/t/p/original"


     async function TopMov(){
        const response=await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`);
        setShowData(response.data.results)
     }

     async function TopTv(){
        const response=await axios.get(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${API_KEY}`);
        setShowData(response.data.results)


     }

     useEffect(()=>{
      TopMov()
     },[])


  return (
    <div>
        <button onClick={TopMov}>Top-Rated Movie</button>
        <button onClick={TopTv}>Top-Rated TV-Show</button>
        <div className="show">
          {showData.length > 0 &&
            showData.map((item)=>{
            return(
               <div className="images" key={item.id}>
                <img src={img_base_path+item.poster_path} alt="" />
                <h3>{item.title || item.name}</h3>
                <h5>{new Date(item.release_date).toDateString() || new Date(item.first_air_date).toDateString()}</h5>
                <p>{item.genre_ids[1] || item.genre_ids}</p>

               </div>
            )
          })
           }
      </div>
    </div>
  )
}

export default TopMovTv
