
const team = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    name:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A Team has to have a name!',
        },
      },
    },
    stadium:{
      type: DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    colours:{
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.STRING,
    },
    imageURL: {
      type: DataTypes.STRING,
      // validate: {
      //   isUrl: {
      //     args: true,
      //     msg: 'String is not URL type!'
      //   }
      // }
    }
  });

  Team.associate = models => {
    Team.hasMany(models.Player, { onDelete: 'CASCADE' })
  }

  return Team;
}

export default team;