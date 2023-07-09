const { Schema, model } = require('mongoose');
const joi = require('joi');
const handleMongoosError = require('../helpers/handleMongooseError');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
    avatarURL: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post('save', handleMongoosError);

const registerSchema = joi.object({
  password: joi.string().min(8).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),
});

const loginSchema = joi.object({
  password: joi.string().min(8).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),
});

const updateSubscriptionSchema = joi.object({
  subscription: joi.valid('starter', 'pro', 'business').required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = { User, schemas };
