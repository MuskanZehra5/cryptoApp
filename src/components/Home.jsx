import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptoQuery } from '../services/cryptoAPI'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import Loader from './Loader'
import Exchanges from './Exchanges'


const Home = () => {
  const {data, isLoading} = useGetCryptoQuery(10);
  console.log(data)
  const globalStats = data?.data?.stats;

  if (isLoading) return <Loader />;
  return (

    <>
    <Typography.Title className='heading' level={2}>Global Crypto Stats</Typography.Title>
    <Row>
      <Col span={8}> <Statistic title='Total Cryptocurrencies' value={globalStats.totalCoins}/></Col>
      <Col span={8}> <Statistic title='Total Market cap' value={millify(globalStats.totalMarketCap)}/></Col>
      <Col span={8}> <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)}/></Col>
      <Col span={8}> <Statistic title='Total Markets' value={millify(globalStats.totalMarkets)}/></Col>
      <Col span={8}> <Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)}/></Col>
    </Row>

    <div className="home-heading-container">
      <Typography.Title className='home-title' level={2}>The world's top 10 cryptocurrencies</Typography.Title>
      <Typography.Title className='show-more' level={4}><Link to='/cryptocurrencies'>Show More</Link></Typography.Title>
    </div> 
    <Cryptocurrencies simplified={true}/>

    <div className="home-heading-container">
      <Typography.Title className='home-title' level={2}>Recent Crypto News</Typography.Title>
      <Typography.Title className='show-more' level={4}><Link to='/news'>Show More</Link></Typography.Title>
    </div> 
    <News simplified= {true}/>
    

    </>
  )
}

export default Home