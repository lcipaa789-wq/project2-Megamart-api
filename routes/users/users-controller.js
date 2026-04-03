const User = require("./users-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createUser = async (userData) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const secureUserData = {
      name: userData.name,
      password: hashedPassword,
      email: userData.email,
      address: userData.address,
      phone: userData.phone,
    };

    const newUser = await User.create(secureUserData);
    return newUser;
  } catch (error) {
    throw error;
  }
};
const logginUser = async (userData) => {
  try {
    //verify that username exists in database
    const user = await User.findOne({ name: userData.name });
    if (!user) {
      throw "User not found";
    }
    //compare the incoming password with hashed password in the database
    //.compare(incomingPassword, hashedPassword)
    const isCorrectPassword = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw "Password do not match";
    }
    //setup JWT token for user
    //jwt.sign({payload}, secretKey)
    const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET_KEY);

    return { name: user.name, token: token };
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const user = await User.find();
    return user;
  } catch (error) {
    throw error;
  }
};
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw "User not found";
    }
    return user;
  } catch (error) {
    throw error;
  }
};
const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    if (!updatedUser) {
      throw "User not found";
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
const deleteUser = async (userId) => {
  try {
    const userToDelete = await User.findByIdAndDelete(userId);
    if (!userToDelete) {
      throw "User to delete not found";
    }
    return userToDelete;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  logginUser,
};
