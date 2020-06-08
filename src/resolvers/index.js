import { GraphQLDateTime } from 'graphql-iso-date';
 
import userResolvers from './user';
import messageResolvers from './message';
import teamResolvers from './team';
import playerResolvers from './player';
import matchResolvers from './match';
import matchweekResolvers from './matchweek';
 
const customScalarResolver = {
  Date: GraphQLDateTime,
};
 
export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  teamResolvers,
  playerResolvers,
  matchResolvers,
  matchweekResolvers,
];