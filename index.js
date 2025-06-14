import express from 'express';
import sequelize from './config/db.js';


const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, from the backend!');
});


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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});