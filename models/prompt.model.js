import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    }
},
   { timestamps: true } // Add this line to enable timestamps
)

const Prompt = models.Prompt || model('Prompt', PromptSchema)
export default Prompt;