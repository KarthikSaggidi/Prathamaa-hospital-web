import mongoose from "mongoose";

const AppointmentSchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },

      mobile: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      gender: String,

      department: String,

      doctor: String,

      appointmentDate: String,

      appointmentTime: String,

      symptoms: String,

      status: {
        type: String,
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models
    .Appointment ||
  mongoose.model(
    "Appointment",
    AppointmentSchema
  );