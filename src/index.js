const express = require('express');
const app = express();

const connect = require('./config/databases');
// const model = require('./model/tweet');
const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./model/comment');



app.listen(3000, async () => {
    console.log("Server running at port 3000");
    await connect();
    console.log('Mongodb connected');
    // const tweet = await model.create({
    //     content: "",
    //     userEmail:"a@b.com"
    // })
    // console.log(tweet);
    // tweet.comments.push({ content: 'first comment here' });
    // await tweet.save();
    // console.log(tweet);

    const tweetRepo = new TweetRepository();
    // const tweet = await tweetRepo.create({ content: 'Tweet with comment schema' });
    // const comment = await Comment.create({ content: 'new comment' });
    // tweet.comments.push(comment);
    // await tweet.save();
    // console.log(tweet);
    const tweet = await tweetRepo.getWithComments('67f531392ff463fc7a1dcc65');
    console.log(tweet);
})