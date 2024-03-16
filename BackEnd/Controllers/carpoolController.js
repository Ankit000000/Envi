const carpoolcollection = require('../Models/carpoolModel');
const mongoose = require('mongoose');


const get_all_carpool_Info_without_auth = async (req, res) => {
    try {
        const all_carpool_info = await carpoolcollection.find().sort({ createdAt: -1 });
        res.status(200).json(all_carpool_info);
    } catch (error) {
        console.error("Error fetching carpool information:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}




const get_all_carpool_Info = async (req, res) => {
    try {
        const user_id = req.user._id;
        const all_carpool_info = await carpoolcollection.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(all_carpool_info);
    } catch (error) {
        console.error("Error fetching carpool information:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}




const get_a_single_carpool_Info = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'No such carpool Post exists or the id is incorrect'});
    }

    const single_carpool_post = await carpoolcollection.findById(id);

    if(!single_carpool_post){
        return res.status(400).json({err: 'No such carpool post exists'});
    }
    else{
        res.status(200).json(single_carpool_post);
    }
}




const create_a_new_carpool_Post = async (req, res) => {
    const { title, body, days, starting_location, ending_location, interval, cost, vehicle_type, seater, stops } = req.body;

    let emptyFields = [];

    if (!days) {
        emptyFields.push('days');
    }
    if (!starting_location) {
        emptyFields.push('starting_location');
    }
    // Add additional field validations here if required

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all the required fields", emptyFields });
    }

    try {
        const user_id = req.user._id;
        const new_carpool_post = await carpoolcollection.create({
            title,
            body, 
            days, 
            starting_location, 
            ending_location, 
            interval, 
            cost, 
            vehicle_type, 
            seater, 
            stops,
            user_id
        });
        res.status(200).json(new_carpool_post);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}





const delete_a_carpool_Post = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid carpool post ID' });
        }

        const deletedCarpoolPost = await carpoolcollection.findOneAndDelete({ _id: id });

        if (!deletedCarpoolPost) {
            return res.status(404).json({ error: 'No carpool post found with the provided ID' });
        }

        res.status(200).json({ message: 'Carpool post deleted successfully', deletedCarpoolPost });
    } catch (error) {
        console.error('Error deleting carpool post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




const update_a_carpool_Post = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ err: 'Invalid carpool post ID' });
    }

    try {
        const updatedFields = { ...req.body }; // Extract fields from request body
        const existing_carpool_post = await carpoolcollection.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );

        if (!existing_carpool_post) {
            return res.status(404).json({ err: 'No carpool post found with the provided ID' });
        }

        res.status(200).json(existing_carpool_post);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}





module.exports = {get_all_carpool_Info_without_auth, get_all_carpool_Info, get_a_single_carpool_Info, create_a_new_carpool_Post, delete_a_carpool_Post, update_a_carpool_Post};