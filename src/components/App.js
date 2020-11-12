import "../styleSheets/App.css";
import React from "react";
import pokemon from "../data/pokemon.json";
import PokeList from "./PokeList";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">¡Hazte con todos!</h1>
        <PokeList data={pokemon} />
      </div>
    );
  }
}

export default App;
