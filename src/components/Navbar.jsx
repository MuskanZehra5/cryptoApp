import React from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import {Link} from 'react-router-dom'
import {MenuOutlined, FundOutlined, BulbOutlined, HomeOutlined, MoneyCollectOutlined} from '@ant-design/icons'
import icon from '../images/cryptocurrency.png'
import MenuItem from 'antd/es/menu/MenuItem'

const Navbar = () => {
  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar src={icon} size='large'/>
            <Typography.Title level={2} className='logo'>
                <Link to='/'>CryptoWorld</Link>
            </Typography.Title>
        </div>

        <Menu theme='dark'>
            <MenuItem icon={<HomeOutlined></HomeOutlined>}>
                <Link to='/'>Home</Link>
            </MenuItem>
            <MenuItem icon={<FundOutlined></FundOutlined>}>
                <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            </MenuItem>
            <MenuItem icon={<MoneyCollectOutlined></MoneyCollectOutlined>}>
                <Link to='/exchanges'>Exchanges</Link>
            </MenuItem>
            <MenuItem icon={<BulbOutlined></BulbOutlined>}>
                <Link to='/news'>News</Link>
            </MenuItem>

        </Menu>
    </div>
  )
}

export default Navbar