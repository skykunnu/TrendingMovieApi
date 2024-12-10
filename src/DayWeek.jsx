/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'


function DayWeek() {
    const [showdata , setShowData] = useState("")


    const API_KEY = import.meta.env.VITE_API_KEY
     const img_base_path="https://image.tmdb.org/t/p/original"
  
  async function day(){
  
      const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`)
      setShowData(response.data.results);
  }

  async function week(){
  
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${API_KEY}`)
    setShowData(response.data.results);
}


useEffect(()=>{
day()
},[])



  return (
    <div>
      <button onClick={day}>Day</button>
      <button onClick={week}>Week</button>
      <div className="show">
          {showdata.length > 0 &&
            showdata.map((item)=>{
            return(
               <div className="images" key={item.id}>
                <img src={img_base_path+item.poster_path} alt="" />
                <h3>{item.title}</h3>
                <h5>{new Date(item.release_date).toDateString()}</h5>
                <p>{item.genre_ids[0]}</p>
               </div>
            )
          })
           }
      </div>
    </div>
  )
}

export default DayWeek
