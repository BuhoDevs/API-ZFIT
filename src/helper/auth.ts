// import passport from "passport";
// import { IUser } from '../interfaces/IUser';
// import User from '../models/User';
// import { ParamsAuth } from '../interfaces/IGoogle';

// const GoogleStrategy = require('passport-google-oauth2').Strategy;


// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id: any, done) => {
//   User.findByPk(id).then((user) => {
//     done(null, user);
//   });
// });


// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL,
//   passReqToCallback: true
// },
//   async function (
//     // { req, accessToken, refreshToken, profile, done }:
//     // ParamsAuth
//     _req: any, _accessToken: any, _refreshToken: any, profile: any, done: any
//   ) {
//     // console.log("profile:", profile)
//     try {
//       let user = await User.findOne({
//         where: {
//           googleId: profile.id
//         }
//       })
//       if (user) {
//         return done(null, user);
//       } else {
//         const newUser: IUser = {
//           googleId: profile.id,
//           user: profile.displayName,
//           email: profile.email,
//           password: "",
//           photo: profile.picture,
//         }
//         user = await User.create(newUser)
//         // console.log("NEW USER:", newUser)
//         return done(null, user);
//       }
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }
// ));
