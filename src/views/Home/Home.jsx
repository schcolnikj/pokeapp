import Logo from "../../assets/poke-logo.png"
import CardsContainer from "../../components/cardsContainer/CardsContainer"

const Home = () => {
  return (
    <div className="items-center justify-center flex flex-wrap">
      <div className="flex flex-wrap justify-center items-center">
        <div className="pb-4 pt-2">
          {/* <img src={Logo} width={300} alt="logo" /> */}
        </div>
        <div className="flex justify-center items-center p-4">
            <CardsContainer />
        </div>
      </div>
    </div>
  )
}

export default Home