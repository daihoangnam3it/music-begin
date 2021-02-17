import React from 'react'
import Item from './Item'
const Library = ({songs,setCurrentSong,setIsPlaying,animateS,setSongs,isNavbar}) => {
  const handleSelectSong=async (id)=>{
    await setIsPlaying(false)
    animateS.currentTime=0;
    const songSelected=songs.filter(el=>el.id===id);
    const newSongs=await songs.map(el=>{
      if(el.id===id){
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
    setCurrentSong(songSelected[0])
    setIsPlaying(true)
    
}
  return (
    <div className={`library ${isNavbar?'active':""}`}>
      <h2 className="library-title">Library</h2>
      {songs.map(song=><Item song={song} key={song.id} handleSelectSong={handleSelectSong}/>)}
    </div>
  )
}

export default Library

