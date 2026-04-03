const express = require("express");
const verifyToken = require("../../middleware/authMiddleware");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  logginUser,
} = require("./users-controller");
const router = express.Router();
router.get("/profile", verifyToken, (req, res) => {
  try {
    res.json({
      message: "success",
      payload: "Secure user profile information",
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});

//create new customer
router.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.json({
      message: "success",
      payload: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//login data
router.post("/login", async (req, res) => {
  try {
    const userLoggedIn = await logginUser(req.body);
    res.json({
      message: "success",
      payload: `${userLoggedIn.name} has logged in successfully. `,
      token: userLoggedIn.token,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//get user
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({
      message: "failure",
      payload: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//get by id
router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json({
      message: "success",
      payload: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//put
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json({
      message: "success",
      payload: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  try {
    const userToDelete = await deleteUser(req.params.id);
    res.json({
      message: "success",
      payload: `${userToDelete} has been removed from database!`,
    });
  } catch (error) {
    res.status(404).json({
      message: "failure",
      payload: error.message,
    });
  }
});
module.exports = router;
