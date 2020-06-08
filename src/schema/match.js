import gql from "graphql-tag";


export default gql`
  extend type Query {
    allMatches: [Match]
    match(id: ID!): Match!
  }

  type Match {
    id: ID!
    home: String!
    away: String!
    home_score: Int
    away_score: Int
    result: String
    date: String
    matchweek: Matchweek

  }
`