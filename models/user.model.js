//const { delete } = require("../routes/category.route");
const db = require("../utils/db");
const tbl_Users = "khachhang";
const data = [];

module.exports = {
  //hàm lấy danh sách users từ table
  all: function () {
    return db.load(`select *from ${tbl_Users}`);
  },
  //
  all_id: function (makh) {
    return db.load(`select *from ${tbl_Users} where makh =${makh}`);
  },
  //them username khách hàng
  add_kh: function (entity) {
    return db.insert_kh(tbl_Users, entity);
  },
  //dung await phair dung async 
  singleUserName: async function (username) {
    const rows = await db.load(
      `select * from ${tbl_Users} where username = '${username}'`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  //sua
  single: function (makh) {
    return db.load(`select *from ${tbl_Users} where makh =${makh}`);
  },
  //capnhat
  patch: function (entity) {
    const condition = {
      makh: entity.makh,
    };
    delete entity.makh;
    return db.update_kh(tbl_Users, entity, condition);
  },
  //xoa
  del: function (makh) {
    const condition = { makh };
    return db.delete_kh(tbl_Users, condition);
  },
};
