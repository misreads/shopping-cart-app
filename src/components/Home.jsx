import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchProducts } from "./actions/productActions"
import { addToCart } from "./actions/cartActions"
import ProductList from "./ProductList"
import materialize from "materialize-css"

class Home extends Component {
  componentDidMount() {
    if (this.props.loadApi) {
      this.props.dispatch(fetchProducts())
    }
  }

  handleClickAdd = (head, tail, price) => {
    this.props.dispatch(addToCart(head, tail, price))
  }

  render() {
    const { error, loading, products } = this.props

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return (
        <div className='row' style={{ textAlign: "center" }}>
          <div className='preloader-wrapper big active'>
            <div className='spinner-layer spinner-blue-only'>
              <div className='circle-clipper left'>
                <div className='circle'></div>
              </div>
              <div className='gap-patch'>
                <div className='circle'></div>
              </div>
              <div className='circle-clipper right'>
                <div className='circle'></div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='container'>
        <br />
        <ProductList
          products={products}
          handleClickAdd={() => this.handleClickAdd()}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error,
  loadApi: state.products.loadApi
})

export default connect(mapStateToProps)(Home)
