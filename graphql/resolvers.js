const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.log(error);
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
