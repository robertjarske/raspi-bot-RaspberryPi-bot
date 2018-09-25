'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
if (!process.env.PORT) {
  require('dotenv').config();
}

/* Database */
const DATABASE_CONNECTION = process.env.MONGODB_URI || `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.MONGO_DEV_DB}`;

const SECRET = {
  secret: 'superSecretCat'
};

exports.DATABASE_CONNECTION = DATABASE_CONNECTION;
exports.SECRET = SECRET;