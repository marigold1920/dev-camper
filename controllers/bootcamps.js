const Bootcamp = require("../models/Bootcamp");
const asyncHanlder = require("../middlewares/async");
const geocoder = require("../utils/geocoder");

/**
 *
 * @description Get all bootcamps
 * @route GET /api/v1.0/bootcamps
 * @access Public
 */
exports.getBootcamps = asyncHanlder(async (request, response) => {
    const requestQuery = { ...request.query };
    const page = parseInt(requestQuery.page) || 1;
    const limit = parseInt(requestQuery.limit) || 10;
    const offset = (page - 1) * limit;
    const removeFields = ["select", "sort", "page", "limit"];

    removeFields.forEach(param => delete requestQuery[param]);

    let queryString = JSON.stringify(requestQuery).replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        match => `$${match}`
    );

    let query = Bootcamp.find(JSON.parse(queryString)).populate("courses");

    // FIltering fields
    if (request.query.select) {
        const fields = request.query.select.split(",").join(" ");
        query = query.select(fields);
    }

    // Sort all bootcamps
    if (request.query.sort) {
        const sortedBys = request.query.sort.split(",").join(" ");
        query = query.sort(sortedBys);
    } else {
        query = query.sort("-createdAt");
    }

    // Pagination
    query = query.skip(offset).limit(limit);

    const bootcamps = await query;

    response.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});

/**
 *
 * @description Get a bootcamp by id
 * @route GET /api/v1.0/bootcamps/:id
 * @access Public
 */
exports.getBootcamp = asyncHanlder(async (request, response) => {
    const bootcamp = await Bootcamp.findById(request.params.id).populate("courses");

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
exports.createBootcamp = asyncHanlder(async (request, response) => {
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
exports.updateBootcamp = asyncHanlder(async (request, response) => {
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
exports.deleteBootcamp = asyncHanlder(async (request, response) => {
    const bootcamp = await Bootcamp.findById(request.params.id);

    bootcamp.remove();

    response.status(200).json({
        success: true,
        data: {}
    });
});

/**
 * @description Get bootcamps within a radius
 * @route GET /api/v1.0/bootcamps/radius/:zipcode/:distance
 * @access PUBLIC
 */
exports.getBootcampsInRadius = asyncHanlder(async (request, response) => {
    const { zipcode, distance } = request.params;
    const location = await geocoder.geocode(zipcode);
    const { latitude, longitude } = location[0];
    const radius = distance / 3963;
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[longitude, latitude], radius] } }
    });

    response.status(200).json({
        success: 200,
        data: bootcamps
    });
});
