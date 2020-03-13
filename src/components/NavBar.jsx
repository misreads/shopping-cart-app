import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class NavBar extends Component {
  render() {
    return (
      <nav className='nav-wrapper'>
        <div className='container'>
          <Link to='/' className='brand-logo'>
            Alternative Amiibo Store
          </Link>

          <ul className='right'>
            <li>
              <Link to='/'>Shop</Link>
            </li>
            <li>
              <Link to='/cart'>
                Cart{" "}
                {this.props.added.length > 0
                  ? `(${this.props.added.length})`
                  : ""}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  added: state.products.addedItems
})

export default connect(mapStateToProps)(NavBar)
