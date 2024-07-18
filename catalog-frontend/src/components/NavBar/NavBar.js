import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function NavBar({ setSearchText }) {
    const searchProducts = () => {
        let newSearchText = document.getElementById("searchText").value;
        setSearchText(newSearchText);
    };
    return (
        <nav className=" navbar navbar-expand-sm row pt-0">
            <div className="col-lg-6 col-md-6">
                <ul className="navbar-nav">
                    <li className="nav-icon">
                        <FontAwesomeIcon className='menu-icon p-3' icon={faBars} />
                    </li>
                    <li className="nav-item mt-2 mr-3">
                        <a className=" nav-text" href="/">HOME</a>
                    </li>
                    <li className="nav-item mt-2 mr-3">
                        <a className=" nav-text" href="/">SHOP</a>
                    </li>
                    <li className="nav-item mt-2 mr-3">
                        <a className=" nav-text" href="/">MAGAZINE</a>
                    </li>
                </ul>
            </div>
            <div className="col-lg-6 col-md-6">
                <form className="form-inline d-flex" style={{ float: "right"}}>
                    <button className="btn mr-sm-2"><FontAwesomeIcon icon={faSearch}/>
                    </button>
                    <input id="searchText" className="form-control" type="text" placeholder="Search" onKeyUp={searchProducts} />
                    <button className="btn"><FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                    <a className=" nav-text d-flex align-items-center px-3" href="/">LOGIN</a>
                </form>
            </div>
        </nav>
    )
}

export default NavBar
