import { tryCatch } from "../../utility.js";
import recentSearchModel from "./recentSearches.modal.js";

export default class recentSearchController {
    constructor () {
        this.model = new recentSearchModel()
    }

    // add searchText
    addSearchText = async (req, res, next) => {
        // get the searchText from query
        const { searchText } = req.query

        const doc = await tryCatch(() => this.model.updateSearchText(searchText), next)

        if(doc)
            res.status(201).send('added SearchText')
    }

    getSearchList = async (req, res, next) => {
        const searchList = await tryCatch(() => this.model.getSearchList(), next)

        res.status(200).send(searchList)
    }

}   