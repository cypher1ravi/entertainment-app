const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    firebaseId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    bookmark: [String],
});

// Hash the password before saving
// userSchema.pre('save', async function (next) {
//     const user = this;
// if (!user.isModified('password')) return next();
// const hash = await bcrypt.hash(user.password, 10);
// user.password = hash;
// next();
// });

// Compare passwords
// userSchema.methods.comparePassword = function (candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
