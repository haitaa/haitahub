import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    profilePictureUrl?: string;
    coverPhotoUrl?: string;
    followersCount?: number;
    followingCount?: number;
    postsCount?: number;
    verified?: boolean;
    isPrivate?: boolean;
    status?: string;
    lastLoginAt?: Date;
    lastPasswordReset?: Date;
    languagePreference?: { type: "string", default: "en" },
    timezone?: { type: "string", default: "UTC"  },
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: "string",
            required: true,
            unique: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please use a valid email address.",
            ],
            maxLength: 255,
        },
        username: {
            type: "string",
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 50,
        },
        password: { type: "string", required: true, minLength: 8, maxLength: 100 },
        firstName: { type: "string", maxLength: 50 },
        lastName: { type: "string", maxLength: 50 },
        bio: { type: "string", maxLength: 160 },
        profilePictureUrl: { type: "string", default: "/images/default-profile-picture.jpg" },
        coverPhotoUrl: { type: "string", default: "/images/default-cover-photo.jpg" },
        followersCount: { type: "number", default: 0 },
        followingCount: { type: "number", default: 0 },
        postsCount: { type: "number", default: 0 },
        verified: { type: "boolean", default: false },
        isPrivate: { type: "boolean", default: false },
        status: { type: "string", enum: ["active", "suspended", "banned"], default: "active" },
        lastLoginAt: { type: Date },
        lastPasswordReset: { type: Date },
        languagePreference: { type: "string", default: "en" },
        timezone: { type: "string", default: "UTC"  },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre<IUser>('save', async function (next) {
    const user = this;

    // Only hash the password if it has been mofidied (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch(error: any) {
        next(error);
    }
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
}

const User = model<IUser>('User', UserSchema);

export default User;
