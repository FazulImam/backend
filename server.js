const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config({ path: "./config/.env" });

const errorHandler = require("./middlewares/error");

const sequelize = require("./config/database");
const User = require("./models/User");
const Obituary = require("./models/Obituary");
const Mortuary = require("./models/Mortuary");
// const Florist = require("./models/Florist");

const authRoutes = require("./routes/authRoutes");
const mortuaryRoutes = require("./routes/mortuaryRoutes");
const orbituaryRoutes = require("./routes/obituaryRoutes");

const app = express();

const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use(cors());
app.use(multer({ storage, fileFilter }).single("image"));

app.use("/auth", authRoutes);
app.use("/mortuary", mortuaryRoutes);
app.use("/orbituary", orbituaryRoutes);

app.use(errorHandler);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("running on port Number " + port);
});

User.hasMany(Obituary, {
  foreignKey: "userId",
});

Obituary.belongsTo(User, {
  foreignKey: "userId",
});

Mortuary.hasMany(Obituary, {
  foreignKey: "mortuaryId",
});

Obituary.belongsTo(Mortuary, {
  foreignKey: "mortuaryId",
});
