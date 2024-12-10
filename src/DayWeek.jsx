/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'


function DayWeek() {
    const [showdata , setShowData] = useState("")
    const [genre, setGenre] = useState([])


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


async function Genre() {
  const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${API_KEY}`)
  setGenre(response.data.genres)
  console.log(response.data.genres);
}


function getGenre(genreArr){
  return genreArr.map((id)=>{
  const genreObj=genre.find((g)=>g.id===id);
  return genreObj ? genreObj.name : null;
  })
  .filter(Boolean)
  .join(", ");
  }



useEffect(()=>{
day();
Genre();
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
                <h5>{item.release_date ? new Date(item.release_date).toDateString() : new Date(item.first_air_date).toDateString()}</h5>
                <p>{getGenre(item.genre_ids)}</p>
               </div>
            )
          })
           }
      </div>
    </div>
  )
}

export default DayWeek
