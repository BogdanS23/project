import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, List, ListItem, IconButton, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

function Products() {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', sellerId: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState(null); // Состояние для сортировки

  useEffect(() => {
    fetchProducts();
    fetchSellers();
  }, [sortOrder]); // Добавляем sortOrder как зависимость

  const fetchProducts = () => {
    let url = 'http://localhost:8080/api/products';
    if (sortOrder) {
      url += `?sortBy=price&order=${sortOrder}`;
    }
    axios.get(url)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchSellers = () => {
    axios.get('http://localhost:8080/api/sellers')
      .then(response => setSellers(response.data))
      .catch(error => console.error('Error fetching sellers:', error));
  };

  const handleAdd = () => {
    axios.post('http://localhost:8080/api/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', price: '', description: '', sellerId: '' });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleEdit = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setEditingProduct(productToEdit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSave = () => {
    if (editingProduct) {
      axios.put(`http://localhost:8080/api/products/${editingProduct.id}`, editingProduct)
        .then(response => {
          setProducts(products.map(product =>
            product.id === editingProduct.id ? response.data : product
          ));
          setEditingProduct(null);
        })
        .catch(error => console.error('Error updating product:', error));
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleResetSort = () => {
    setSortOrder(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Products</Typography>
      <Box mb={2}>
        <Button variant="contained" onClick={() => handleSort('asc')} sx={{ mr: 1 }}>Sort by Price: Low to High</Button>
        <Button variant="contained" onClick={() => handleSort('desc')} sx={{ mr: 1 }}>Sort by Price: High to Low</Button>
        <Button variant="outlined" onClick={handleResetSort}>Reset Sort</Button>
      </Box>
      <List>
        {products.map(product => (
          <ListItem key={product.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {editingProduct && editingProduct.id === product.id ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleChange}
                  placeholder="Name"
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleChange}
                  placeholder="Price"
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  name="description"
                  value={editingProduct.description}
                  onChange={handleChange}
                  placeholder="Description"
                  sx={{ mb: 1 }}
                />
                <Select
                  fullWidth
                  variant="outlined"
                  name="sellerId"
                  value={editingProduct.sellerId}
                  onChange={handleChange}
                  displayEmpty
                  sx={{ mb: 1 }}
                >
                  <MenuItem value=""><em>Select Seller</em></MenuItem>
                  {sellers.map(seller => (
                    <MenuItem key={seller.id} value={seller.id}>{seller.name}</MenuItem>
                  ))}
                </Select>
                <Box>
                  <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>Save</Button>
                  <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {product.name} - {product.price} - {product.description} - {product.sellerId}
                </Typography>
                <IconButton onClick={() => handleEdit(product.id)} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      <Box mt={3}>
        <Typography variant="h5">Add Product</Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Name"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          sx={{ mb: 2 }}
        />
        <Select
          fullWidth
          variant="outlined"
          name="sellerId"
          value={newProduct.sellerId}
          onChange={handleChange}
          displayEmpty
          sx={{ mb: 2 }}
        >
          <MenuItem value=""><em>Select Seller</em></MenuItem>
          {sellers.map(seller => (
            <MenuItem key={seller.id} value={seller.id}>{seller.name}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleAdd}>Add</Button>
      </Box>
    </Container>
  );
}

export default Products;
