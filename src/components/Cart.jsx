import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import materialize from "materialize-css"
import {
  addQuantityToCart,
  subQuantityToCart,
  removeFromCart,
  clearCart
} from "./actions/cartActions"

class Cart extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    }
    materialize.Modal.init(this.Modal, options)
  }
  handleClickAdd = (head, tail) => {
    this.props.dispatch(addQuantityToCart(head, tail))
  }
  handleClickSubtract = (head, tail) => {
    this.props.dispatch(subQuantityToCart(head, tail))
  }
  handleClickRemove = (head, tail) => {
    this.props.dispatch(removeFromCart(head, tail))
  }
  render() {
    console.log(this.props.added.length)
    let addedItems = this.props.added.length ? (
      this.props.added.map(item => {
        return (
          <li className='collection-item avatar' key={item.id}>
            <div className='row'>
              <div
                className='col s6 m6'
                style={{ paddingTop: "10%", paddingLeft: "10%" }}
              >
                <div className='item-desc'>
                  <span className='title'>{item.name}</span>
                  <p>Series: {item.gameSeries}</p>
                  <p>Type: {item.type}</p>
                  <p>
                    <b>Price: ${item.price}</b>
                  </p>
                  <p>
                    <b>Quantity: {item.quantity}</b>
                  </p>
                  <p>
                    <b>
                      Total: ${parseInt(item.price) * parseInt(item.quantity)}
                    </b>
                  </p>
                  <div className='add-remove'>
                    <Link to='/cart'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          this.handleClickAdd(item.head, item.tail)
                        }}
                      >
                        expand_less
                      </i>
                    </Link>
                    <Link to='/cart'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          this.handleClickSubtract(item.head, item.tail)
                        }}
                      >
                        expand_more
                      </i>
                    </Link>
                  </div>
                  <button
                    className='waves-effect waves-light btn pink remove'
                    onClick={() => {
                      this.handleClickRemove(item.head, item.tail)
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className='col s6 m6'>
                <div className='item-img left-align'>
                  <img
                    src={item.image}
                    alt={item.image}
                    style={{ maxWidth: "70%" }}
                    className='responsive-img'
                  />
                </div>
              </div>
            </div>
          </li>
        )
      })
    ) : (
      <p>Nothing.</p>
    )
    return (
      <div className='container'>
        <div className='cart'>
          <div className='row'>
            <div className='col s6 m8 l8'>
              <h5>You have ordered:</h5>
              <p>Total: ${this.props.total}</p>
              <ul className='collection'>{addedItems}</ul>
            </div>
            <div className='col s6 m4 l4'>
              <div
                className='checkout'
                style={{ position: "fixed", top: "150px" }}
              >
                <div className='card'>
                  <div className='card-content'>
                    <span className='card-title'>Order detail</span>
                    <p>Total: ${this.props.total}</p>
                  </div>
                  <div className='card-action' style={{ align: "center" }}>
                    <button
                      className={`waves-effect waves-light btn-large modal-trigger`}
                      disabled={this.props.added.length > 0 ? false : true}
                      href='#modal1'
                    >
                      <i className='material-icons right'>checkout</i>
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={Modal => {
            this.Modal = Modal
          }}
          id='modal1'
          className='modal'
        >
          <div className='modal-content modal-fixed-footer'>
            <h4>Checkout</h4>
            <p>
              If you are ready with your order, click <b>Confirm Order</b>{" "}
              button to submit your request. This will clear your current
              shopping cart. (This action is irrevesible)
            </p>
          </div>
          <div className='modal-footer'>
            <button
              href='#!'
              className='modal-close waves-effect waves-green btn'
            >
              Cancel
            </button>
            <button
              href='#!'
              onClick={() => {
                this.props.dispatch(clearCart())
              }}
              className='modal-close waves-effect waves-green btn'
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  added: state.products.addedItems,
  loading: state.products.loading,
  error: state.products.error,
  total: state.products.total
})

export default connect(mapStateToProps)(Cart)
