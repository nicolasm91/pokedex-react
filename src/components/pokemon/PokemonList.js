import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import InfiniteScroll from "react-infinite-scroll-component";

const maxPokemon = 893;

export default class PokemonList extends Component {
	constructor(props) {
		super(props);
		this.fetchMoreData = this.fetchMoreData.bind(this);
	}
	state = {
		loading: true,
		refreshing: false,
		url: "https://pokeapi.co/api/v2/",
		pokemon: null,
		limit: 42,
		offset: 0,
		hasMore: true,
	};

	async componentDidMount() {
		const res = await axios.get(
			this.state.url +
				"pokemon/?limit=" +
				this.state.limit +
				"&offset=" +
				this.state.offset
		);

		this.setState({ pokemon: res.data["results"] });
		this.setState({ loading: false });
	}

	async fetchMoreData() {
		this.setState({ refreshing: true });
		if (this.state.pokemon.length > maxPokemon) {
			this.setState({ hasMore: false });
			return;
		} else {
			this.setState({ offset: this.state.offset + 42 });

			console.log("Current offset: " + this.state.offset);
			const res = await axios.get(
				this.state.url +
					"pokemon/?limit=" +
					this.state.limit +
					"&offset=" +
					this.state.offset
			);

			const addedResults = this.state.pokemon.concat(res.data["results"]);

			if (addedResults.length > maxPokemon) {
				addedResults.length = maxPokemon;
				console.log("Total length: " + addedResults.length);
				this.setState({
					pokemon: addedResults,
				});
			} else {
				console.log("Total length: " + addedResults.length);
				this.setState({
					pokemon: addedResults,
				});
			}
		}
		this.setState({ refreshing: false });
	}

	render() {
		return (
			<>
				{this.state.pokemon ? (
					<InfiniteScroll
						className="no-overflow"
						dataLength={this.state.pokemon.length}
						next={this.fetchMoreData}
						hasMore={true}
						endMessage="end"
						loader={
							<BarLoader
								className="force-center loading-center"
								height={6}
								width={1200}
								color={"#ef5350"}
								loading={this.state.refreshing}
							/>
						}>
						<div className="row">
							{this.state.pokemon.map((pokemon) => (
								<PokemonCard key={pokemon.name} url={pokemon.url} />
							))}
						</div>
					</InfiniteScroll>
				) : (
					<div className="loading-center force-center">
						<BarLoader
							className="loading-center force-center"
							height={7}
							width={700}
							color={"#ef5350"}
							loading={this.state.loading}
						/>
					</div>
				)}
			</>
		);
	}
}
