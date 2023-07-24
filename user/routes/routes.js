const { register, login, displayData } = require('../handler/handler')

module.exports = [
  {
    method: "POST",
    path: "/user/register",
    handler: register,
  },
  {
    method: "POST",
    path: "/user/login",
    handler: login,
  },
  {
    method: "GET",
    path: "/user/{email}",
    handler: displayData,
  },
];