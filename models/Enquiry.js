import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    checked:{
        type: Boolean,
        default: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", enquirySchema);