import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input} from 'antd'
import { useGetCryptoQuery } from '../services/cryptoAPI'
import Loader from './Loader'

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10:100;
  const {data : cryptoslist, isFetching} = useGetCryptoQuery(count);
  const [ cryptos, setCrypto] = useState(cryptoslist?.data?.coins)


  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    const filteredData = cryptoslist?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCrypto(filteredData)

  }
  ,[cryptoslist,searchTerm])
  
  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
              <div className="search-crypto">
              <Input placeholder="Search crypto" onChange={(e)=>setSearchTerm(e.target.value)} />
            </div>

      )}

      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos?.map((currency)=>(
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>

            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>

              <Card  title={`${currency.rank}. ${currency.name} (${currency.symbol})`} hoverable
               extra={<img className='crypto-image' src={`${currency.iconUrl}`} />} >
                
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Exchange: {millify(currency.change)}</p>


              </Card> 
            </Link>
          </Col>
          

        ))}

      </Row>
   

    
    
    </>
  )
}

export default Cryptocurrencies