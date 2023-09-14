
import React from 'react'
import style from "./Card.module.css"
import { NavLink } from 'react-router-dom'

const Card = (pokemon) => {
  
  return (
    <div className={style.card}>
      <NavLink to={`/detail/${pokemon.id}`} >
        <div className={`${style.cardInfo} flex flex-col bg-cerulean-blue`}>
          <div>
            <img src={pokemon.image} width={100} alt="pokemon image" />
          </div>
          <h3 className={style.title}>{(pokemon.name).toUpperCase()}</h3>
          <div className={`${style.extraInfo}  p-1 text-[10px]`}>
            <span className='info'>HP: {pokemon.hp}</span>
            <span className='info'>ATTACK: {pokemon.attack}</span>
            <span className='info'>DEFENSE: {pokemon.defense}</span>
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default Card