import React, { useState } from 'react'
import { Card, Row, Col, Select, Avatar, Typography } from 'antd'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsAPI'
import { useGetCryptoQuery } from '../services/cryptoAPI'
import moment from 'moment'
import Loader from './Loader'
const {Meta} = Card
const {Option} = Select 

const News = ({simplified}) => {
  const count = simplified ? 6:15;
  const[ newsCategory, setnewsCategory] = useState('Cryptocurrency')
  const {data : cryptosnewslist, isFetching} = useGetCryptoNewsQuery({newsCategory,count});
  

  const demoimg = 'https://play-lh.googleusercontent.com/ACgOvt6MNsYoCZCsYFMsU1E_1wojlcw71xDcx46fQV6BAvMAl1S5KN5wcAYNCs4sfg'
  console.log(cryptosnewslist)


  const {data : cryptoslist} = useGetCryptoQuery(count);

   if (isFetching) return <Loader />;
  return (
    <>
      
      <Row gutter={[24,24]} >
        {!simplified && (
          <Col span={24}>
            <Select
            showSearch 
            optionFilterProp='children'
            placeholder='Select a crypto'
            className='select-news'
            onChange={(value)=>setnewsCategory(value)}
            filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>= 0}
            >
              <Option value='cryptocurrency'>Cryptocurrency</Option>
              {cryptoslist?.data?.coins.map((currency)=> (
                <Option value={currency.name.toLowerCase()}>{currency.name}</Option>
              ))}
            </Select>


          </Col>

        )}


        {cryptosnewslist?.value?.map((news,i)=>(
          <Col xs={24} sm={12} lg={8} key={i}>
              <Card className='news-card' hoverable >
              
                <a href={news.url} target='_blank' rel='noreferrer'>
                  <div className="news-image-container">
                    <Typography className='news-title' level={1}>{`${news.name}`} </Typography>
                    <img
                    alt='news'
                    style={{maxWidth:'200px', maxHeight:'100px'}}
                    src={`${news?.image?.thumbnail?.contentUrl || demoimg}`}
                  /> 
                  </div><br />

                <Meta description={news.description > 100 
                    ?`${news.description.substring(0,100)}...`
                    :news.description
                    } />
                    <br />

                    <div className="provider-container">
                      <div>
                        <Avatar  src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoimg}> </Avatar>
                        <Typography  className='provider-name'>{news.provider[0]?.name}</Typography>

                      </div>

                      <Typography>{moment(news.datePublished).startOf('ss').fromNow()}</Typography>
                
                    </div>
                 
                </a>


              </Card>
          </Col>


        ))}

      </Row>
   

    
    
    </>
  )
}

export default News