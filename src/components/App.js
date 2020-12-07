import "../styleSheets/App.scss";
import React from "react";
import pokemon from "../data/pokemon.json";
import PokeList from "./PokeList";
import Filter from "./Filter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.filteredData = this.filteredData.bind(this);
  }
  //Events
  handleInput(data) {
    this.setState({
      searchValue: data,
    });
  }
  //Render
  filteredData() {
    const filteredPokemon = pokemon.filter((item) =>
      item.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
    );
    return filteredPokemon;
  }
  render() {
    return (
      <div className="container">
        <header>
          <h1 className="title">¡Hazte con todos!</h1>
        </header>
        <main>
          <Filter
            handleInput={this.handleInput}
            searchValue={this.state.searchValue}
          />
          <PokeList data={this.filteredData()} />
        </main>
      </div>
    );
  }
}

export default App;
