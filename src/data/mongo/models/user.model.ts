import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,

    },
    password_hash: {
        type: String,
        required: [true, 'password hash is required']
    },
}, {
    collection: 'Users' // Set a custom collection name if needed
}
)



export const UserModel = mongoose.model('User', userSchema);