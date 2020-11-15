import React, { Component } from "react";
import logo from "./images/pkball2.png";

export default class NavBar extends Component {
	render() {
		return (
			<div>
				<nav
					className="navbar navbar-expand-md navbar-dark bg-dark fixed-top shadow"
					style={{ backgroundColor: "#ef5350" }}>
					<img src={logo} alt="" className="logo" />
					<a
						className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
						href="/">
						R E A C T | P O K E D E X
					</a>
					{/* <form action="" className="form-inline justify-content-between">
						<input
							className="form-control mr-sm-2 ml-5"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-warning my-2 my-sm-0" type="submit">
							Search
						</button>
					</form> */}
				</nav>
			</div>
		);
	}
}
