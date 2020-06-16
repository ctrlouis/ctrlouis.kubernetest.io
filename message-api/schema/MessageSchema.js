"use strict";

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const collection = 'messages';

export const MessageSchema = new Schema({
    username: {
        type: String,
        default: null
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export const MessageModel = mongoose.model(collection, MessageSchema);