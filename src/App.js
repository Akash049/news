import React, { Component } from 'react';
import CustomNavbar from './components/CustomNavbar/CustomNavbar.jsx';
import NewsFolder from './components/NewsFolder/NewsFolder.jsx';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <div className="navbar-section">
          <CustomNavbar />
        </div>
        <div className="pages">
            <NewsFolder/>
        </div>
      </div>
    );
  }
}

export default App;
