const ErrorRespone = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @description Get courses
 * @route GET /api/v1.0/courses
 * @route GET /api/v1.0/bootcamps/:bootcampId/courses
 * @access Public
 */
exports.getCourses = asyncHandler(async (request, response) => {
    let query;

    if (request.params.bootcampId) {
        query = Course.find({ bootcamp: request.params.bootcampId });
    } else {
        query = Course.find().populate({
            path: "bootcamp",
            select: "name description"
        });
    }

    const courses = await query;

    response.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});

/**
 * @description Get single course
 * @route GET /api/v1.0/courses/:id
 * @access Public
 */
exports.getCourse = asyncHandler(async (request, response) => {
    const course = await Course.findById(request.params.id).populate({
        path: "bootcamp",
        select: "name description"
    });

    response.status(200).json({
        success: true,
        data: course
    });
});

/**
 * @description Save single course
 * @route POST /api/v1.0/bootcamps/:bootcampId/courses/
 * @access Private
 */
exports.saveCourse = asyncHandler(async (request, response, next) => {
    request.body.bootcamp = request.params.bootcampId;
    await Bootcamp.findById(request.params.bootcampId);
    const course = await Course.create(request.body);

    response.status(200).json({
        success: true,
        data: course
    });
});

/**
 * @description Update single course
 * @route PUT /api/v1.0/courses/:id
 * @access Private
 */
exports.updateCourse = asyncHandler(async (request, response) => {
    const course = await Course.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
    });

    response.status(200).json({
        success: true,
        data: course
    });
});

/**
 * @description Delete single course by id
 * @route DELETE /api/v1.0/courses/:id
 * @access Private
 */
exports.deleteCourse = asyncHandler(async (request, response, next) => {
    const course = await Course.findById(request.params.id);
    await course.remove();

    response.status(200).json({
        success: true,
        data: {}
    });
});
