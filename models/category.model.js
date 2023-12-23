//const { delete } = require("../routes/category.route");
const db = require("../utils/db");
const tbl_categories = "loaisp";
module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_categories}`);
  },
  allDetails: function () {
    return db.load(
      `SELECT c.*,COUNT(p.masp)AS num_of_products 
      FROM loaisp c LEFT JOIN sanpham p ON c.maloai=p.maloai 
      GROUP BY c.maloai,c.tenloai`
    );
  },
  danhmuc0: function () {
    return db.load(
      `SELECT c.*,COUNT(p.masp)AS num_of_products 
      FROM loaisp c LEFT JOIN sanpham p ON c.maloai=p.maloai 
      WHERE madm=0 GROUP BY c.maloai,c.madm `
    );
  },
  danhmuc1: function () {
    return db.load(
      `SELECT c.*,COUNT(p.masp)AS num_of_products 
      FROM loaisp c LEFT JOIN sanpham p ON c.maloai=p.maloai 
      WHERE madm=1 GROUP BY c.maloai,c.madm `
    );
  },
  danhmuc2: function () {
    return db.load(
      `SELECT c.*,COUNT(p.masp)AS num_of_products 
      FROM loaisp c LEFT JOIN sanpham p ON c.maloai=p.maloai 
      WHERE madm=2 GROUP BY c.maloai,c.madm `
    );
  },
};
