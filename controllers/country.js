const countryModel = require("../Models/country");
const cityModel = require("../Models/city");

module.exports.addCountry = async (req, res) => {
  try {
    const { name, currency } = req.body;

    const newCountry = new countryModel({ name, currency });

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

module.exports.countryList = async (req, res) => {
  try {
    const allCountry = await countryModel.find({});

    const countrydata = await countryModel.aggregate([
      {
        $lookup: {
          from: "city",
          localField: "_id",
          foreignField: "countryId",
          as: "cityData",
        },
      },
    ]);

    return res.send({
      status: 200,
      data: countrydata,
      //   data: allCountry,
    });
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 400,
      mesaage: `error ${error}`,
    });
  }
};
