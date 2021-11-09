import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Rheader from './Components/r_Header.jsx'
import Rfooter from './Components/r_Footer.jsx'
import Home from './Components/Home.jsx';
import OrderItems from './Components/OrderItems.jsx';
import ListItems from './Components/ListItems.jsx';
import DeliverItems from './Components/DeliverItems.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <Rheader />
      <div className="b-example-divider"></div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/order" element={<OrderItems/>} />
        <Route path="/list" element={<ListItems/>} />
        <Route path="/deliver" element={<DeliverItems/>} />
      </Routes>
      <div className="b-example-divider"></div>
      <Rfooter />
    </>
  )
}

export default App
