import React, { useRef ,useEffect, useState} from 'react'

const Song = ({currentSong,isPlaying,setAnimates,animateS}) => {
  const cdRef=useRef(null)
  
  // console.log(animateS);
  function animate(){
    if(animateS===undefined){
      const a=cdRef.current.animate([
        {
          transform:'rotate(360deg)'
        }
      ],{
        duration:10000,
        iterations:Infinity
      })
      setAnimates(a);
      a.pause();
      
    }else{
      if(isPlaying){
        animateS.play();
      }else{
        animateS.pause();
      }

    }
    
   

    

  }
  
 useEffect(()=>{
    animate();
 },[isPlaying])
  return (
    <div  className="song-container">
    <img className="cover" ref={cdRef} src={currentSong.cover} alt={currentSong.name}  />
    <h2>{currentSong.name}</h2>
    <h3>{currentSong.artist}</h3>
    </div>
  )
}

export default Song;
