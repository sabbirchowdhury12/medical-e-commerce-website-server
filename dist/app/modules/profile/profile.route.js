"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = require("express");
const profile_controller_1 = require("./profile.controller");
const router = (0, express_1.Router)();
router
    // .post('/create-profile', ProfileController.updateProfile)
    .patch('/', profile_controller_1.ProfileController.updateProfile)
    .get('/:id', profile_controller_1.ProfileController.getProfile)
    .get('/', profile_controller_1.ProfileController.getProfiles)
    .delete('/', profile_controller_1.ProfileController.deleteProfile);
exports.profileRoutes = router;
