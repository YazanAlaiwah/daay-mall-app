import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getSortingSetting } from '../../store/actions/products';

import { FaStar } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import './search.css';

function Sorting(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  // sortBy, sortPriceRange, sortRating

  let changeHandler = (e) => {
    let sortingName = e.target.name;
    let sortingValue = e.target.value;
    if (sortingName === 'sortby') {
      props.getSortingSetting(sortingValue, '', '');
    } else if (sortingName === 'rating') {
      props.getSortingSetting('', '', sortingValue);
    } else if (sortingName === 'priceRangeDropdown') {
      props.getSortingSetting('', sortingValue, '');
    } else if (sortingName === 'minPrice') {
      props.getSortingSetting('', sortingValue, '');
    } else if (sortingName === 'maxPrice') {
      props.getSortingSetting('', sortingValue, '');
    }
  };

  return (
    <div id='sorting-div'>
      <section class="sort-box-1">
        <h6 class="font-weight-bold form-field">Sort by:</h6>
        <div class='sortby-wrapper'>
          <Form.Check custom type='radio' id='custom-radio' label='PRICE' name='sortby' onChange={changeHandler} value='price' />
          <Form.Check custom type='radio' id='custom-radio' label='NEW' name='sortby' onChange={changeHandler} value='new'/>
          <Form.Check custom type='radio' id='custom-radio' label='TOP RANKED' name='sortby' onChange={changeHandler} value='top-ranked'/>
        </div>

      </section>

      <section class="sort-box-1">

        <h6 class="font-weight-bold form-field">Customer Reviews</h6>

        <div class="rating">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label>
                <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} onChange={changeHandler} />

                <FaStar class="star" color={ratingValue <= (hover || rating) ? '#7eabd6' : 'rgb(255, 255, 255)'} size={25} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} />
              </label>
            );
          })}
          {/* <p>{rating}</p> */}
        </div>
      </section>

      <section class="sort-box-1">

        <h6 class="font-weight-bold form-field">Price</h6>
        <select class="custom-select" name='priceRangeDropdown' onChange={changeHandler}>
          <option selected>Price range</option>
          <option value="0-25">UNDER 25$</option>
          <option value="25-50">$25 TO $50</option>
          <option value="50-100">$50 TO $100</option>
          <option value="100-200">$100 TO $200</option>
          <option value="200">$200 & ABOVE</option>

        </select>
        <div id='price-range'>

        </div>

        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">MIN</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Small" name='minPrice' aria-describedby="inputGroup-sizing-sm" onChange={changeHandler} />
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm" >MAX</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name='maxPrice' onChange={changeHandler} />
        </InputGroup>

      </section>

    </div>
  );
}

const mapStateToProps = (state) => {
  let products = state.products;
  return { data: products.results, searchTerm: products.searchTerm, searchedProducts: products.searchedProducts };
};


const mapDispatchToProps = (dispatch) => ({
  getSortingSetting: (sortBy, sortPriceRange, sortRating) => dispatch(getSortingSetting(sortBy, sortPriceRange, sortRating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
