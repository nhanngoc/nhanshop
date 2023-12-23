"use strict";

//const { delete } = require("../routes/category.route");
var db = require("../utils/db");

var tbl_categories = "loaisp";
module.exports = {
  all: function all() {
    return db.load("select *from ".concat(tbl_categories));
  },
  allDetails: function allDetails() {
    return db.load("SELECT c.*,COUNT(p.masp)AS num_of_products \n      FROM loaisp c LEFT JOIN sanpham p ON c.maloai=p.maloai \n      GROUP BY c.maloai,c.tenloai");
  },
  danhmuc0: function danhmuc0() {
    return db.load("SELECT c.*,COUNT(p.masp)AS num_of_products \n      FROM loaisp c LEFT JOIN sanpham p ON c.maloai=p.maloai \n      WHERE madm=0 GROUP BY c.maloai,c.madm ");
  },
  danhmuc1: function danhmuc1() {
    return db.load("SELECT c.*,COUNT(p.masp)AS num_of_products \n      FROM loaisp c LEFT JOIN sanpham p ON c.maloai=p.maloai \n      WHERE madm=1 GROUP BY c.maloai,c.madm ");
  },
  danhmuc2: function danhmuc2() {
    return db.load("SELECT c.*,COUNT(p.masp)AS num_of_products \n      FROM loaisp c LEFT JOIN sanpham p ON c.maloai=p.maloai \n      WHERE madm=2 GROUP BY c.maloai,c.madm ");
  }
};