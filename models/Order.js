import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    shopName: String,
    address: String,
    order: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);