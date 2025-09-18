import express from 'express';
import { getAllContactForm, submitContactForm } from '../controllers/contact.Controller.js';

const router = express.Router();

router.post('/submit-contact', submitContactForm);
router.get('/get-contact-form-data', getAllContactForm);

export default router;
