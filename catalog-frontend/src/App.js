import { useState, useEffect, useCallback } from 'react';
import ProductList from './pages/ProductList/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './pages/ProductDetails/ProductDetails';
import NavBar from './components/NavBar/NavBar';
import './components/NavBar/NavBar.scss'
import './pages/ProductList/ProductList.scss'
import './pages/ProductDetails/ProductDetails.scss'

function App() {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]); // Initialize state with an empty array
    const [sliderValue, setSliderValue] = useState();
    const [searchText, setSearchText] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    return (
        <Router>
            <div className='main-content' style={{ maxWidth: '90%', margin: 'auto' }}>
                <NavBar searchText={searchText} setSearchText={setSearchText} />
                <Routes>
                    <Route path='/' element={<ProductList allProducts={allProducts} setAllProducts={setAllProducts} products={products} sliderValue={sliderValue} setSliderValue={setSliderValue} searchText={searchText} setSelectedCategories={setSelectedCategories} setSelectedCollections={setSelectedCollections} setSelectedColors={setSelectedColors} selectedColors={selectedColors} selectedCollections ={selectedCollections} selectedCategories={selectedCategories} setProducts={setProducts} />} />
                    <Route path='/product/:productId' element={<Product />} />
                </Routes>
            </div>
        </Router >
    );
}

export default App;