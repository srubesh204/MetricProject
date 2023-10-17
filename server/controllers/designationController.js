const designationModel = require("../models/designationModel")

const designationControllers = {
    getAllDesignation: async (req, res) => {
        try {
            const designationResult = await designationModel.find();
            res.status(200).json(designationResult);
            //res.status(200).json(employees);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on Designation');
        }
    },
    createDesignation: async (req, res) => {

        try {
            const { designation } = req.body;
            const designationResult = new designationModel({ designation });
            await designationResult.save();
            res.status(201).json(designationResult);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error on Designation' });
        }
    }
}
module.exports = designationControllers;