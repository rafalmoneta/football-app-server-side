import gql from "graphql-tag";


export default gql`
  extend type Query {
    season: [Matchweek]
  } 

  type Matchweek {
    id: ID!
    number: Int!
    matches: [Match!]
  }
`