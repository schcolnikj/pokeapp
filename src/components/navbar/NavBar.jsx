

import { NavLink } from "react-router-dom"
import Logo from "../../assets/poke-logo.png"

const NavBar = () => {
    
  return (
    <nav className="flex flex-row justify-center border-[2px] border-cerulean-blue bg-white-yellow rounded-full m-1">
        <div className="flex">
            <div className="flex flex-row justify-center p-2">
              <NavLink to="/" >
                <div className="flex flex-row gap-4">
                <img src={Logo} width={50} alt="logo" />
                <span>| HOME</span>
                </div>
              </NavLink>
            
            </div>
        </div>
    </nav>
  )
}

export default NavBar