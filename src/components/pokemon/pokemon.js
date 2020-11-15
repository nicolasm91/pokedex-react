import React, { Component } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

const capitalize = (s) => {
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
};

export default class Pokemon extends Component {
	state = {
		loading: true,
		imageLoading: true,
		errorLoading: false,
		name: "",
		pokemonIndex: "",
		imageURL: "",
		shinyImageURL: "",
		types: [],
		description: "",
		stats: {
			hp: "",
			attack: "",
			defense: "",
			spAttack: "",
			spDefense: "",
			speed: "",
		},
		height: "",
		weight: "",
		abilities: [],
	};

	async componentDidMount() {
		const { pokemonIndex } = this.props.match.params;

		const pkmnURL = "https://pokeapi.co/api/v2/pokemon/" + pokemonIndex + "/";
		const pkmnSpecies =
			"https://pokeapi.co/api/v2/pokemon-species/" + pokemonIndex + "/";

		const pkmnRes = await axios.get(pkmnURL);
		const speciesRes = await axios.get(pkmnSpecies);
		const name = pkmnRes.data.name;
		const imageURL = pkmnRes.data.sprites.front_default;
		const shinyImageURL = pkmnRes.data.sprites.front_shiny;
		const types = [];
		const abilities = [];

		// Get pokemon types:
		pkmnRes.data.types.forEach((index) => {
			types.push(index.type.name);
		});

		// Get abilities:
		pkmnRes.data.abilities.forEach((index) => {
			abilities.push(index.ability.name);
		});

		let { hp, attack, defense, spAttack, spDefense, speed } = "";

		// Get basic stats:
		pkmnRes.data.stats.forEach((stat) => {
			switch (stat.stat.name) {
				case "hp":
					hp = stat["base_stat"];
					break;

				case "attack":
					attack = stat["base_stat"];
					break;

				case "defense":
					defense = stat["base_stat"];
					break;

				case "special-attack":
					spAttack = stat["base_stat"];
					break;
				case "special-defense":
					spDefense = stat["base_stat"];
					break;
				case "speed":
					speed = stat["base_stat"];
					break;
				default:
					break;
			}
		});
		// Get Pokedex description (first match on english)
		let description = "";
		await speciesRes.data.flavor_text_entries.some((flavor) => {
			if (flavor.language.name === "en") {
				description = flavor.flavor_text;
				return true;
			}
			return false; // breaks on first hit
		});

		const height = pkmnRes.data.height / 10; // height on decimetres
		const weight = pkmnRes.data.weight / 10; // weight on hectograms

		this.setState({
			pokemonIndex,
			name,
			types,
			imageURL,
			shinyImageURL,
			height,
			weight,
			description,
			abilities,
			stats: {
				hp,
				attack,
				defense,
				spAttack,
				spDefense,
				speed,
			},
		});

		this.setState({ loading: false });
	}
	render() {
		return (
			<>
				{this.state.loading ? (
					<div className="loading-center force-center">
						<BeatLoader
							size={35}
							color={"#ef5350"}
							loading={this.state.imageLoading}
						/>
					</div>
				) : (
					<div className="mt-4">
						<div className="row">
							<div className="col-md-6">
								<div className="card">
									<div className="card-body">
										<h3 className="card-title text-center">
											#{this.state.pokemonIndex.toString().padStart(3, 0)} |{" "}
											{capitalize(this.state.name)}
										</h3>
										<hr />
										<div>
											{this.state.imageLoading ? (
												<div className="loading-center force-center">
													<BeatLoader
														size={15}
														color={"#ef5350"}
														loading={this.state.imageLoading}
													/>
												</div>
											) : null}
											<img
												onLoad={() => this.setState({ imageLoading: false })}
												onError={() => this.setState({ errorLoadingImg: true })}
												src={this.state.imageURL}
												alt={this.name}
												className="mt-2 mx-auto d-block"
											/>
											<h6 className="card-title">Pokedex-Entry: </h6>
											<p className="card-text">{this.state.description}</p>
											<h6 className="card-title">
												Abilities:
												{this.state.abilities.map((value) => (
													<span
														className="mx-2 badge badge-secondary"
														key={value}>
														{capitalize(value)}
													</span>
												))}
											</h6>
											<div className="row mx-auto">
												<h6 className="card-title">Height:</h6>
												<p className="mx-3 card-text">
													{this.state.height} mts.
												</p>
											</div>
											<div className="row mx-auto">
												<h6 className="card-title">Weight:</h6>
												<p className="mx-3 card-text">
													{this.state.weight} kgs.
												</p>
											</div>
										</div>
									</div>
									<div className="card-footer text-center bg-custom">
										<h6 className="card-title">
											Types:
											{this.state.types.map((type) => (
												<span
													key={type}
													className={`mx-2 badge badge-primary type-${type}`}>
													{capitalize(type)}
												</span>
											))}
										</h6>
									</div>
								</div>
							</div>

							<div className="col-md-6">
								<div className="card">
									<div className="card-body">
										<h3 className="card-title text-center">
											Pokemon base stats:
										</h3>
										<hr />
										<div className="mt-2">
											<h6 className="card-title">HP:</h6>
											<div className="progress">
												<div
													className="progress-bar bg-danger"
													role="progressbar"
													style={{
														width: "" + (this.state.stats.hp * 100) / 255 + "%",
													}}
													aria-valuenow={this.state.stats.hp}
													aria-valuemin={0}
													aria-valuemax={255}>
													<small>{this.state.stats.hp}</small>
												</div>
											</div>
										</div>

										<div className="mt-2">
											<h6 className="card-title">Attack:</h6>
											<div className="progress">
												<div
													className="progress-bar bg-danger"
													role="progressbar"
													style={{
														width:
															"" + (this.state.stats.attack * 100) / 255 + "%",
													}}
													aria-valuenow={this.state.stats.attack}
													aria-valuemin={0}
													aria-valuemax={255}>
													<small>{this.state.stats.attack}</small>
												</div>
											</div>
										</div>

										<div className="mt-2">
											<h6 className="card-title">Defense:</h6>
											<div className="progress">
												<div
													className="progress-bar bg-danger"
													role="progressbar"
													style={{
														width: "" + (this.state.stats.hp * 100) / 255 + "%",
													}}
													aria-valuenow={this.state.stats.hp}
													aria-valuemin={0}
													aria-valuemax={255}>
													<small>{this.state.stats.hp}</small>
												</div>
											</div>
										</div>

										<div className="mt-2">
											<h6 className="card-title">Special Attack:</h6>
											<div className="progress">
												<div
													className="progress-bar bg-danger"
													role="progressbar"
													style={{
														width:
															"" +
															(this.state.stats.spAttack * 100) / 255 +
															"%",
													}}
													aria-valuenow={this.state.stats.spAttack}
													aria-valuemin={0}
													aria-valuemax={255}>
													<small>{this.state.stats.spAttack}</small>
												</div>
											</div>
										</div>

										<div className="mt-2">
											<h6 className="card-title">Special Defense:</h6>
											<div className="progress">
												<div
													className="progress-bar bg-danger"
													role="progressbar"
													style={{
														width:
															"" +
															(this.state.stats.spDefense * 100) / 255 +
															"%",
													}}
													aria-valuenow={this.state.stats.spDefense}
													aria-valuemin={0}
													aria-valuemax={255}>
													<small>{this.state.stats.spDefense}</small>
												</div>
											</div>
										</div>

										<div className="mt-2">
											<h6 className="card-title">Speed:</h6>
											<div className="progress">
												<div
													className="progress-bar bg-danger"
													role="progressbar"
													style={{
														width:
															"" + (this.state.stats.speed * 100) / 255 + "%",
													}}
													aria-valuenow={this.state.stats.speed}
													aria-valuemin={0}
													aria-valuemax={255}>
													<small>{this.state.stats.speed}</small>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<hr />
				<div>
					<h6 className="text-muted text-center">
						Data obtained from <a href="https://pokeapi.co/">PokeAPI.co</a>
					</h6>
				</div>
			</>
		);
	}
}
