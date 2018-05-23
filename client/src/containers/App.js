import "../../scss/custom/App.scss";

import React from "react";
import { connect } from "react-redux";

import Header from "./Other/Header";
import UserPanel from "./UserPanel";
import AdminPanel from "./Admin/AdminPanel";
import SettingsPanel from "./Other/SettingsPanel";
import Login from "./Other/Login";
import CreateRequestContainer from "./CreateRequest/CreateRequestContainer";
import Notifications from "./Other/Notifications";

let App = ({loggedIn, showAdminPanel, showSettings, showCreateRequest}) => {
	console.log("Render: App");

	if (loggedIn === false) {
		return (
			<Login />
		);
	}

	let Content = <UserPanel />;
	if (showAdminPanel) { Content = <AdminPanel />; }

	return (
		<div className="App">
			<Notifications />
			<Header />
			{ showCreateRequest &&
				<CreateRequestContainer />
			}
			{ showSettings &&
				<SettingsPanel />
			}
			{ Content }
		</div>
	);
};

let mapStateToProps = (state) => {
	console.log("MapSta: APP", state);
	return {
		loggedIn: state.user.loggedIn,
		showAdminPanel: state.navigation.showAdminPanel,
		showSettings: state.navigation.showSettings,
		showCreateRequest: state.navigation.showCreateRequest
	};
};


export default connect(mapStateToProps)(App);
