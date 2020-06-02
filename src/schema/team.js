import { gql } from "apollo-server-express";


export default gql`
  extend type Query {
    teams: [Team!]
    team(id: ID!): Team
  }

  extend type Mutation {
    addTeam(input: NewTeamInput!): Team!
    deleteTeam(id: ID!): Boolean
  }

  type Team {
    id: ID!
    name: String!
    stadium: String!
    about: String
    colours: String
    imageURL: String
    players: [Player!]
  }

  input NewTeamInput {
    name: String!
    stadium: String!
    about: String
    colours: String
    imageURL: String
  }


`