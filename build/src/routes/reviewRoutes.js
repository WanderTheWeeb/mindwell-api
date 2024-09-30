"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var reviewController_1 = require("../controllers/reviewController");
var reviewService_1 = require("../services/reviewService");
var router = (0, express_1.Router)();
var reviewController = new reviewController_1.ReviewController(new reviewService_1.ReviewService());
router.post('/add', reviewController.addReview.bind(reviewController));
router.get('/', function (req, res) { return reviewController.getReview(req, res); });
exports.default = router;
