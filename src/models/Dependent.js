const mongoose = require('mongoose');

const DependentSchema = mongoose.Schema({
    type: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    gender: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
})

const Dependent = mongoose.model('dependents', DependentSchema);

module.exports = Dependent