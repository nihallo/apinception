
import mongoose from 'mongoose';

const masterData = mongoose.Schema({ strict: false })

var MasterData = mongoose.model('MasterData', masterData);

export default MasterData;