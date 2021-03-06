let knex = require("../helpers/knexfile.js");
let { checkUsername, checkPassword, checkName, checkApprover, checkApproveLimit } = require("../validators/userValidate");

exports.updateUser = function (event, callback) {
	if (req.body.key === "username") {
		checkUsername(req, res, updateBasic);
	} else if (req.body.key === "password") {
		checkPassword(req, res, updatePassword);
	} else if (req.body.key === "name") {
		checkName(req, res, updateName);
	} else if (req.body.key === "approverid") {
		checkApprover(req, res, updateApprover);
	} else if (req.body.key === "approvelimit") {
		checkApproveLimit(req, res, updateBasic);
	}
};

//Simply update value
let updateBasic = function (event, callback) {
	knex("users").update({
		[req.body.key]: req.body.value
	}).where({
		username: req.params.id
	})
		.then(function(data) {
			res.status(200).json({
				data: data
			});
		})
		.catch(function(err) {
			console.log("Database update failed.", err);
			res.status(200).json({
				data: 0,
				message: err.message
			});
		});
};

//Update Basic + update last password update
let updatePassword = function (event, callback) {
	knex("users").update({
		password: req.body.value,
		passwordUpdate: knex.fn.now()
	}).where({
		username: req.params.id
	})
		.then(function(data) {
			res.status(200).json({
				data: data
			});
		})
		.catch(function(err) {
			console.log("Database update failed.", err);
			res.status(200).json({
				data: 0,
				message: err.message
			});
		});
};

//Update Basic + update all references to this users name in all requests/users
//Update filters because of name change
let { updateFilters } = require("../helpers/userIndex.js");
let updateName = function (event, callback) {

};

//UpdateBasic + also get approver's name w/ given id, and update both
let updateApprover = function (event, callback) {
	knex("users")
		.where({ id: req.params.id })
		.select("name")
		.first()
		.then(function(data) {
			console.log("Got approver", data);

		});
};
