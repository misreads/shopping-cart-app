import React, { Component } from "react"
import { connect } from "react-redux"
import { addToCart } from "./actions/cartActions"
import materialize from "materialize-css"

class ProductList extends Component {
  handleClickAdd = (head, tail, price) => {
    this.props.dispatch(addToCart(head, tail, price))
  }

  render() {
    let itemLength = this.props.products.length
    let quantityRows = parseInt(itemLength / 3)
    let itemList = []

    if (quantityRows % 3 > 0) {
      quantityRows++
    }

    let index = 0

    for (let i = 0; i <= quantityRows; i++) {
      let top = index + 3
      let children = []
      for (let j = index; j < top; j++) {
        const element = this.props.products[j]
        if (typeof element === "undefined") {
          break
        }
        let childrenElem = (
          <div className='col s12 m4 l4'>
            <div className='card' key={element.head}>
              <div className='card-image'>
                <img
                  className='responsive-img'
                  src={element.image}
                  alt={element.name}
                />
                <span
                  to='/'
                  className='btn-floating halfway-fab waves-effect waves-light red'
                  onClick={() => {
                    this.handleClickAdd(
                      element.head,
                      element.tail,
                      element.price
                    )
                    materialize.toast({
                      html: `${element.name} added to cart`,
                      classes: "rounded"
                    })
                  }}
                >
                  <i className='material-icons'>add</i>
                </span>
              </div>

              <div className='card-content'>
                <h5>{element.name}</h5>
                <p>Series: {element.gameSeries}</p>
                <p>Type: {element.type}</p>
                <p>
                  <b>Price: ${element.price}</b>
                </p>
              </div>
            </div>
          </div>
        )
        children.push(childrenElem)
        index++
      }
      let row = React.createElement("div", { class: "row" }, children)
      itemList.push(row)
    }

    return <div>{itemList}</div>
  }
}

const mapStateToProps = state => ({
  added: state.products.addedItems,
  loading: state.products.loading,
  error: state.products.error,
  total: state.products.total
})

export default connect(mapStateToProps)(ProductList)
