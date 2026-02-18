import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: process.env.DISCORD_CALLBACK_URL!,
            scope: ['identify', 'email', 'guilds'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ discordId: profile.id });

                if (user) {
                    user.username = profile.username;
                    user.avatar = profile.avatar || undefined;
                    user.email = profile.email || undefined;
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;
                    await user.save();
                    return done(null, user);
                }

                user = new User({
                    discordId: profile.id,
                    username: profile.username,
                    avatar: profile.avatar,
                    email: profile.email,
                    accessToken,
                    refreshToken
                });

                await user.save();

                return done(null, user);
            } catch (err) {
                return done(err, undefined);
            }
        }
    )
);
