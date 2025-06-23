import Sequelize from "sequelize";


const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
  logging: console.log,  
});




export default sequelize
