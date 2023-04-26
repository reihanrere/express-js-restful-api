import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "first_name not provided "],
    },
    last_name: {
        type: String,
    },
    username: {
        type: String,
        required: [true, "username not provided "],
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: [true, "Please specify user role"]
    },
    refresh_token: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

usersSchema.virtual('full_name')
    .get(function () {
        return this.first_name + " " + this.last_name;
    });
usersSchema.set('toObject', { virtuals: true })
usersSchema.set('toJSON', { virtuals: true })



export default mongoose.models.users || mongoose.model('users', usersSchema);