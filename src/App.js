import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Cart from "./components/Cart"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/cart' component={Cart} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
