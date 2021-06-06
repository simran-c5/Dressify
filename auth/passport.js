const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../modals/userSchema');
// const Department = require('../../../WebDProjectSambhav/Doc-hub/apis/models/departmentSchema');
// const Teacher = require('../../../WebDProjectSambhav/Doc-hub/apis/models/teacherSchema');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'signup',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    },
        async function (req, email, password, done) {
            const userData = req.body;
            console.log(email);
            try {
                await User.findOne({ email: email }).then(user => {
                    if (user != null) {
                        return done(null, false, { message: 'User already exists' });
                    }
                    else {
                        const user = new User({
                            name: userData.name,
                            email: email,
                            password: password
                        });
                        user.save().then((user) => {
                            delete user.password;
                            return done(null, user, { message: 'User Created' });
                        })
                    }
                })
            }
            catch (err) {
                done(err);
            }
        }
    )
)

passport.use(
    'signin',
    new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },async(email,password,done)=>{
            try {
                User.findOne({email:email}).then(async(user)=>{
                    if(!user){
                        done(null,false,{message:"User not found"});
                    }
                    else{
                        const validate = await user.isPasswordValid(password);
                        console.log(validate);
                        if (!validate) {
                            return done(null, false, { message: 'Wrong Password' });
                          }
                          delete user.password;
                          return done(null, user, { message: 'Logged in Successfully' });
                    }
                })

            } catch (error) {
                done(error);
            }
    })
)

passport.use(
    new JWTstrategy({
        secretOrKey:'doc-hubJwtSecret',
        jwtFromRequest:ExtractJWT.fromHeader('authorization'),
        // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },async (token,done)=>{
        console.log("helli jain");
        try {
            console.log("hello",token);
            if(token){
                let email = token.user;
                console.log(email);
                if(email){
                    let user = await User.findOne({email:email});
                    done(null,user); 
                }
            }
            else{
                console.log('helllo');
                done(null,false);
            }
           
        } catch (error) {
            done(error,false);
        }
    })
)
