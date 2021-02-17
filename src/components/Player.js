import React, { useEffect, useRef, useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay,faAngleLeft,faAngleRight,faPause,faVolumeMute} from '@fortawesome/free-solid-svg-icons'
const Player = ({currentSong,isPlaying,setIsPlaying,setCurrentSong,songs,setSongs}) => {
  const audioRef=useRef(null);
  // const [currentList,setCurrentList]=useState(songs)
  const [mute,setMute]=useState(false)
  // console.log(audioRef);
  const [songTime,setSongTime]=useState({
    currentTime:0,
    duration:0,
  })
  const playSong=()=>{
    setIsPlaying(!isPlaying);
  }
  const setTime=(time)=>{
    return  (Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2))
  }
  const handleTime=async (e)=>{
    const current=e.target.currentTime;
    const duration=e.target.duration;
    setSongTime({...songTime,currentTime:current,duration:duration})
    const indexSong=songs.findIndex(item=>item.id===currentSong.id);
    if(current===duration){
      // const newList=currentList.filter(song=>song.id!==currentSong.id);
      // setCurrentList(newList);
      const nextSong=(indexSong+1)%songs.length;
      setCurrentSong(songs[nextSong])
      activeSong(nextSong);
      await setIsPlaying(false);
      setIsPlaying(true);
    }
    
  }
  const activeSong=async (indexSong)=>{
    const newSongs=await songs.map((el,index)=>{
      if(index===indexSong){
        return {
          ...el,active:true
        }
      }else{
        return {
          ...el,active:false
        }
      }
    })
    setSongs(newSongs)
  }
  const handleSkip=async (id)=>{
    const indexSong=songs.findIndex(item=>item.id===id);
    const nextSong=(indexSong+1)%songs.length;
    setCurrentSong(songs[nextSong])
    activeSong(nextSong);
    await setIsPlaying(false);
    setIsPlaying(true);
    // setCurrentSong(currentList[(indexSong+1)%currentList.length])
  }
  const handleForward=async (id)=>{
    const indexSong=songs.findIndex(item=>item.id===id);
    const forwardSong=(indexSong-1)%songs.length;
    setCurrentSong(songs[forwardSong])
    if(forwardSong<0){
      setCurrentSong(songs[songs.length-1])
    }
    activeSong(forwardSong);
    await setIsPlaying(false);
    setIsPlaying(true);
  }
  const changeTime=(e)=>{
    audioRef.current.currentTime=e.target.value;
    setSongTime({...songTime,currentTime:e.target.value})
  }
  const handleMute=()=>{
      setMute(!mute);
  }
  useEffect(()=>{
    isPlaying?audioRef.current.play():audioRef.current.pause();
  },[isPlaying])
  return (
    <div className="player">
      <div className="time-control">
        <p>{setTime(songTime.currentTime)}</p>
        <input 
        min={0} 
        max={songTime.duration} 
        value={songTime.currentTime}
        onChange={changeTime} 
        type="range"/>
        <p>{songTime.duration?setTime(songTime.duration):"0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} onClick={()=>handleForward(currentSong.id)} />
        <FontAwesomeIcon className="mute" icon={faVolumeMute} onClick={()=>handleMute()} />
        <FontAwesomeIcon onClick={()=>{playSong()}} className="play" size="2x" icon={isPlaying?faPause:faPlay}/>
        <FontAwesomeIcon className="skip-forward" icon={faAngleRight} onClick={()=>handleSkip(currentSong.id)} />
      </div>
      <audio onTimeUpdate={handleTime} onLoadedMetadata={handleTime} ref={audioRef} src={currentSong.audio} muted={mute} ></audio>

    </div>
  )
}

export default Player
