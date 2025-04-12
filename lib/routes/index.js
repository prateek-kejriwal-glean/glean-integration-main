const Router = require('express').Router
const router = Router()
const searchController = require('../controllers').search
const authController = require('../controllers').auth
const chatController = require('../controllers').chat
const answersController = require('../controllers').answers


router.get('/answers', answersController.getAnswers)
router.get('/search', searchController.searchDocuments)
router.get('/auth/authorize', authController.createAuthToken)
router.get('/auth/sendToIDP', authController.redirectToOkta)
router.get('/auth/getGleanToken', authController.getGleanToken)
router.get('/auth/whoAmI', authController.whoAmI)

router.post('/chat', chatController.chat)
router.get('/chat', chatController.listChats)
router.delete('/chat', chatController.deleteChat)









module.exports = router


