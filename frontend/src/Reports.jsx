import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./Style.css"

function Reports() {
  const [averagePriceBySeller, setAveragePriceBySeller] = useState([]);
  const [productCountBySeller, setProductCountBySeller] = useState([]);
  const [priceRange, setPriceRange] = useState({});

  useEffect(() => {
    fetchAveragePriceBySeller();
    fetchProductCountBySeller();
    fetchProductPriceRange();
  }, []);

  const fetchAveragePriceBySeller = () => {
    axios.get('http://localhost:8080/api/reports/average-price-by-seller')
      .then(response => setAveragePriceBySeller(response.data))
      .catch(error => console.error('Error fetching average price by seller:', error));
  };

  const fetchProductCountBySeller = () => {
    axios.get('http://localhost:8080/api/reports/product-count-by-seller')
      .then(response => setProductCountBySeller(response.data))
      .catch(error => console.error('Error fetching product count by seller:', error));
  };

  const fetchProductPriceRange = () => {
    axios.get('http://localhost:8080/api/reports/product-price-range')
      .then(response => setPriceRange(response.data))
      .catch(error => console.error('Error fetching product price range:', error));
  };

  return (
    <div>

      <Typography variant="h5" gutterBottom>
        Средняя цена у продовца
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя продавца</TableCell>
              <TableCell>Email продавца</TableCell>
              <TableCell>Средняя цена</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {averagePriceBySeller.map(item => (
              <TableRow key={item.sellerId}>
                <TableCell>{item.sellerName}</TableCell>
                <TableCell>{item.sellerEmail}</TableCell>
                <TableCell>{item.averagePrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Количество товаров у продавца
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя продавца</TableCell>
              <TableCell>Email продавца</TableCell>
              <TableCell>Количество товаров</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productCountBySeller.map(item => (
              <TableRow key={item.sellerId}>
                <TableCell>{item.sellerName}</TableCell>
                <TableCell>{item.sellerEmail}</TableCell>
                <TableCell>{item.productCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Диапозон цен товаров
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Минимальная цена</TableCell>
              <TableCell>Максимальная цена</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell>{priceRange.minPrice}</TableCell>
                <TableCell>{priceRange.maxPrice}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Reports;
