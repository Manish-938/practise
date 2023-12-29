const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "djhfgxvajyfvjufyfcukeygc";

module.exports.validateToken = async (req, res) => {
  try {
    const { token } = req.body;
    jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
      console.log("token error", error);
      console.log("token decoded", decoded);
    });

    // let data = {
    //   name: "Manish",
    //   userId: 12,
    // };

    // const token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: 30 });  // exp in seconds

    return res.send({
      status: 200,
      data: { token: token },
    });
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 400,
      mesaage: `error ${error}`,
    });
  }
};
