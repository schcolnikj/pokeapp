
import React from 'react'
import style from "./Card.module.css"
import { NavLink } from 'react-router-dom'

const Card = ({pokemon}) => {

  const typesString = pokemon?.types.map((t) => t.toUpperCase()).join(', ');
  
  return (
    <div className={style.card}>
      <NavLink to={`/detail/${pokemon.id}`} >
        <div className={`${style.cardInfo} flex flex-col bg-cerulean-blue`}>
          <div>
            <img src={pokemon.image} width={100} alt="pokemon image" className={style.image} />
          </div>
          <h3 className={style.title}>{(pokemon.name).toUpperCase()}</h3>
          <div className={`${style.extraInfo}  p-1 text-[10px]`}>
              <p className='info'>HP: {pokemon.hp}</p>
              <p className='info'>ATTACK: {pokemon.attack}</p>
              <p className='info'>DEFENSE: {pokemon.defense}</p>
              <div className='flex flex-row justify-center text-[8px]'>
                <ul className={style.typesList}>TYPES:
                  {
                    pokemon?.types.map((t, index) => (
                      <li key={index}>{t.toUpperCase()} {index !== pokemon.types.length - 1 ? ',' : ''}</li>
                    ))
                  }
                </ul>
              </div>
            
            <span className='text-[8px]'>SPECIE DESCRIPTION: {pokemon.specieDescription.toUpperCase()}</span>
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default Card