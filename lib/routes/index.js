const Router = require('express').Router
const router = Router()
const searchController = require('../controllers').search
const authController = require('../controllers').auth
const chatController = require('../controllers').chat



router.get('/search', searchController.searchDocuments)
router.post('/getAuthTokenForEmail', authController.createAuthToken)
router.post('/chat', chatController.chat)
router.get('/chat', chatController.listChats)



module.exports = router


