import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
// import { Spinner } from 'react-bootstrap';

function ProductList({ allProducts, setAllProducts, products, sliderValue, setSliderValue, searchText, setSelectedCollections, setSelectedCategories, setSelectedColors, selectedColors,selectedCollections,selectedCategories,setProducts }) {
    // const [isLoading, setIsLoading] = useState(true);

    const productTypes = Array.from(new Set(allProducts.map(product => product.type)));

    const productCollections = Array.from(new Set(allProducts.map(product => product.collection)));

    const allColors = allProducts.reduce((acc, product) => {
        acc.push(...product.color); // Spread operator to push each color individually
        // console.log('All colors : ',acc)
        return acc;
    }, []);

    const filterProducts = useCallback((range, searchText, selectedCollections, selectedCategories, selectedColors) => {
        return allProducts.filter(product => {
            let matchesPrice
            if (range < 10000) {
                matchesPrice = parseInt(product.price) <= parseInt(range);
            }
            else {
                matchesPrice = true;
            }
            const matchesText = product.title.toLowerCase().includes(searchText.toLowerCase());
            const matchesCollection = selectedCollections.length === 0 || selectedCollections.includes(product.collection);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.type);
            const matchesColor = selectedColors.length === 0 || product.color.some(color => selectedColors.includes(color));
            return matchesPrice && matchesText && matchesCollection && matchesCategory && matchesColor;
        });
    }, [allProducts])

    useEffect(() => {
        setProducts(filterProducts(sliderValue, searchText, selectedCollections, selectedCategories, selectedColors));
    }, [sliderValue, searchText, selectedCollections, selectedCategories, selectedColors, filterProducts, setProducts])

    const productColors = Array.from(new Set(allColors));
    // let productTypes =Array.from(new Set(products.map(product => product.type)));
    const handleRangeChange = (e) => {
        let newSliderValue = e.target.value;
        setSliderValue(newSliderValue);
        // console.log('Slider Value : ', sliderValue);
    }

    const handleCheckboxFilter = (event) => {
        const { value, checked, name } = event.target;
        if (name === 'collection') {
            setSelectedCollections(prev =>
                checked ? [...prev, value] : prev.filter(item => item !== value)
            );
        }
        else if (name === 'category') {
            setSelectedCategories(prev =>
                checked ? [...prev, value] : prev.filter(item => item !== value)
            );
        }
        else {
            setSelectedColors(prev =>
                checked ? [...prev, value] : prev.filter(item => item !== value)
            );
        }
    };

    useEffect(() => {
        // fetch('./products.json')
        fetch('http://localhost:5000/api/products') // Fetching data from the public directory
            .then(response => response.json())
            .then(data => {
                setAllProducts(data.items);
                // console.log(data);
                // setIsLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Dependency array is empty, so this effect runs once after the initial render

    return (
        <div className="product-list row">
            <section className="col-lg-3 col-md-3 pt-3">
                <div className='filter-by'>
                    <p className="filter-text">Filter By</p>
                    <Accordion defaultActiveKey="">
                        <Accordion.Item eventKey="0" style={{ border: 0 }}>
                            <Accordion.Header>Collection</Accordion.Header>
                            <Accordion.Body>
                                {
                                    productCollections.map(type => (
                                        <div key={type}>
                                            <input onChange={handleCheckboxFilter} type="checkbox" id={type} name='collection' value={type} />
                                            <label htmlFor={type}> {type}</label><br />
                                        </div>
                                    ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" style={{ border: 0 }}>
                            <Accordion.Header>Category</Accordion.Header>
                            <Accordion.Body>
                                {
                                    productTypes.map(type => (
                                        <div key={type}>
                                            <input onChange={handleCheckboxFilter} type="checkbox" id={type} name="category" value={type} />
                                            <label htmlFor={type}> {type}</label><br />
                                        </div>
                                    ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2" style={{ border: 0 }}>
                            <Accordion.Header>Color</Accordion.Header>
                            <Accordion.Body>
                                {
                                    productColors.map(type => (
                                        <div key={type}>
                                            <input onChange={handleCheckboxFilter} type="checkbox" id={type} name="color" value={type} />
                                            <label htmlFor={type}> {type}</label><br />
                                        </div>
                                    ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className="slidecontainer">
                        <p className="price-range pt-3 mb-0">Price Range</p>
                        <input data-testid='price-range' type="range" min="0" max="10000" step={100} value={sliderValue} className="slider" id="myRange" onChange={handleRangeChange} />
                        <p className="price-range">
                            ${sliderValue}
                            {<span style={{ float: 'right' }}>$10000+</span>}  {/* Display '+' when sliderValue is 10000 */}
                        </p>
                    </div>
                </div>
            </section>
            <section className='col-lg-9 col-md-9 products'>
                <div className='product-center'>
                    {
                        products && products.length > 0 ?
                            products.map(product => (
                                <div className='product'>
                                    <Link data-testid='product' state={{ product }} to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <article key={product.id}>
                                            <div className="img-container">
                                                <img src={product.productImg[0]} alt={product.title} className="product-img" />
                                            </div>
                                            <p>{product.title}</p>
                                            <h2>{product.type}</h2>
                                            <h4>${product.price}</h4>
                                        </article>
                                    </Link>
                                </div>
                            )) : 
                                (<h3>No Items Found</h3>)
                    }
                </div>
            </section>
        </div>
    );
}

export default ProductList;