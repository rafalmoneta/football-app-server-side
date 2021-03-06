import 'dotenv/config';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

const getTokenForUser = async req => {
  const token = req.headers['x-token'];
 
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');
 
    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => {
    const userToken = await getTokenForUser(req);
 
    return {
      models,
      userToken,
      secret: process.env.SECRET,
    };
  },
  
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages(new Date());
  }

  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});

const createUsersWithMessages = async date => {
  await models.User.create(
    {
      username: 'rmoneta',
      email: 'hello@rmoneta.com',
      password: 'password123',
      role: 'ADMIN',
      messages: [
        {
          text: 'Hello there!',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'lmessi',
      email: 'hello@lmessi.com',
      password: 'messi123',
      role: 'ADMIN',
      messages: [
        {
          text: 'Happy to release ...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
        {
          text: 'Published a complete ...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.Team.create(
    {
      name: 'FC Barcelona',
      stadium: 'Camp Nou',
      about: 'String',
      colours: "String",
      imageURL: "https://i.imgur.com/p8zqNbR.png",
      players: [
        {
          name: 'Leo Messi',
          number: 10,
          position: 'RW',
          bornAt: '1987-06-24',
          imageURL: 'https://i.imgur.com/QiiE9Dw.png'
        },
        {
          name: "Frankie De Jong",
          position: "CDM",
          number: 21,
          bornAt: "1990-09-19",
          imageURL: "https://futhead.cursecdn.com/static/img/20/players_alt/p134446430.png"
        },
      ]
    },
    {
      include: [models.Player],
    },
  );

  await models.Team.create(
    {
      name: 'Real Madrid',
      stadium: 'Santiago Bernabeu',
      about: 'String',
      colours: "String",
      imageURL: "https://i.imgur.com/IOjA6Wu.png",
      players: [
        {
          name: 'Karim Benzema',
          number: 10,
          position: 'ST',
          bornAt: '1987-06-24',
          imageURL: 'https://www.pngitem.com/pimgs/m/522-5222180_karim-benzemarender-getafe-vs-real-madrid-2019-hd.png'
        },
      ]
    },
    {
      include: [models.Player],
    },
  );

  await models.Matchweek.create(
    {
      number: 1,
      matches: [
        {
          home: 'FC Barcelona',
          away: 'Real Madryt',
          home_score: 6,
          away_score: 2,
        },
        {
          home: 'Manchester United',
          away: 'Manchester City',
          home_score: 0,
          away_score: 3,
        }
      ]
    },
    {
      include: [models.Match],
    },
  )

  await models.Matchweek.create(
    {
      number: 2,
      matches: [
        {
          home: 'FC Barcelona',
          away: 'Real Madryt',
          home_score: 6,
          away_score: 2,
        },
        {
          home: 'Manchester United',
          away: 'Manchester City',
          home_score: 0,
          away_score: 3,
        }
      ]
    },
    {
      include: [models.Match],
    },
  )
};