const { Schema, model } = require("mongoose");

const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    countryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "country",
    },

    //   categoryDetails: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  },
  { versionKey: false }
);

module.exports = model("city", citySchema);
