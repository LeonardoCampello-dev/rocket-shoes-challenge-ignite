import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map((product) => ({
    ...product,
    formattedPrice: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      const { price, amount } = product;

      return sumTotal + price * amount;
    }, 0)
  );

  function handleProductIncrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 });
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label='product image' />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label='delete icon' />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map((product) => {
            const {
              id,
              title,
              formattedPrice,
              amount,
              image,
              subTotal,
            } = product;

            return (
              <tr data-testid='product' key={id}>
                <td>
                  <img src={image} alt={title} />
                </td>
                <td>
                  <strong>{title}</strong>
                  <span>{formattedPrice}</span>
                </td>
                <td>
                  <div>
                    <button
                      type='button'
                      data-testid='decrement-product'
                      disabled={product.amount <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type='text'
                      data-testid='product-amount'
                      readOnly
                      value={amount}
                    />
                    <button
                      type='button'
                      data-testid='increment-product'
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{subTotal}</strong>
                </td>
                <td>
                  <button
                    type='button'
                    data-testid='remove-product'
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </ProductTable>

      <footer>
        <button type='button'>Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
