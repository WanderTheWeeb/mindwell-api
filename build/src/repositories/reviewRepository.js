"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
var db_1 = require("../config/db");
var tryCatchHelper_1 = require("../helpers/tryCatchHelper");
var schema_1 = require("../config/db/schema");
var drizzle_orm_1 = require("drizzle-orm");
var ReviewRepository = /** @class */ (function () {
    function ReviewRepository() {
    }
    ReviewRepository.prototype.addReview = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, tryCatchHelper_1.tryCatchHelper)(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!data)
                                        throw new Error('Review data is missing');
                                    return [4 /*yield*/, db_1.db.insert(schema_1.review).values({
                                            score: data.score,
                                            comment: data.comment,
                                            appointmentId: data.appointmentId,
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ReviewRepository.prototype.getReviews = function (id, type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, tryCatchHelper_1.tryCatchHelper)(function () { return __awaiter(_this, void 0, void 0, function () {
                        var isUser, joinCondition, reviews;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!id)
                                        throw new Error('User ID is missing');
                                    if (!type)
                                        throw new Error('User type is missing');
                                    isUser = type === 'user';
                                    joinCondition = isUser
                                        ? schema_1.appointment.userId
                                        : schema_1.appointment.psychologistId;
                                    return [4 /*yield*/, db_1.db
                                            .select({
                                            id: schema_1.review.id,
                                            score: schema_1.review.score,
                                            comment: schema_1.review.comment,
                                            appointmentId: schema_1.review.appointmentId,
                                        })
                                            .from(schema_1.review)
                                            .leftJoin(schema_1.appointment, (0, drizzle_orm_1.eq)(schema_1.appointment.id, schema_1.review.appointmentId))
                                            .leftJoin(schema_1.user, (0, drizzle_orm_1.eq)(schema_1.user.id, joinCondition))
                                            .where((0, drizzle_orm_1.eq)(schema_1.user.id, id))];
                                case 1:
                                    reviews = _a.sent();
                                    if (!reviews)
                                        throw new Error('No reviews found');
                                    return [2 /*return*/, reviews];
                            }
                        });
                    }); })];
            });
        });
    };
    return ReviewRepository;
}());
exports.ReviewRepository = ReviewRepository;
