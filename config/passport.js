const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

passport.use(new LocalStrategy(async (userName, password, done) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                userName: userName,
            }
        });

        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}))


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: id,
            }
        });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;