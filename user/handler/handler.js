const UserDb = require("../model/model");
const bcrypt = require("bcrypt");


const register = async (req, h) => {
  try {
    const { nama, email, password } = req.payload;



    const getData = await UserDb.query().where({ email });
    if (getData.length !== 0) {
      const res = h.response({
        message: "Data sudah terdaftar!",
      });
      res.code(400);
      return res;
    }

    var newPwd = await bcrypt.hashSync(password, 5);

    await UserDb.query().insert({
      nama,
      email,
      password: newPwd,
    });

    const res = h.response({
      message: "User berhasil terdaftar",
    });

    res.code(200);
    return res;
  } catch (error) {
    const res = h.response({
      errMessage: error.message,
    });
    res.code(500);
    return res;
  }
};

const login = async (req, h) => {
  try {
    const { email, password } = req.payload;

    const cekdata = await UserDb.query().where({ email });
    if (cekdata === []) {
      const res = h.response({
        message: "User belum terdaftar!",
      });

      res.code(200);
      return res;
    }

    const getdata = await UserDb.query().where({ email });

    const cekPwd = bcrypt.compareSync(password, getdata[0].password);
    if (!cekPwd) {
      const res = h.response({
        message: "Password anda salah!",
      });

      res.code(200);
      return res;
    }

    const res = h.response({
      message: "Login berhasil",
      nama: getdata[0].nama,
      email: getdata[0].email,
    });
    
    res.code(200);
    return res;
  } catch (error) {
    const res = h.response({
      errMessage: error.message,
    });
    res.code(500);
    return res;
  }
};

const displayData = async (req, h) => {
  try {
    const {email} = req.params;

    const cekdata = await UserDb.query().where({ email });
    if (cekdata === []) {
      const res = h.response({
        message: "User belum terdaftar!",
      });

      res.code(200);
      return res;
    }

    const result = await UserDb.query().where({ email });
    res = h.response(result);
    res.code(200);
    return res;
  } catch (error) {
    const res = h.response({
      errMessage: error.message,
    });
    res.code(500);
    return res;
  }
};

module.exports = {
    register,
    login,
    displayData
}
