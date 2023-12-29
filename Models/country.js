const { Schema, model } = require("mongoose");

const countrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = new model("country", countrySchema);
