const express = require('express');
const donorRouter = express.Router();
const Donor = require("../models/donors");

donorRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res, next) => {
    Donor.find()
            .then((donors) => {
                res.statusCode = 200;
                res.json(donors);
            })
            .catch((err) => next(err));
})
.post((req, res, next) => {
    Donor.create(req.body)
            .then((donor) => {
                console.log("Donor Created ", donor);
                res.statusCode = 200;
                res.json(donor);
            })
            .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /donor');
})
.delete((req, res) => {
    Donor.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.json(response);
            })
            .catch((err) => next(err));
});

donorRouter.route('/:donorId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res) => {
    Donor.findById(req.params.donorId)
            .then((donor) => {
                res.statusCode = 200;
                res.json(donor);
            })
            .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
        res.end(
            `POST operation not supported on /donors/${req.params.donorId}`
        );
})
.put((req, res) => {
    Donor.findByIdAndUpdate(
        req.params.donorId,
        {
            $set: req.body,
        },
        { new: true }
    )
        .then((donor) => {
            res.statusCode = 200;
            res.json(donor);
        })
        .catch((err) => next(err));
})
.delete((req, res) => {
    Donor.findByIdAndDelete(req.params.donorId)
            .then((response) => {
                res.statusCode = 200;
                res.json(response);
            })
            .catch((err) => next(err));
});
module.exports = donorRouter;