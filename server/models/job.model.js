import { model, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    experienceNeeded: {
      type: Number,
      required: true,
      min: 0,
    },
    appliedDate: { type: Date, required: true },
    link: { type: String },
  },
  { timestamps: true }
);

export const Job = model("Job", jobSchema);
