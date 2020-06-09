import gql from "graphql-tag";


export default gql`
  extend type Query {
    allMatches: [Match]
    match(id: ID!): Match!
  }

  type Match {
    id: ID!
    home: String!
    homeImage: String
    away: String!
    awayImage: String
    home_score: Int
    away_score: Int
    stadium: String
    date: String
    matchweek: Matchweek

  }
`