import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    text: {
        type: String
    },
    freq: {
        type: Number
    }
},
{timestamps: true})

const collection = mongoose.model('recentSearches', schema)

export default class recentSearchModel {
    constructor(){
        this.collection = collection
    }

    // add a searchText
    async updateSearchText (searchText) {
        // find searchText, if not present the create one otherwise update previous freq
        const doc = await this.collection.findOneAndUpdate({text: searchText}, 
        { $inc: { freq: 1 } }, // Increment freq by 1
        {
            new: true,
            upsert: true // this create a new document if not present
        })

        setTimeout(async () => {
            // calculate size of collection as we have to maintain 10 document only
            const size = await this.collection.countDocuments()

            // remove the document with least frequency if collection have more than 10 docs

            if(size > 10) {
                const leastFreqDoc = await this.collection.findOne({}).sort({'freq': 1})

                // now delete it
                await this.collection.deleteOne({_id: leastFreqDoc._id})
            }
        }, 10);

        return doc
    }

    // return searchList by userId
    async getSearchList () {
        const searchList = await this.collection.find({}).sort({'freq': -1})
        return searchList
    }
}