import React from 'react'
import { Typography } from 'antd'
import { useGetCryptoExchangeDetailsQuery } from '../services/cryptoAPI'
import { Space, Table, Tag } from 'antd';
import Loader from './Loader';

const { Column, ColumnGroup } = Table;

const Exchanges = () => {

  const {data, isLoading} = useGetCryptoExchangeDetailsQuery()
  console.log(data)
  const globalexchanges = data?.data?.exchanges;
  console.log(globalexchanges.exchanges)
  console.log('hehehe')
  if (isLoading) return <Loader />;
  return (
    <>
    <Typography.Title className='heading' level={2}>Global Crypto Exchanges</Typography.Title>

    <Table dataSource={data}>
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
  
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {/* {globalexchanges.map((exchange) => (
            // <Text><strong>{exchange.rank}.</strong></Text>
          ))} */}
        </>
      )}
    />
 
  </Table>

    </>
  )
}

export default Exchanges 