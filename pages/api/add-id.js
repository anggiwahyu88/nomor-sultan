import Product from "../../src/db/product";
import { hash } from "../../src/utils/hash";

export default async function addId(req, res) {
  try {
    const products = await Product.findAll();
    products.map(async (product) => {
      await Product.update(
        { _id: hash(product.dataValues.id) },
        { where: { id: product.dataValues.id } }
      );
    });

    const product = await Product.findAll();
    res.status(200).json({
      product,
    });
  } catch (err) {
    throw err;
  }
}
