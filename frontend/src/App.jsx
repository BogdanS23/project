import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Sellers from './Sellers';
import Products from './Products';
import Orders from './Orders';
import Reports from './Reports';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';

function App() {
    return (
        <Router>
            <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                MongoApp
                            </Typography>
                        </Toolbar>
                    </AppBar>
                <nav>
                    <Container>
                        <Box sx={{ mt: 2 }}>
                            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '10px' }}>
                                    <>
                                        <li><Link to="/sellers"><Button variant="contained">Sellers</Button></Link></li>
                                        <li><Link to="/products"><Button variant="contained">Products</Button></Link></li>
                                        <li><Link to="/orders"><Button variant="contained">Orders</Button></Link></li>
                                        <li><Link to="/reports"><Button variant="contained">Reports</Button></Link></li>
                                    </>
                            </ul>
                        </Box>
                    </Container>
                </nav>

                <Routes>
                        <>
                            <Route path="/sellers" element={<Sellers />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/reports" element={<Reports />} />
                        </>
                </Routes>
            </div>
        </Router>
    );
}

export default App;