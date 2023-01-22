const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @acces   Private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
	res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @acces   Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Plase add a text field");
	}
	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @acces   Private
const updateGoal = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const updatedData = req.body;
	const goal = await Goal.findById(id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}

	// Check for user
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Check the logged user matches the goal user
	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(id, updatedData, { new: true });
	res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goal/:id
// @acces   Private
const deleteGoal = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const goal = await Goal.findById(id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}

	// Check for user
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Check the logged user matches the goal user
	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	await goal.remove();
	res.status(200).json({ id: id });
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};
