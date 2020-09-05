const express = require("express");
const {
    getCourses,
    getCourse,
    saveCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/courses");
const { update } = require("../models/Course");
const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(saveCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
