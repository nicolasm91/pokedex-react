import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/pokemon";

export default class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<NavBar />
					<div className="container content">
						<Switch>
							<Route exact path="/" component={Dashboard} />
							<Route
								Route
								exact
								path="/pokemon/:pokemonIndex"
								component={Pokemon}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}
