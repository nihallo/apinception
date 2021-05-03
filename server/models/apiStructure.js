import mongoose from 'mongoose';

const apiStructureSchema = mongoose.Schema({
    apiName: String,
    apiCode: String,
    apiStructureText: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var ApiStructure = mongoose.model('ApiStructure', apiStructureSchema);

export default ApiStructure;