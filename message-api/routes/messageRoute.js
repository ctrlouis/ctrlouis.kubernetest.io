"use strict";


import express from 'express';
import { MessageController } from '../controllers/MessageController.js';
const router = express.Router();

router.get('/', MessageController.all);

router.post('/', MessageController.create);

export default router;
