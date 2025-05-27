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

    // .lean() tells Mongoose to return a plain JavaScript object instead of a full Mongoose document.
    // This improves performance and allows direct manipulation of the data without Mongoose overhead.

    async getWithComments(id) {
          try {
              const tweet = await Tweet.findById(id).populate({ path: 'comments' }).lean();
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
    
    // Pagination: Fetches a specific subset of tweets instead of the entire collection.
    /*
    Pagination is the process of dividing large sets of data into smaller, manageable 
    chunks (or "pages") to improve performance and user experience. It allows clients 
    to request and view only a subset of results at a time, rather than fetching the entire dataset.
    */
    // .skip(offset) skips the first 'offset' number of tweets (used to go to the correct page).
    // .limit(limit) restricts the number of tweets returned to the 'limit' (used to control page size).
    async getAll(offset, limit) {
        try {
            const response = await Tweet.find().skip(offset).limit(limit);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = tweetRepository;