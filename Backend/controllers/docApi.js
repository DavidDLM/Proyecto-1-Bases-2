const express = require("express");
const Doc = require("../models/documentsModel");

const singlePostController = async (req, res) => {
    const {author, title, duration, likes, dislikes, iframe, description} =
        req.body;
    const doc = new Doc({
        author,
        title,
        duration,
        reactions: {likes, dislikes},
        iframe,
        description,
    });

    try {
        const data = await doc.save();

        res.status(200).send({
            msg: "Document Saved Successfully!",
            data: {
                ...data._doc,
            },
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

const getQueryController = async (req, res) => {
    try {
        const docs = await Doc.find({});

        res.status(200).send({
            // query,
            status: 200,
            docCount: docs.length,
            data: docs,
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            msg: err,
        });
    }
};

const getSingleDocController = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await Doc.findById(id);
        res.status(200).json({
            status: 200,
            data: doc,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Something is wrong. Please try again!",
            deletedCount: 0,
        });
    }
};

const deleteDocController = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await Doc.findById(id);

        const data = await Doc.deleteOne({_id: id});
        if (data?.deletedCount) {
            res.status(200).json({
                status: 200,
                msg: "Delete Successful.",
                deletedCount: 1,
            });
        } else {
            res.status(424).json({
                status: 424,
                msg: "Delete Unsuccessful! Doc not found.",
                deletedCount: 0,
            });
        }
    } catch (err) {
        res.status(424).json({
            status: 424,
            msg: "Delete Unsuccessful! Please try again.",
            deletedCount: 0,
        });
    }
};

const updateDocController = async (req, res) => {
    const id = req.params.id;
    const {author, title, duration, likes, dislikes, iframe, description} =
        req.body;

    try {
        const doc = await Doc.findById(id);
        const fields = {
            author,
            title,
            duration,
            reactions: {likes, dislikes},
            iframe,
            description,
        };

        const newDoc = await Doc.findOneAndUpdate(
            {_id: id},
            {$set: fields},
            {new: true}
        );

        res.status(200).json({
            status: 200,
            msg: "Document Updated Successfully!",
            fields: fields,
            data: newDoc,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Something is wrong. Please try again!",
        });
    }
};

module.exports = {
    singlePostController,
    getQueryController,
    deleteDocController,
    getSingleDocController,
    updateDocController,
};
