import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
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

const User = models.User || model("User", UserSchema);

export default User;
