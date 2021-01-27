import { Document, Schema, model } from 'mongoose';
// const { Schema, model} = require('mongoose');
// const { Document} = require('mongoose');
const jwt = require('jsonwebtoken');
class ClassUser {
  _id: any
  email: string;
  username: String;
  password: String;
  profile_picture: String;
  owned_routes: string[]; // saving the route IDs (not whole object)
  saved_routes: string[];
  constructor(
  _id: any,
  email: string,
  username: String,
  password: String,
  profile_picture: String,
  owned_routes: string[], // saving the route IDs (not whole object)
  saved_routes: string[],
  ){
    this._id = _id,
    this.email=email,
    this.username=username,
    this.password=password,
    this.profile_picture=profile_picture,
    this.owned_routes=owned_routes
    this.saved_routes=saved_routes
  }
  generateAuthToken () {
    const token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWTPrivateKey,
      { expiresIn: '3d' }
    );
    return token;
  }  
}

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, default: null },
  owned_routes: { type: [{ type: String, ref: 'Route' }], default: [] },
  saved_routes: { type: [{ type: String, ref: 'Route' }], default: [] }
});

userSchema.method('generateAuthToken', ClassUser.prototype.generateAuthToken)
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.JWTPrivateKey,
//     { expiresIn: '3d' }
//   );
//   return token;
// };
export type Iuser = ClassUser & Document 

export default model<Iuser>('User', userSchema);
