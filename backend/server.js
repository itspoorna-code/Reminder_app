const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connection successfull");
  })
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
