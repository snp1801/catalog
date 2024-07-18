import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';

function ProductDetails() {
    const location = useLocation();
    const { product } = location.state;
    const carImg = product.productImg.map(img => '../' + img);
    const [selectedColor, setSelectedColor] = useState(product.color[0]);

    return (
        <div className='row container align-items-center product-details'>
            <div className="preview col-md-8 col-sm-12 px-0" style={{ overflow: 'hidden', height: '500px' }}>
                <Carousel>
                    <Carousel.Item>
                        <img src={carImg[0]} alt="Product View" style={{ height: '500px', width: '100%' }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={carImg[1]} alt="Product View" style={{ height: '500px', width: '100%' }} />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="product-details-right col-md-4 col-sm-12">
                <span className="product-title">{product.title}</span>
                <h3 className="product-type">{product.type}</h3>
                <p className="product-description">{product.description}</p>
                <div className="mt-2 mb-4">
                    <span className='product-title'>Color</span>
                    <div className=' mt-2 d-flex'>
                        {product.color.map(color => (
                            <div key={color} className='me-3 color-btn-icon'>
                                <button aria-label={color} onClick={() => setSelectedColor(color)} className=' p-0 d-flex color-btn' style={{ height: '20px', width: '20px', borderRadius: '20px', backgroundColor: `${color}` }}>{selectedColor === color && <FontAwesomeIcon values={selectedColor} className='color-btn-icon' icon={faCheck} data-testid="check-icon" />}</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4 mt-2">
                    <p className='product-title'>Price Per Unit</p>
                    <div className=''>
                        <span data-testid='price' className="price h4 me-4">${product.price}</span>
                        {/* <div className="buy-btn"> */}
                        <button className="buy-btn add-to-cart px-3 me-4" type="button">Buy Now</button>
                        <span><FontAwesomeIcon icon={faShoppingCart} /></span>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
