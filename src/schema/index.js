import { gql } from 'apollo-server-express';
 
import userSchema from './user';
import messageSchema from './message';
import teamSchema from './team';
import playerSchema from './player';
import matchSchema from './match';
import matchweekSchema from './matchweek';

const linkSchema = gql`
  scalar Date


  type Query {
    _: Boolean
  }
 
  type Mutation {
    _: Boolean
  }
 
  type Subscription {
    _: Boolean
  }
`;
 
export default [linkSchema, userSchema, messageSchema, teamSchema, playerSchema, matchSchema, matchweekSchema];