import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
});

(async () => {
  await sequelize.sync({ alter: true }); // or { force: true } for dev only
  console.log("Database synced!");
})();

// Connect to the database
// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Models synchronized successfully");
  })
  .catch((err) => {
    console.error("Model sync failed:", err);
  });

export default sequelize;
