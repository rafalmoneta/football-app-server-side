
const matchweek = (sequelize, DataTypes) => {
  const Matchweek = sequelize.define('matchweek', {
    number: {
      type: DataTypes.INTEGER,
    },
  });

  Matchweek.associate = models => {
    Matchweek.hasMany(models.Match, { onDelete: 'CASCADE' });
  };

  return Matchweek;
}

export default matchweek;