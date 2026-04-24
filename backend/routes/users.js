import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
router.use(authMiddleware);

router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateProfile);
router.put('/preferences', userController.updatePreferences);
router.post('/change-password', userController.changePassword);
router.delete('/delete-account', userController.deleteAccount);

export default router;