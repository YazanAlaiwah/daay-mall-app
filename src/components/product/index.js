import React, { useEffect, useState } from 'react';
import BuyProductSlid from './buyProductSlide';
import BuyProductSided from './buyProductSided';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getProduct,
  addCart,
  addLike,
  addWishlist,
  payedUserCart,
} from '../../store/actions/products';
import ProductPreview from './product-preview';

// import BuyProductSecSlid from './buyProductSecSlide';
function ProductPage(props) {
  const products = props.match.params.id;
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    props.getProduct(products);
  }, []);
  function addToCart() {
    props.addCart({ products, quantity });
  }
  function addToWishlist() {
    props.addWishlist({ productID: products });
  }
  function addToLikes() {
    props.addLike({ productID: products });
  }
  return (
    <div className="App">
      <BuyProductSlid product={props.product} />
      <BuyProductSided
        product={props.product}
        actions={{ addToLikes, addToCart, addToWishlist }}
        pay={props.payedUserCart}
        quantity={quantity}
      />
      {/* <BuyProductSecSlid /> */}
      <ProductPreview product={props.product} />
    </div>
  );
}

const mapToState = (state) => ({
  product: state.product,
});
const actionsCreater = (dispatch) => ({
  getProduct: (id) => dispatch(getProduct(id)),
  addCart: (body) => dispatch(addCart(body)),
  addLike: (body) => dispatch(addLike(body)),
  addWishlist: (body) => dispatch(addWishlist(body)),
  payedUserCart: (body) => dispatch(payedUserCart(body)),
});
export default connect(mapToState, actionsCreater)(withRouter(ProductPage));
