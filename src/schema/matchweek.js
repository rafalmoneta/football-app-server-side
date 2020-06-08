import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    season: [Matchweek]
    matchweek(id: ID!): Matchweek!
  } 

  type Matchweek {
    id: ID!
    number: Int!
    matches: [Match!]
  }
`