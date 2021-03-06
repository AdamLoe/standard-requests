const middleware = store => next => action => {
	let result = next(action);

	try {
		let state = store.getState();
		localStorage.setItem("Standard-Requests-State", JSON.stringify({
			user: state.user,
			navigation: state.navigation,
			pagination: state.pagination,
			requests: state.requests
		}));
		//console.log("Successfully set state");
	}
	catch(err) {
		//console.log("error settings state", err);
	}

	return result;
};

export default middleware;
