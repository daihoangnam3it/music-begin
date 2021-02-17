import React, { useState,useRef } from 'react'
import './styles/app.scss'

import Song from './components/Song'
import Play from './components/Player'
import Library from './components/Library';
import Nav from './components/Nav'
import data from './util'
function App() {
 
  const [songs,setSongs]=useState(data());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false)
  const [animateS,setAnimates]=useState();
  const [isNavbar,setIsNavbar]=useState(false);
  return (
    <div className={`app ${isNavbar?"app--library":""}`}>
      <img className="background-cover" src={currentSong.cover} alt=""/>
      <Nav isNavbar={isNavbar} setIsNavbar={setIsNavbar}/>
      <Song currentSong={currentSong} isPlaying={isPlaying} animateS={animateS} setAnimates={setAnimates}/>
      <Play  setSongs={setSongs} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong} songs={songs}/>
      <Library isNavbar={isNavbar}  isPlaying={isPlaying} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} animateS={animateS}/>
    </div>
  )
}

export default App
