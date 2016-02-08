'use strict';

var User = require('../models/userModel');

var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var	userRouter = express.Router();

userRouter.route('/')
    .get(function (req, res) {
        User.find(function (err, user) {
            if (err) {
                return res.send(err);
            }
            res.json(user);
        });
    })

    .post(function (req, res) {
        var user = new User(req.body);
        User.save(function (err) {
            if (err) {
                return res.send(err);
            }
            res.send({message: 'Added a User Successfully'});
        });
    });

userRouter.route('/:id')
	.delete(function (req, res) {
		User.remove({_id: req.params.id}, function(err, event) {
			if (err) {
				 return res.send(err);
			}
		res.json({message: 'Successfully deleted the user'});
		});
	});

module.exports = userRouter;
