const db = require("../utils/db");
const tbl_products = "sanpham";

module.exports = {
  all: function () {
    return db.load(`select *from ${tbl_products}`);
  },
  seach_products: function () {
    return db.load(`SELECT DISTINCT sp.*
    FROM ((sanphamct ct INNER JOIN sanpham sp ON ct.masp = sp.masp) 
    INNER JOIN colors ON ct.color_id = colors.color_id 
    INNER JOIN sizes ON ct.size_id=sizes.size_id )
    WHERE ct.soluong > 0`);
  }, 
  //giam gia
  all_giamgia: function () {
    return db.load(`select * from giamgia`);
  },
  //cart//////////////
  single_cart: function (id, cl, si) {
    return db.load(`
    SELECT sp.*,colors.*,ct.* ,sizes.* 
    FROM ((sanphamct ct INNER JOIN sanpham sp ON ct.masp = sp.masp) 
    INNER JOIN colors ON ct.color_id = colors.color_id 
    INNER JOIN sizes ON ct.size_id=sizes.size_id ) 
    WHERE sp.masp = ${id} AND ct.color_id=${cl} AND ct.size_id=${si}`);
  },
  //cart//////////////
  single_carts: function (id) {
    return db.load(`SELECT ct.*,sp.*
    FROM sanphamct ct INNER JOIN sanpham sp ON ct.masp=sp.masp
    WHERE ct.sp_id=${id} `);
  },

  //detail start///
  detail_ct: function (masp, color, size) {
    return db.load(`SELECT sanpham.*,colors.*,sanphamct.* ,sizes.* 
    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.masp) 
    INNER JOIN colors ON sanphamct.color_id = colors.color_id 
    INNER JOIN sizes ON sanphamct.size_id=sizes.size_id ) 
    WHERE sanphamct.masp=${masp} `);
  },
  detail_anh: function (id) {
    return db.load(`SELECT ct.*,sp.*
    FROM sanpham sp JOIN anhct ct ON sp.masp=ct.masp
    WHERE ct.masp=${id}`);
  },
  //lọc color
  distinct_color: function (id) {
    return db.load(`SELECT DISTINCT colors.color_id,colors.color
    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.masp) 
    INNER JOIN colors ON sanphamct.color_id = colors.color_id ) 
    WHERE sanpham.masp=${id} AND sanphamct.soluong >0`);
  },
  //lọc size
  distinct_size: function (id) {
    return db.load(`SELECT DISTINCT sizes.* 
    FROM ((sanphamct INNER JOIN sanpham ON sanphamct.masp = sanpham.masp) 
    INNER JOIN sizes ON sanphamct.size_id = sizes.size_id ) 
    WHERE sanpham.masp=${id} AND sanphamct.soluong >0
    order by sizes.size_id ASC`);
  },
  //size
  detail_size: function (id) {
    return db.load(`SELECT sizes.*,ct.color_id,ct.soluong, ct.sp_id
    FROM ((sanphamct ct INNER JOIN sanpham sp ON ct.masp = sp.masp) 
    INNER JOIN sizes ON ct.size_id = sizes.size_id ) 
    WHERE sp.masp=${id} AND ct.soluong >0`);
  },
  detail: function (id) {
    return db.load(`select *from ${tbl_products} where masp =${id}`);
  },
  //giam gia
  detail_gg: function (id) {
    return db.load(`select sanpham.*,giamgia.*
    from sanpham INNER JOIN giamgia ON sanpham.masp=giamgia.makm
    where masp =${id}`);
  },
  //giam gai
  detail_ggg: function () {
    return db.load(`select giamgia.* from giamgia`);
  },
  size: function () {
    return db.load(`select * from sizes`);
  },
  //detail end///

  /*  allByCat: function (maloai) {
    return db.load(`select *from ${tbl_products} where maloai =${maloai}`);
  }, */
  //loại danh mục sản phẩm
  pageByCat: function (maloai, limit, offset) {
    return db.load(
      `SELECT DISTINCT sp.*
      FROM ((sanpham sp INNER JOIN sanphamct ct ON ct.masp=sp.masp)
            INNER JOIN loaisp ON sp.maloai= loaisp.maloai)
       where loaisp.maloai =${maloai} limit ${limit} offset ${offset}`
    );
  },
  //tất cả bé gái
  pageByCat_gai: function (limit, offset) {
    return db.load(
      `select DISTINCT sanpham.*
      from ((sanpham INNER JOIN loaisp ON sanpham.maloai=loaisp.maloai)
            INNER JOIN danhmuc ON loaisp.madm=danhmuc.madm
           	INNER JOIN sanphamct ON sanpham.masp=sanphamct.masp)
      where loaisp.madm=0 AND sanphamct.soluong > 0
      order by sanpham.masp DESC
      limit ${limit} offset ${offset}`
    );
  },
   //tất cả bé trai
   pageByCat_trai: function (limit, offset) {
    return db.load(
      `select DISTINCT sanpham.*
      from ((sanpham INNER JOIN loaisp ON sanpham.maloai=loaisp.maloai)
            INNER JOIN danhmuc ON loaisp.madm=danhmuc.madm
           	INNER JOIN sanphamct ON sanpham.masp=sanphamct.masp)
      where loaisp.madm=1 AND sanphamct.soluong > 0
      order by sanpham.masp DESC
      limit ${limit} offset ${offset}`
    );
  },
  // ten loai
  tenloai: function (maloai) {
    return db.load(
      `select *from loaisp where maloai=${maloai}`
    );
  },
  // ten loai danh muc
  all_dm: function () {
    return db.load(`select *from danhmuc`);
  },
  //new loại danh mục be gai
  pageloai0: function (madm,limit, offset) {
    return db.load(
      `select DISTINCT sanpham.*
      from ((sanpham INNER JOIN loaisp ON sanpham.maloai=loaisp.maloai)
            INNER JOIN danhmuc ON loaisp.madm=danhmuc.madm
            INNER JOIN sanphamct ON sanpham.masp=sanphamct.masp)
      where loaisp.madm=${madm} AND sanphamct.soluong >0
      order by sanpham.masp DESC
      limit ${limit} offset ${offset}`
    );
  },
  //sản phẩm mới
  allProduct: function (limit, offset) {
    return db.load(
      `SELECT DISTINCT sp.*
      FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.masp 
      WHERE ct.soluong > 0
      order by sp.masp DESC limit ${limit} offset ${offset}`
    );
  },
  //sản phẩm giảm giá
  giam_gia: function () {
    return db.load(
      `select gg.*,sp.*
      from giamgia gg INNER JOIN sanpham sp ON gg.makm=sp.masp
      order by makm DESC`
    );
  },
   //sản phẩm mới
   newProduct: function () {
    return db.load(
      `SELECT DISTINCT sp.*
      FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.masp
      WHERE ct.soluong > 0
      order by sp.masp DESC limit 10 offset 0`
    );
  },

  //phan trang
  pageByHome: function (maloai, limit, offset) {
    return db.load(
      `select *from ${tbl_products} limit ${limit} offset ${offset}`
    );
  },
  /* countByCat: async function () {
    const rows = await db.load(`select count(*) as total from ${tbl_products}`);
    return rows[0].total;
  }, */
  countByCat: async function () {
    return db.load(`SELECT DISTINCT sp.*
    FROM sanpham AS sp INNER JOIN sanphamct AS ct ON ct.masp=sp.masp 
    WHERE ct.soluong > 0
    order by sp.masp`);
  },
  
  
  countByLoai: async function (maloai) {
    const rows = await db.load(
      `select count(*) as total from ${tbl_products} where maloai =${maloai}`
    );
    return rows[0].total;
  },
  //All_sanpham_loai
  countByLoai0: function (madm) {
    return db.load(`select DISTINCT sanpham.* 
    from ((sanpham INNER JOIN loaisp ON sanpham.maloai=loaisp.maloai) 
            INNER JOIN danhmuc ON loaisp.madm=danhmuc.madm 
            INNER JOIN sanphamct ON sanphamct.masp=sanpham.masp) 
      where loaisp.madm=${madm} AND sanphamct.soluong >0`);
  },
  
  //all_san pham loại bé gái
  countByLoai_gai: function () {
    return db.load(
      `select DISTINCT sanpham.*
      from ((sanpham INNER JOIN loaisp ON sanpham.maloai=loaisp.maloai)
                  	INNER JOIN danhmuc ON loaisp.madm=danhmuc.madm
           			LEFT JOIN sanphamct ct ON sanpham.masp=ct.masp)
            where loaisp.madm=0 AND ct.sp_id IS NOT NULL AND ct.soluong >0`
    );
  },
  //all_san pham loại bé trai
  countByLoai_trai: function () {
    return db.load(
      `select DISTINCT sanpham.*
      from ((sanpham INNER JOIN loaisp ON sanpham.maloai=loaisp.maloai)
                  	INNER JOIN danhmuc ON loaisp.madm=danhmuc.madm
           			LEFT JOIN sanphamct ct ON sanpham.masp=ct.masp)
            where loaisp.madm=1 AND ct.sp_id IS NOT NULL AND ct.soluong >0`
    );
  },


};
