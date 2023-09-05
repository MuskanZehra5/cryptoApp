import React from 'react';
import { Switch, Route, Link, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, CryptoDetails, Cryptocurrencies, News, Home, Exchanges } from './components';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} /> {/* Updated route */}
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            CryptoWorld @ All Rights Reserved
          </Typography.Title>

          <Space>
            <Link to="/" style={{ color: '#e6f0ff' }}>
              Home
            </Link>
            <Link to="/exchange" style={{ color: '#e6f0ff' }}>
              Exchanges
            </Link>
            <Link to="/cryptocurrencies" style={{ color: '#e6f0ff' }}>
              Cryptocurrencies
            </Link>
            <Link to="/news" style={{ color: '#e6f0ff' }}>
              News
            </Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
