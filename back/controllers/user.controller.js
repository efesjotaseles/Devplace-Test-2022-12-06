const usersSchema = require("../models/user.model");

const createUser = async (req, res) => {
    console.log(req.body);
    const user = usersSchema(req.body);
  
  user
    .save()
    .then((data) => {
      res.json(`SAVED USER: ${data}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {createUser};