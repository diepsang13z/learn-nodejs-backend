'use strict';

const express = require('express');
const router = express.Router();

const { asyncHandler } = require('../../middlewares/requestHandler.middleware');
const accessController = require('../../controllers/access.controller');

// url mapping
router.post('/shop/signup', asyncHandler(accessController.signUp));
router.post('/shop/login', asyncHandler(accessController.login));

module.exports = router;
