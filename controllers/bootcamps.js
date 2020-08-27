const Bootcamp = require("../models/Bootcamp");

/**
 *
 * @description Get all bootcamps
 * @route GET /api/v1.0/bootcamps
 * @access Public
 */
exports.getBootcamps = async (request, response, next) => {
    try {
        const bootcamps = await Bootcamp.find();

        response.status(200).json({
            success: true,
            data: bootcamps
        });
    } catch (error) {
        next(error);
    }
};

/**
 *
 * @description Get a bootcamp by id
 * @route GET /api/v1.0/bootcamps/:id
 * @access Public
 */
exports.getBootcamp = async (request, response, next) => {
    try {
        const bootcamp = await Bootcamp.findById(request.params.id);

        response.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (error) {
        next(error);
    }
};

/**
 *
 * @description Create bootcamp
 * @route POST /api/v1.0/bootcamps
 * @access Private
 */
exports.createBootcamp = async (request, response, next) => {
    try {
        const bootcamp = await Bootcamp.create(request.body);

        response.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (error) {
        next(error);
    }
};

/**
 *
 * @description Update a bootcamp by id
 * @route PUT /api/v1.0/bootcamps/:id
 * @access Private
 */
exports.updateBootcamp = async (request, response, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true
        });

        response.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (error) {
        next(error);
    }
};

/**
 *
 * @description Delete a bootcamp by id
 * @route DELETE /api/v1.0/bootcamps/:id
 * @access Private
 */
exports.deleteBootcamp = async (request, response, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(request.params.id);

        response.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
