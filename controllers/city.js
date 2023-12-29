const countryModel = require("../Models/country");
const cityModel = require("../Models/city");
const mongoose = require("mongoose");

function ObjectId(id) {
  const _id = new mongoose.Types.ObjectId(id);
  return _id;
}

module.exports.addCity = async (req, res) => {
  try {
    const { name, countryId } = req.body;

    const newCountry = new cityModel({ name, countryId });

    const result = await newCountry.save();

    console.log("result", result);

    return res.send({
      status: 200,
      data: {},
    });
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 400,
      mesaage: `error ${error}`,
    });
  }
};

module.exports.cityList = async (req, res) => {
  try {
    const { countryId } = req.body;

    // const newData = await cityModel.aggregate([
    //   {
    //     $lookup: {
    //       from: "countries",
    //       localField: "countryId",
    //       foreignField: "_id",
    //       as: "countryData",
    //     },
    //   },
    //   {
    //     $match: {
    //       $and: [{ countryId: ObjectId(countryId) }],
    //     },
    //   },
    // ]);

    // const newData = await cityModel.find({ countryId }).populate("countryId");
    const newData = await cityModel.find({}).lean();

    return res.send({
      status: 200,
      data: newData,
    });
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 400,
      mesaage: `error ${error}`,
    });
  }
};
