import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styleSheets/PokeDetail.scss";

class PokeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      height: 0,
      weight: 0,
      evolution: "",
      abilities: [],
      species: "",
      evolve_to1: "",
      evolve_to2: "",
      evolve_to3: "",
    };
  }
  componentDidMount() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((info) =>
        this.setState({
          name: info.name,
          image: info.sprites.front_default,
          height: info.height,
          weight: info.weight,
          abilities: info.abilities,
          species: info.species.url,
        })
      )
      .then(() =>
        fetch(this.state.species)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ evolution: data.evolution_chain.url });
          })
      )
      .then(() =>
        fetch(this.state.evolution)
          .then((response) => response.json())
          .then((evol) => {
            this.setState({
              evolve_to1: evol.chain.species.name,
              evolve_to2: evol.chain.evolves_to[0].species.name,
              evolve_to3: evol.chain.evolves_to[0].evolves_to[0].species.name,
            });
            console.log(evol.chain);
          })
      );
  }
  render() {
    const {
      image,
      height,
      weight,
      abilities,
      evolve_to1,
      evolve_to2,
      evolve_to3,
    } = this.state;
    const moves = abilities.map((item) => " " + item.ability.name);
    return (
      <article className="detail">
        <img src={image} alt={this.props.name} className="detail__image" />
        <h2 className="detail__name">{`Nombre: ${this.props.name}`}</h2>
        <p className="detail__height">{`Altura: ${height} m`}</p>
        <p className="detail__weight">{`Peso: ${weight} kg`}</p>
        <p className="detail__abilities">{`Habilidades: ${moves}`}</p>
        <p className="detail__evolution">{`Evoluciones: ${evolve_to1} evoluciona a ${evolve_to2}, el cual evoluciona a ${evolve_to3}`}</p>
      </article>
    );
  }
}
PokeDetail.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default PokeDetail;
