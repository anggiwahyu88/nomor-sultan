import Product from "../db/product";

export async function getPromoId(nomor1, nomor2, nomor3, promo, promoId) {
  try {
    const product = await Product.findAll({
      where: { nomor: [nomor1, nomor2, nomor3] },
      attributes: ["id", "promoId"],
    });

    const idProducts = {
      product: product[0]?.id || null,
      product1: product[1]?.id || null,
      product2: product[2]?.id || null,
    };

    const promoIdProducts = {
      product: product[0]?.promoId || null,
      product1: product[1]?.promoId || null,
      product2: product[2]?.promoId || null,
    };

    if (
      (promo === "couple" && idProducts.product1 && idProducts.product) ||
      (promo === "buy2get3" &&
        idProducts.product &&
        idProducts.product1 &&
        idProducts.product2)
    ) {
      if (
        (promoIdProducts.product === promoId ||
          promoIdProducts.product === "0") &&
        (promoIdProducts.product1 === promoId ||
          promoIdProducts.product1 === "0") &&
        (promo === "couple" ||
          promoIdProducts.product2 === promoId ||
          promoIdProducts.product2 === "0")
      ) {
        const currentDate = new Date();
        const id = `${
          promo +
          idProducts.product +
          idProducts.product1 +
          currentDate.getTime()
        }`;
        let result = "";
        const characters = id.split("");
        const charactersLength = characters.length;
        for (let i = 0; i < charactersLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.splice(randomIndex, 1)[0];
        }
        return result;
      }
      return false;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
