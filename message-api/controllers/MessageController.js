"use strict";


import { ConnectionFactory } from '../schema/ConnectionFactory.js';
import { MessageSchema, MessageModel } from '../schema/MessageSchema.js';


export class MessageController {

    /**
     * Fetch all messages
     * @param {*} req 
     * @param {*} res 
     */
    static all(req, res) {
        ConnectionFactory.connect();
        
        MessageModel.find({}, function (err, messages) {
            if (err) return handleError(err);
            res.json(messages);
        });
    }

    static create(req, res) {
        ConnectionFactory.connect();
        
        if (typeof req.body.text === 'undefined') {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Bad request : one or more parameters are missing"
                }
            });
        }

        let username;
        if (typeof req.body.text === 'undefined') {
            username = null;
        } else {
            username = req.body.username;
        }

        const date = Date.now();

        const Message = new MessageModel({
            username: username,
            text: req.body.text,
            date: date
        });

        Message.save((err) => {
            if (err) {
                res.status(500).json({
                    error: {
                        code: 400,
                        message: `Error when saving : ${JSON.stringify(this.message)}`
                    }
                });
            };

            res.json(Message);
        });

    }

}