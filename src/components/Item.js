import React from 'react'

const Item = ({song,handleSelectSong}) => {
  
  return (
    <div className={`item-song ${song.active?'selected':''}`}onClick={()=>handleSelectSong(song.id)}>
        <img  src={song.cover} alt={song.name}  />
        <div className="item-description">
            <p className="item-name">{song.name}</p>
            <p className="item-artist">{song.artist}</p>
        </div>
    </div>
  )
}

export default Item
