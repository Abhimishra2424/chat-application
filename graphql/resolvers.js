const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.json");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    getUsers: async (_, __, context) => {
      try {
        let user;

        if (context.req && context.req.headers.authorization) {
          const token = context.req.headers.authorization.split("Bearer ")[1];
          jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
              throw new AuthenticationError("Invalid token");
            }
            user = decodedToken;
          });
        }
        const users = await User.findAll({
          where: {
            username: {
              [Op.ne]: user.username,
            },
          },
        });
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    login: async (_, args) => {
      const { username, password } = args;

      let errors = {};

      try {
        if (username.trim() === "")
          errors.username = "Username must not be empty";

        if (password === "") errors.password = "password must not be empty";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("bad inputs", { errors });
        }

        const user = await User.findOne({ where: { username } });

        if (!user) {
          errors.username = "User not found";
          throw new UserInputError("user not found", { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "Incorrect password";
          throw new AuthenticationError("password is Incorrect ", { errors });
        }

        const token = jwt.sign(
          {
            username,
          },
          JWT_SECRET,
          { expiresIn: 60 * 60 }
        );

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      console.log(args);
      let errors = {};
      try {
        if (email.trim() === "") errors.email = "email must not be empty";
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "confirmPassword must not be empty";

        if (password !== confirmPassword)
          errors.confirmPassword = "password and confirmPassword must match";

        // const userByusername = await User.findOne({ where: { username } });
        // const userByEmail = await User.findOne({ where: { email } });

        // if (userByusername) errors.username = "username already exists";
        // if (userByEmail) errors.email = "email already exists";

        console.log("errors", errors);
        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        // hash password
        password = await bcrypt.hash(password, 12);

        // create user
        const user = await User.create({
          username,
          email,
          password,
        });
        return user;
      } catch (error) {
        console.log(error);
        if (error.name === "SequelizeUniqueConstraintError") {
          error.errors.forEach(
            (e) => (errors[e.path] = `${e.path} already taken`)
          );
        } else if (error.name === "SequelizeValidationError") {
          error.errors.forEach((e) => (errors[e.path] = e.message));
        }

        throw new UserInputError("Bad Input", { errors });
      }
    },
  },
};
