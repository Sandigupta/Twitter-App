const Tweet = require('../model/tweet');

class tweetRepository{
    async create(data){
          try {
              const tweet=await Tweet.create(data);
              return tweet;
          } catch (error) {
            console.log(error)
          }
    }
    
    // Updating a tweet by its ID and returning the updated document using { new: true } option in findByIdAndUpdate()
    async update(tweetId, data) {
        try {
            const tweet = await Tweet.findByIdAndUpdate(tweetId, data, { new: true });
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id) {
          try {
              const response = await Tweet.findById(id);
              return response;
          } catch (error) {
              console.log(error);
          }
    }
    
    // We use `.populate('comments')` to replace the comment IDs in the 'comments' field
    // with the actual comment documents from the database. This allows us to access the
    // full comment details (like text, author, etc.) directly, instead of just their ObjectIds.

    async getWithComments(id) {
          try {
              const tweet = await Tweet.findById(id).populate({ path: 'comments' });
              return tweet;
          } catch (error) {
              console.log(error);
          }
    }

    async destroy(id) {
        try {
            const response = await Tweet.findByIdAndRemove(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = tweetRepository;