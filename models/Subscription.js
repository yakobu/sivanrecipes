const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
    endpoint: String,
    keys: Schema.Types.Mixed,
    createDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});


SubscriberSchema.methods.toJSON = function () {
    return {
        endpoint: this.endpoint,
        keys: this.keys,
        createDate: this.createDate,
        id: this._id
    };
};


const Subscription = mongoose.model('subscribers', SubscriberSchema);

module.exports = Subscription;