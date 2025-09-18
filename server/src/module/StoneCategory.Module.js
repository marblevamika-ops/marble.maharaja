import mongoose from "mongoose";

// Sub-schema for individual category type
const stoneCategoryTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    }
});


// Main schema for Stone Category
const stoneCategorySchema = new mongoose.Schema({
    stoneCategoryName: {
        type: String,
        required: true
    },
    categoryTypes: {
        type: [stoneCategoryTypeSchema],
        default: []
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('StoneCategory', stoneCategorySchema);
