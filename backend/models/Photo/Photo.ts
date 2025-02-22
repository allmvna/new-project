import mongoose from "mongoose";

const Schema  = mongoose.Schema;

const photoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});

const Photo = mongoose.model("Photo", photoSchema);
export default Photo;