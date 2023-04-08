const express = require('express');
const recipientRouter = express.Router();
const Recipient = require("../models/recipients");

recipientRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res, next) => {
    Recipient.find()
            .then((recipients) => {
                res.statusCode = 200;
                res.json(recipients);
            })
            .catch((err) => next(err));
})
.post((req, res, next) => {
    Recipient.create(req.body)
            .then((recipient) => {
                console.log("Recipient Created ", recipient);
                res.statusCode = 200;
                res.json(recipient);
            })
            .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipient');
})
.delete((req, res) => {
    Recipient.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.json(response);
            })
            .catch((err) => next(err));
});

recipientRouter.route('/:recipientId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res) => {
    Recipient.findById(req.params.recipientId)
            .then((recipient) => {
                res.statusCode = 200;
                res.json(recipient);
            })
            .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
        res.end(
            `POST operation not supported on /recipients/${req.params.recipientId}`
        );
})
.put((req, res) => {
    Recipient.findByIdAndUpdate(
        req.params.recipientId,
        {
            $set: req.body,
        },
        { new: true }
    )
        .then((recipient) => {
            res.statusCode = 200;
            res.json(recipient);
        })
        .catch((err) => next(err));
})
.delete((req, res) => {
    Recipient.findByIdAndDelete(req.params.recipientId)
            .then((response) => {
                res.statusCode = 200;
                res.json(response);
            })
            .catch((err) => next(err));
});
module.exports = recipientRouter;