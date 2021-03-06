/*
 Requests.js
 -------------
 Reducer File
 */

let initialState = {
	count: 0,
	apiFails: 0,
	maxItems: 10,
	oldFilters: {
	},
	filters: {
		pageNum: 1,
		perPage: 10,
		approverId: {
			name: "approverId",
			//Arr of objects { key: value, key: value}
			options: [{
				key: "Anybody", value: -1
			},{
				key: "eddy", value: 2
        	}],
			//Actual Value
			value: -1
		},
		requesterId: {
			name: "requesterId",
			options: [{
				key: "Anybody", value: -1
			},{
				key: "crawford", value: 7
			}],
			value: -1
		},
		status: {
			name: "status",
			options: [{
				key: "Any", value: -1
			},{
				key: "In Process", value: "In Process"
			},{
				key: "Denied", value: "Denied"
			},{
				key: "Approved", value: "Approved",
			},{
				key: "Completed", value: "Completed"
			},{
				key: "Cancelled", value: "Cancelled"
			}],
			value: -1
		}
	},
	array: [
	]
};

let exampleRequest = {
	requestId: 1,
	requesterId: 1,
	approverId: 2,
	unitName: "Apt#219",
	amount: 400,
	requestName: "Groceries",
	status: "In Progress",
	createDate: "2018-04-21 07:54:15.657899",
	updateDate: "2018-04-22 09:42:15.657899"
};

let formatFilters = (filters) => {
	let approvers = [{ key: "Any", value: -1}];
	let requesters = [{ key: "Any", value: -1}];
	filters.map( ({ nickname, id, type }) => {
		if (type === "approver") approvers.push({ key: nickname, value: id });
		if (type === "requester") requesters.push({ key: nickname, value: id });
	});
	return {
		approverId: {
			name: "approverId",
			options: approvers,
			value: -1
		},
		requesterId: {
			name: "requesterId",
			options: requesters,
			value: -1
		}
	};
};

export default (state=initialState, { type, index, array, key, value, count, filters}) => {
	switch(type) {
		//Overwrite any saved filter data with what server gives us, but keep old
		case "LoginSuccess":
			filters = formatFilters(filters);
			return {
				...state,
				filters: {
					//...filters,
					...state.filters,
					...filters
				}
			};

		case "Logout":
			return initialState;

		//Update Request Array, reset API fails, and Set Request Count
		case "GotRequestsSuccess":
			return {
				...state,
				array: array,
				apiFails: 0,
				count: (typeof count === "string") ? Number(count) : state.count
			};
		case "GotRequestsFail":
			return {
				...state,
				filters: state.oldFilters,
				apiFails: state.apiFails + 1
			};

		case "UpdateRequestFilters":
			return {
				...state,
				oldFilters: state.filters,
				filters: {
					...state.filters,
					[key]: (typeof state.filters[key] === "object" ?
						{
							...state.filters[key],
							value: value
						}
						:
						value
					)
				}
			};

		case "toggleRequest":
			return {
				...state,
				array: state.array.map((item, itemIndex) => {
					return {
						...item,
						showBig: (index===itemIndex) ? !item.showBig : item.showBig
					};
				})
			};


		default:
			return state || initialState;
	}
};
