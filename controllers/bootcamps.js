const Bootcamp = require("../models/Bootcamp");
const asyncHanlder = require("../middlewares/async");

/**
 *
 * @description Get all bootcamps
 * @route GET /api/v1.0/bootcamps
 * @access Public
 */
exports.getBootcamps = asyncHanlder(async (request, response, next) => {
    const bootcamps = await Bootcamp.find();

    response.status(200).json({
        success: true,
        data: bootcamps
    });
});

/**
 *
 * @description Get a bootcamp by id
 * @route GET /api/v1.0/bootcamps/:id
 * @access Public
 */
exports.getBootcamp = asyncHanlder(async (request, response, next) => {
    const bootcamp = await Bootcamp.findById(request.params.id);

    response.status(200).json({
        success: true,
        data: bootcamp
    });
});

/**
 *
 * @description Create bootcamp
 * @route POST /api/v1.0/bootcamps
 * @access Private
 */
exports.createBootcamp = asyncHanlder(async (request, response, next) => {
    const bootcamp = await Bootcamp.create(request.body);

    response.status(201).json({
        success: true,
        data: bootcamp
    });
});

/**
 *
 * @description Update a bootcamp by id
 * @route PUT /api/v1.0/bootcamps/:id
 * @access Private
 */
exports.updateBootcamp = asyncHanlder(async (request, response, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
    });

    response.status(200).json({
        success: true,
        data: bootcamp
    });
});

/**
 *
 * @description Delete a bootcamp by id
 * @route DELETE /api/v1.0/bootcamps/:id
 * @access Private
 */
exports.deleteBootcamp = asyncHanlder(async (request, response, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(request.params.id);

    response.status(200).json({
        success: true,
        data: {}
    });
});
