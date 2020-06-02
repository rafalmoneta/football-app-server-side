
export default {
  Query: {
    teams: async(_, __, {models}) => {
      return await models.Team.findAll();
    },
    team: async(_, { id }, {models}) => {
      return await models.Team.findByPk(id);
    }
  },

  Mutation: {
    addTeam: async(_, {input}, {models}) => {
      return await models.Team.create(input);
    },
    deleteTeam: async(_, {id}, {models}) => {
      return await models.Team.destroy({
        where: {id},
      });
    },
  },

  Team: {
    players: async (team, _, {models}) => {
      return await models.Player.findAll({
        where: {
          teamId: team.id
        }
      })
    }
  }
}