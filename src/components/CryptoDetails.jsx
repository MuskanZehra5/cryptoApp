import React, { useState } from 'react';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import { Row, Col, Select,Typography } from 'antd';

import {
  MoneyCollectTwoTone,
  TrophyTwoTone,
  StopTwoTone,
  DollarCircleTwoTone,
  ExclamationCircleTwoTone,
  FundTwoTone,
  ThunderboltTwoTone,
  CheckOutlined,
  StarTwoTone
} from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoAPI';
import Loader from './Loader';
import LineChart from './LineChart';

const { Option } = Select;
const { Title, Text } = Typography;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod] = useState('30d');
  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery(coinId);

  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId,timeperiod});
  const coin = cryptoDetails?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${coin?.price && millify(coin?.price)}`, icon: <DollarCircleTwoTone /> },
    { title: 'Rank', value: coin?.rank, icon: <StarTwoTone /> },
    { title: '24h Volume', value: `$ ${coin?.volume && millify(coin?.volume)}`, icon: <ThunderboltTwoTone /> },
    { title: 'Market Cap', value: `$ ${coin?.marketCap && millify(coin?.marketCap)}`, icon: <DollarCircleTwoTone /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${coin?.allTimeHigh?.price && millify(coin?.allTimeHigh?.price)}`, icon: <TrophyTwoTone /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: coin?.numberOfMarkets, icon: <FundTwoTone /> },
    { title: 'Number Of Exchanges', value: coin?.numberOfExchanges, icon: <MoneyCollectTwoTone /> },
    { title: 'Aprroved Supply', value: coin?.supply?.confirmed ? <CheckOutlined /> : <StopTwoTone />, icon: <ExclamationCircleTwoTone /> },
    { title: 'Total Supply', value: `$ ${coin?.supply?.total && millify(coin?.supply?.total)}`, icon: <ExclamationCircleTwoTone /> },
    { title: 'Circulating Supply', value: `$ ${coin?.supply?.circulating && millify(coin?.supply?.circulating)}`, icon: <ExclamationCircleTwoTone /> },
  ];
  return (
    <>
      <Col className='coin-detail-container'>
        <Col className="coin-heading-container">
          <Title level={2} className='coin-name'>{coin.name}({coin.symbol})</Title>
          <p>
            {coin.name} live price in USD. View value statistics, supply and market cap.
          </p>
          <h4 className='crypto-detail-heading'>Current Ranking: </h4>{coin.rank}
          <h4 className='crypto-detail-heading'>Current Price: </h4>${ millify(coin.price)}
        </Col>
        <br />
        <Select defaultValue={'7d'} className='select-timeperiod'
         placeholder='select time period' onChange={(value)=>setTimePeriod(value)}>
          {time.map((date)=> <Option key={date}>{date}</Option>)}

        </Select>

        <LineChart coinHistory = {coinHistory} currentPrice = {millify(coin?.price)}  coinName={coin?.name}/>



        <Col className='stats-container'>
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title className='coin-details-heading' level={3}>
                {coin.name} Value Statistics
              </Title>
              <p>An overview of {coin.name} stats</p>
            
            </Col>
            {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
          </Col>

          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title className='coin-details-heading' level={3}>
                {coin.name} Other Statistics
              </Title>
              <p>An overview of other {coin.name} stats</p>
            
            </Col>
            {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
          </Col>

        </Col>

       

          <Col className="coin-desc-link">
                <Row className="coin-dess">
                  <Title level={3} className='coin-details-heading'>
                    What is {coin.name}?
                  </Title>

                  {HTMLReactParser(coin.description)}
                  
                </Row>
          </Col>

          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">{coin.name} Links</Title>
            {coin.links?.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">{link.type}</Title>
                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
              </Row>
            ))}
          </Col>

       

      </Col>
    </>
  );
};

export default CryptoDetails;
