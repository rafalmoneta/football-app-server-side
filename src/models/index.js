import Sequelize from 'sequelize';
 
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team'),
  Player: sequelize.import('./player'),
  Match: sequelize.import('./match'),
  Matchweek: sequelize.import('./matchweek'),
};
 
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

 
export { sequelize };
export default models;