import './App.css';
import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  let pageSize = 10;
  let apiKey = process.env.REACT_APP_NEWS_APP

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={pageSize} apiKey={apiKey} country="in" category="general" />}></Route>
          <Route exact path="/business" element={<News key="business" pageSize={pageSize} apiKey={apiKey} country="in" category="business" />}></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} apiKey={apiKey} country="in" category="entertainment" />}></Route>
          <Route exact path="/general" element={<News key="general" pageSize={pageSize} apiKey={apiKey} country="in" category="general" />}></Route>
          <Route exact path="/health" element={<News key="health" pageSize={pageSize} apiKey={apiKey} country="in" category="health" />}></Route>
          <Route exact path="/science" element={<News key="science" pageSize={pageSize} apiKey={apiKey} country="in" category="science" />}></Route>
          <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} apiKey={apiKey} country="in" category="sports" />}></Route>
          <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} apiKey={apiKey} country="in" category="technology" />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App