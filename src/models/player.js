const player = (sequelize, DataTypes) => {
  const Player = sequelize.define('player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    number: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true,
    },
    bornAt: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    position: {
      type: DataTypes.STRING,
    }
  });
 
  Player.associate = models => {
    Player.belongsTo(models.Team);
  };

  return Player;
};
 
export default player;