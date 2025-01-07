import Router from 'express'
import recentSearchController from './recentSearches.controller.js'

const controller = new recentSearchController()
const router = new Router()

// rs -> recommend searchText
router.route('/')
.post(controller.addSearchText)
.get(controller.getSearchList)

export default router