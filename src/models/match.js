
const match = (sequelize, DataTypes) => {
  const Match = sequelize.define('match', {
    home: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    away: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    home_score: {
      type: DataTypes.INTEGER
    },
    away_score: {
      type: DataTypes.INTEGER
    },
    awayImage: {
      type: DataTypes.STRING
    },
    homeImage: {
      type: DataTypes.STRING
    },
    stadium: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING
    },
  });

  Match.associate = models => {
    Match.belongsTo(models.Matchweek)
  };

  return Match;
};

export default match;