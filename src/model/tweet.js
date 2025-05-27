const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    userEmail: {
        type: String,

    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
}, { timestamps: true });

// Defines a virtual property 'contentWithEmail' that combines the tweet content with the creator's email.
// Virtuals are not stored in the database — they are computed properties available when using .toObject() or .toJSON().
tweetSchema.virtual("contentWithEmail").get(function () {
    return this.content + "\n Created by: " + this.userEmail;
})

tweetSchema.pre('save', function (next) {
    console.log("Inside the Hook");
    // this.content=this.content+"....."
    
})

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
