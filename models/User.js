const { Module } = require('module');
const { MongoGridFSChunkError } = require('mongodb');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    }
  }
);

const User = model('User', UserSchema);

module.exports = User;