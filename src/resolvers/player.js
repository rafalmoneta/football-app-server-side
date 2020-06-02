export default {
  Query: {
    player: async(_, {id}, {models}) => {
      return await models.Player.findByPk(id)
    },
    players: async(_, __, {models}) => {
      return await models.Player.findAll();
    },
    playersByTeam: async(_, {teamId}, {models}) => {
      return await models.Player.findAll({
        where: {
          teamId
        }
      })
    }
  },

  Mutation: {
    addPlayer: async(_, {input}, {models}) => {
      return await models.Player.create(input);
    },

    deletePlayer: async(_, {id}, {models}) => {
      return await models.Player.destroy({
        where: {id},
      });
    },
  },

  Player: {
    team: async (player, _, {models}) => {
      return await models.Team.findByPk(player.teamId)
    }
  }
}