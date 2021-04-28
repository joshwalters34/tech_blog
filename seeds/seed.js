const sequelize = require('../config/connection');
// const User = require('./userData');
// const Post = require('./postData')
const { User, Post } = require('../models');

const userData = require('./userData.json');
// const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // await Post.bulkCreate(postData, {
  //   individualHooks: true,
  //   returning: true,
  // })
   

  process.exit(0);
};

seedDatabase();
