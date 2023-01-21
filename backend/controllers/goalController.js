const asyncHandler = require("express-async-handler");

// @desc    Get goals
// @route   GET /api/goals
// @acces   Private
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Get goals" });
});

// @desc    Set goal
// @route   POST /api/goals
// @acces   Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Plase add a text field");
	}
	res.status(200).json({ message: "Create a goal" });
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @acces   Private
const updateGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @desc    Delete goal
// @route   DELETE /api/goal/:id
// @acces   Private
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};
