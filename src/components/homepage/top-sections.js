import React from 'react';
import './homepage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function TopSections(props) {
  return (

    <Row>
      <Col style={{ backgroundColor: '#f5f5f5', height: '30vh'}}>
        <a href='#saleSection' >
          <img style={{ width: '100%', height: '30vh' }}
            src='https://www.footwearetc.com/_resources/www/footwear/_system/content/images/d8'
            alt='sale banner'
          />
        </a>
      </Col>
      <Col style={{ backgroundColor: 'blue', height: '30vh' }}>
        <a href='#topSection' >
          <img style={{ width: '100%', height: '30vh' }}
            src='https://www.footwearetc.com/_resources/www/footwear/_system/content/images/d83f84d5-3279-485c-a401-eb5472f91d4e_130650_headerimage.jpg'
            alt='best seller banner'
          />
        </a>
      </Col>
      <Col style={{ backgroundColor: '#f5f5f5', height: '30vh' }}>
        <a href='#newSection' >
          <img style={{ width: '100%', height: '30vh' }}
            src='https://www.footwearetc.com/_resources/www/footwear/_system/content/images/d8'
            alt='new banner'
          />
        </a>
      </Col>
    </Row>
  );
}


export default TopSections;

