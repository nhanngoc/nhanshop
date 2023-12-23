//const { delete } = require("../routes/category.route");
const db = require("../utils/db");
const tbl_products = "sanpham";
const data = [];

module.exports = {
  //hàm lấy danh sách users từ table
  all: function () {
    return db.load(`select *from ${tbl_products}`);
  },
  //them username
  add: function (entity) {
    return db.add_user(tbl_products, entity);
  },
  //dung await phair dung async
  singlecart: async function (ids) {
    const rows = await db.load(
      `select * from ${tbl_products} where masp in '${ids}'`
    );
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
    return db.patch(tbl_Users, entity, condition);
  },
  //xoa
  del: function (makh) {
    const condition = { makh };
    return db.del(tbl_Users, condition);
  },
};
