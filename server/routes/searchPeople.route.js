import { Router } from 'express'
const router = Router()
import searchPeopleController from '../controllers/searchPeople.controller.js'

router.post('/search-people', searchPeopleController)

export default router
