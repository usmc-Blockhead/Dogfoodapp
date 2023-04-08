const express = require('express');
const foodRouter = express.Router();
const Food = require("../models/foods");

foodRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res, next) => {
    Food.find()
            .then((foods) => {
                res.statusCode = 200;
                res.json(foods);
            })
            .catch((err) => next(err));
})
.post((req, res, next) => {
    Food.create(req.body)
            .then((food) => {
                console.log("Food Created ", food);
                res.statusCode = 200;
                res.json(food);
            })
            .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /food');
})
.delete((req, res) => {
    Food.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.json(response);
            })
            .catch((err) => next(err));
});

foodRouter.route('/:foodId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res) => {
    Food.findById(req.params.foodId)
            .then((food) => {
                res.statusCode = 200;
                res.json(food);
            })
            .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
        res.end(
            `POST operation not supported on /foods/${req.params.foodId}`
        );
})
.put((req, res) => {
    Food.findByIdAndUpdate(
        req.params.foodId,
        {
            $set: req.body,
        },
        { new: true }
    )
        .then((food) => {
            res.statusCode = 200;
            res.json(food);
        })
        .catch((err) => next(err));
})
.delete((req, res) => {
    Food.findByIdAndDelete(req.params.foodId)
            .then((response) => {
                res.statusCode = 200;
                res.json(response);
            })
            .catch((err) => next(err));
});
module.exports = foodRouter;