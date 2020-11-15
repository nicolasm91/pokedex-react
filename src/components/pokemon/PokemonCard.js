import React, { Component } from "react";
import Styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { Link } from "react-router-dom";

const StyledLink = Styled(Link)`
text-decoration: none;
color: black;
&:focus,
&:hover,
&:visited,
&:link,
&:active {
text-decoration: none;
}
`;

const capitalize = (s) => {
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
};

export default class PokemonCard extends Component {
	constructor(props) {
		super(props);
		this.fetchTypes = this.fetchTypes.bind(this); // Incorrecto
		this.getPkmnData = this.getPkmnData.bind(this); // Correcto
	}
	state = {
		name: "",
		imageURL: "",
		pkmnIndex: "",
		imageLoading: true,
		errorLoadingImg: false,
		pkmnURL: "https://pokeapi.co/api/v2/pokemon/",
		types: [],
	};

	async componentDidMount() {
		const { url } = this.props;

		const pokemonIndex = url.split("/")[url.split("/").length - 2];
		const imageURL =
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
			pokemonIndex +
			".png";

		const pkmnData = await this.getPkmnData(pokemonIndex);
		const name = pkmnData.species.name;
		const types = [];

		//console.table(typeObj);

		pkmnData.types.forEach((index) => {
			types.push(index.type.name);
		});

		//console.table(types);

		this.setState({
			name,
			pokemonIndex,
			imageURL,
			types,
		});
	}
	// Intento #2 - Correcto:
	async getPkmnData(pokemonIndex) {
		const res = await axios.get(this.state.pkmnURL + pokemonIndex + "/");
		return res.data;
	}
	// Intento #1:
	async fetchTypes(pokemonIndex) {
		const res = await axios.get(this.state.pkmnURL + pokemonIndex + "/");

		const type0 = res.data.types[0].type.name;
		const type1 = res.data.types[0].type.name;
		console.log(
			"Pokemon: " +
				"# " +
				pokemonIndex +
				"| Type: 0 - " +
				type0 +
				" | Type: 1 - " +
				type1
		);
	}

	render() {
		return (
			<div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-3">
				<StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
					<div className="card shadow-sm">
						<div className="card-body text-center mx-auto">
							<h6 className="card-text">
								{this.state.pokemonIndex === undefined
									? null
									: "# " + this.state.pokemonIndex.toString().padStart(3, 0)}
							</h6>
							{this.state.imageLoading ? (
								<BeatLoader
									size={15}
									color={"#ef5350"}
									loading={this.state.imageLoading}
								/>
							) : null}
							<img
								className="card-img rounded"
								onLoad={() => this.setState({ imageLoading: false })}
								onError={() => this.setState({ errorLoadingImg: true })}
								src={this.state.imageURL}
								alt={this.state.name}
								style={
									this.state.errorLoadingImg
										? { display: "block" }
										: this.state.imageLoading
										? null
										: { display: "none" }
								}
							/>
							<h6 className="card-title">{capitalize(this.state.name)}</h6>
						</div>
						<div className="card-footer text-center bg-custom">
							{this.state.types.map((type) => (
								<a
									key={type}
									href="*"
									target="_self"
									rel="noopener noreferrer"
									className="card-link no-breaks">
									<span className={`badge badge-primary type-${type}`}>
										{capitalize(type)}
									</span>
								</a>
							))}
						</div>
					</div>
				</StyledLink>
			</div>
		);
	}
}
