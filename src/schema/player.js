import { gql } from "apollo-server-express";


export default gql`
  extend type Query {
    players: [Player!]
    playersByTeam(teamId: ID!): [Player!]
    player(id: ID!): Player
  }

  extend type Mutation {
    deletePlayer(id: ID!): Boolean
    addPlayer(input: NewPlayerInput!): Player!
  }
  
  type Player {
    id: ID!
    name: String!
    number: Int
    bornAt: String!
    team: Team!
    position: String
    imageURL: String
  }

  input NewPlayerInput {
    name: String!
    number: Int
    bornAt: String!
    position: String
    teamId: ID!
  }
`
