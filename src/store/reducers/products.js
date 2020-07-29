let initialState = {
  results: [],
  searchTerm: '',
  searchedProducts: [],
  sortBy: '',
  sortedProducts: [],
  mainProducts: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'GETPRODUCTS':
    return payload;
  case 'GETSEARCHEDPRODUCTS':
    return { ...state, searchTerm: payload.searchTerm, searchedProducts: payload.searchedProducts };
  case 'SORTPRODUCTS':
<<<<<<< HEAD
    console.log('reducerrrrrrrrrrrrrrrrr', payload);
    return { ...state.searchedProducts};
=======
    console.log('sort', payload);
    let sortCondition = '';
    let sortBy = payload.sortBy;
    let sortPriceRange = payload.sortPriceRange;
    let sortRating = payload.sortRating;
    let sorted = [];
    let productList = [];
    if (state.searchedProducts) {
      productList = state.searchedProducts;
    } else {
      productList = state.results;
    }
    if (sortBy) {
      if (sortBy === 'price') {
        sortCondition = 'price';
        sorted = productList.sort((a, b) => (a.price > b.price) ? 1 : -1);
      } else if (sortBy === 'new') {
        sortCondition = 'new';
        sorted = productList.sort((a, b) => (a.Timestamp > b.Timestamp) ? 1 : -1);
      } else if (sortBy === 'top-ranked') {
        sortCondition = 'top-ranked';
        sorted = productList.sort((a, b) => (a.views > b.views) ? 1 : -1);
      }
    }
    if (sortPriceRange) {
      sortCondition = 'priceRange';
      let min = sortPriceRange.split('-')[0];
      let max = sortPriceRange.split('-')[1];
      sorted = productList.filter(product => (product.price < max) && (product.price > min));
    }
    if (sortRating) {
      sortCondition = 'rating';
      sorted = productList.filter(product => (product.review === sortRating));
    }
    console.log('sorted', sorted);
    return { ...state, sortBy: sortCondition, sortedProducts: sorted };
>>>>>>> 9608cf03d5f7ff646c928825f5a995e727b13f6d
  case 'GET MAIN PAGE PRODUCTS':
    state.mainProducts = payload;
    return { ...state };
  default:
    return state;
  }
};
