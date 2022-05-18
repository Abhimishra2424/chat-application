const { Message, User } = require("../../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    getMessages: async (_, { from }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError("Not authenticated");
        }

        const otherUser = await User.findOne({
          where: { username: from },
        });

        if (!otherUser) throw new UserInputError("User not found");

        const usernames = [user.username, otherUser.username];

        const messages = await Message.findAll({
          where: {
            from: { [Op.in]: usernames },
            to: { [Op.in]: usernames },
          },
          order: [["createdAt", "DESC"]],
        });

        return messages;
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching messages");
      }
    },
  },
  Mutation: {
    sendMessage: async (_, { to, content }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError("Not authenticated");
        }

        const recipient = await User.findOne({ where: { username: to } });

        if (!recipient) {
          throw new UserInputError("User not found");
        } else if (user.username === recipient.username) {
          throw new UserInputError("You cannot send message to yourself");
        }

        if (content.trim() === "") {
          throw new UserInputError("Message must not be empty");
        }

        const message = await Message.create({
          from: user.username,
          to,
          content,
        });

        return message;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
