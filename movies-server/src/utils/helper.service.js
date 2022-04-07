const axiosController = require("./axios.controller");
const jwt = require('jsonwebtoken');


 const getValidBasicToken = async() => {
   let result = await axiosController.ConsumeServiceApi("POST", `http://localhost:49160/auth`,
   {
      "username": "basic-thomas",
      "password": "sR-_pcoow-27-6PAwCD8"
  });
  return result.token
 }

 const getValidPremuimToken = async() => {
    let result = await axiosController.ConsumeServiceApi("POST", `http://localhost:3000/auth`,
    {
        "username": "premium-jim",
        "password": "GBLtTyq3E_UNjFnpo9m6"
      });
   return result.token
  }


  const jwtDecoder =  async (token) => {
   let user = await  jwt.verify(token, process.env.JWT_SECRET) ;
   return user
}

  module.exports = {
   basicToken : getValidBasicToken,
   premiumToken : getValidPremuimToken,
   jwtDecoder
  }