import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Box 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({ buyerName: '', buyerEmail: '', selectedProducts: [] });
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:8080/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  };

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleAdd = () => {
    axios.post('http://localhost:8080/api/orders', newOrder)
      .then(response => {
        setOrders([...orders, response.data]);
        setNewOrder({ buyerName: '', buyerEmail: '', selectedProducts: [] });
      })
      .catch(error => console.error('Error adding order:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/orders/${id}`)
      .then(response => {
        setOrders(orders.filter(order => order.id !== id));
      })
      .catch(error => console.error('Error deleting order:', error));
  };

  const handleEdit = (id) => {
    const orderToEdit = orders.find(order => order.id === id);
    setEditingOrder(orderToEdit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingOrder) {
      setEditingOrder({ ...editingOrder, [name]: value });
    } else {
      setNewOrder({ ...newOrder, [name]: value });
    }
  };

  const handleProductSelect = (e) => {
    const selectedProductIds = e.target.value;
    const selectedProducts = products.filter(product => selectedProductIds.includes(product.id));
    if (editingOrder) {
      setEditingOrder({ ...editingOrder, selectedProducts });
    } else {
      setNewOrder({ ...newOrder, selectedProducts });
    }
  };

  const handleSave = () => {
    if (editingOrder) {
      axios.put(`http://localhost:8080/api/orders/${editingOrder.id}`, editingOrder)
        .then(response => {
          setOrders(orders.map(order =>
            order.id === editingOrder.id ? response.data : order
          ));
          setEditingOrder(null);
        })
        .catch(error => console.error('Error updating order:', error));
    }
  };

  const handleCancel = () => {
    setEditingOrder(null);
  };

  const handleSearch = () => {
    axios.get(`http://localhost:8080/api/orders/search?query=${searchQuery}`)
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error searching orders:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField 
          label="Search" 
          variant="outlined" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '16px' }}>
          Search
        </Button>
      </Box>
      <List>
        {orders.map(order => (
          <ListItem key={order.id} divider>
            {editingOrder && editingOrder.id === order.id ? (
              <Box width="100%">
                <TextField 
                  label="Buyer Name" 
                  name="buyerName" 
                  value={editingOrder.buyerName} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal"
                />
                <TextField 
                  label="Buyer Email" 
                  name="buyerEmail" 
                  value={editingOrder.buyerEmail} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Selected Products</InputLabel>
                  <Select
                    name="selectedProducts"
                    multiple
                    value={editingOrder.selectedProducts.map(product => product.id)}
                    onChange={handleProductSelect}
                  >
                    {products.map(product => (
                      <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box mt={2}>
                  <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '8px' }}>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box width="100%">
                <ListItemText
                  primary={order.buyerName}
                  secondary={order.buyerEmail}
                />
                <List>
                  {order.selectedProducts && order.selectedProducts.map(product => (
                    <ListItem key={product.id}>
                      <ListItemText primary={product.name} />
                    </ListItem>
                  ))}
                </List>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(order.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(order.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      <Box mt={4}>
        <Typography variant="h5">Add Order</Typography>
        <TextField 
          label="Buyer Name" 
          name="buyerName" 
          value={newOrder.buyerName} 
          onChange={handleChange} 
          fullWidth 
          margin="normal"
        />
        <TextField 
          label="Buyer Email" 
          name="buyerEmail" 
          value={newOrder.buyerEmail} 
          onChange={handleChange} 
          fullWidth 
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Selected Products</InputLabel>
          <Select
            name="selectedProducts"
            multiple
            value={newOrder.selectedProducts.map(product => product.id)}
            onChange={handleProductSelect}
          >
            {products.map(product => (
              <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Orders;
