import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';
import Sequelize from 'sequelize';


// The client shouldn't care about the format or the actual value of the cursor, so we'll ask the cursor with a hash function that uses a base64 encoding
const toCursorHash = string => Buffer.from(string).toString('base64');
 
const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    messages: async (_, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {};
 
      const messages = await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });
  
      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;
  
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString()
          ),
        },
      };
    },

    message: async (_, { id }, { models }) => {
      return await models.Message.findByPk(id);
    },
  },
 
  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (_, { text }, { models, userToken }) => {
        return await models.Message.create({
          text,
          userId: userToken.id,
        });
      },
    ),
 
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (_, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      },
    ),
  },
 
  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findByPk(message.userId);
    },
  },
};