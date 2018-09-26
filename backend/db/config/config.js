if (!process.env.PORT) {
  require('dotenv').config();
}

/* Database */
const DATABASE_CONNECTION = process.env.MONGODB_URI || `mongodb://${process.env.DB_USER}:${
  process.env.DB_PASSWORD
}@${process.env.MONGO_DEV_DB}`;

const SECRET = {
  secret: process.env.SECRET,
};

export { DATABASE_CONNECTION, SECRET };
