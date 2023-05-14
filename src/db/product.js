const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
import { hash } from "../utils/hash";

class Product extends Model {}

Product.init(
  {
    _id: {
      type: DataTypes.STRING,
      unique: true,
    },
    nomor: {
      type: DataTypes.STRING,
      unique: true,
    },
    oprator: {
      type: DataTypes.ENUM(
        "axis",
        "im3",
        "as",
        "halo",
        "simpati",
        "xl",
        "three",
        "smartfren"
      ),
      validate: {
        isIn: {
          args: [
            [
              "axis",
              "im3",
              "as",
              "halo",
              "simpati",
              "xl",
              "three",
              "smartfren",
            ],
          ],
          msg: "Invalid value for oprator",
        },
      },
    },
    kategori: {
      type: DataTypes.ENUM(
        "ilufa-168",
        "seri-tahun",
        "ulang-tahun",
        "triple",
        "kuartet",
        "panca",
        "hexa",
        "sapta",
        "okta",
        "nona",
        "urut-4",
        "urut-5",
        "urut-6",
        "urut-7",
        "urut-8",
        "urut-9",
        "double-AA",
        "double-aaa",
        "double-aaaa",
        "double-aaaaa",
        "double-ab",
        "double-abc",
        "double-abcd",
        "double-abcde",
        "double-abcdef",
        "triple-aa",
        "triple-aaa",
        "triple-ab",
        "triple-abc",
        "kuartet-aa",
        "kuartet-ab",
        "panca-ab",
        "eskalator",
        "tangga",
        "maju-mapan"
      ),
      validate: {
        isIn: {
          args: [
            [
              "ilufa-168",
              "seri-tahun",
              "ulang-tahun",
              "triple",
              "kuartet",
              "panca",
              "hexa",
              "sapta",
              "okta",
              "nona",
              "urut-4",
              "urut-5",
              "urut-6",
              "urut-7",
              "urut-8",
              "urut-9",
              "double-AA",
              "double-aaa",
              "double-aaaa",
              "double-aaaaa",
              "double-ab",
              "double-abc",
              "double-abcd",
              "double-abcde",
              "double-abcdef",
              "triple-aa",
              "triple-aaa",
              "triple-ab",
              "triple-abc",
              "kuartet-aa",
              "kuartet-ab",
              "panca-ab",
              "eskalator",
              "tangga",
              "maju-mapan",
            ],
          ],
          msg: "Invalid value for kategori",
        },
      },
    },
    digit: {
      type: DataTypes.INTEGER,
    },
    jenisProduk: {
      type: DataTypes.ENUM("termurah", "terbaik", "false"),
      validate: {
        isIn: {
          args: [["termurah", "terbaik", "false"]],
          msg: "Invalid value for jenisProduk",
        },
      },
    },
    harga: {
      type: DataTypes.STRING,
    },
    asMaduraTarifLama: {
      type: DataTypes.ENUM("true", "false"),
      validate: {
        isIn: {
          args: [["true", "false"]],
          msg: "Invalid value for asMaduraTarifLama",
        },
      },
    },
    asPlayMania: {
      type: DataTypes.ENUM("true", "false"),
      validate: {
        isIn: {
          args: [["true", "false"]],
          msg: "Invalid value for asPlayMania",
        },
      },
    },
    promo: {
      type: DataTypes.ENUM("couple", "buy 2 get 3", "false"),
      defaultValue: "false",
      validate: {
        isIn: {
          args: [["couple", "buy2get3", "false"]],
          msg: "Invalid value for promo",
        },
      },
    },
    promoId: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "product",
  }
);

Product.afterCreate(async (product) => {
  await Product.update(
    { _id: hash(product.id) },
    { where: { id: product.id } }
  );
});

export default Product;
