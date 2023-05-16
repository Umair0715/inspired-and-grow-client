import './styles.css';
import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrawerContext } from 'context/DrawerContext';
import useClickOutside from 'utils/clickOutside';
import Logo from 'assets/images/logo.png';

const Sidebar = () => {
    const sidebarRef = useRef();
    const location = useLocation();
    const { showDrawer , setShowDrawer } = useDrawerContext();
    const [showOrderDropMenu , setShowOrderDropMenu] = useState(false)
    const [showCatDropMenu , setShowCatDropMenu] = useState(false);

    useClickOutside(sidebarRef , () => setShowDrawer(false))

    const isActive = (path , home) => {
        if (home) return location.pathname === '/' ;
        return location.pathname.split('/').includes(path);
    }

   

    return (
        <div className=''>
            {
                showDrawer && 
                <div className='fixed top-0 left-0 bg-gray-900 w-full h-screen bg-opacity-30 opacity-1 duration-300 z-10'>
                </div>
            }
            <div 
            className={`sidebar ${showDrawer ? 'show' : '' } fixed top-0 md:left-0 -left-[200%] w-[270px]  overflow-auto py-4 h-full z-50 border-r bg-pure`} 
            ref={sidebarRef}
            >
                <div className='overflow-auto'>
                    <div className='flex items-center justify-center border-b pb-4 '>
                        <Link to='/'>
                            <img src={Logo} alt="Logo" />                        
                        </Link>
                    </div>
                    <ul className='sideMenu-list mt-6 text-dark min-h-screen h-full'>
                        <li 
                        className={`${isActive('' , true) ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/'>   
                                <i className="uil uil-apps"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('user-management') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/user-management/users'>   
                                <i className="uil uil-accessible-icon-alt"></i>
                                <span>User Management</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('order-management') ? 'active' : ''} sideMenu-item`}
                        >
                            <div onClick={() => setShowOrderDropMenu(prev => !prev)}>
                                <i className="uil uil-shopping-cart"></i>
                                <span>Order Management</span>
                            </div>
                        </li>
                            {/* DROP MENU */}
                            {
                                showOrderDropMenu && 
                                <ul className='dropMenu'>
                                    <li className={`${isActive('pre-bookings') ? 'drop-active' : ''}
                                    dropMenu-item
                                    `}>
                                        <Link to='/order-management/pre-bookings'>
                                            <div className='dot'></div>
                                            <span>Pre Bookings</span>
                                        </Link>
                                    </li>
                                    <li className={`${isActive('accepted-orders') ? 'drop-active' : ''}
                                    dropMenu-item
                                    `}>
                                        <Link to='/order-management/accepted-orders'>
                                            <div className='dot'></div>
                                            <span>Accepted Orders</span>
                                        </Link>
                                    </li>
                                    <li className={`${isActive('orders') ? 'drop-active' : ''}
                                    dropMenu-item
                                    `}>
                                        <Link to='/order-management/orders'>
                                            <div className='dot'></div>
                                            <span>All Orders</span>
                                        </Link>
                                    </li>
                                </ul>
                            }
                        <li 
                        className={`${isActive('inventory-management') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/inventory-management/inventories'>   
                                <i className="uil uil-chart-pie-alt"></i>
                                <span>Inventory Management</span>
                            </Link>
                        </li>
                        {/* <li 
                        className={`${isActive('products') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/products'>   
                                <i className="uil uil-coins"></i>
                                <span>Product Management</span>
                            </Link>
                        </li> */}
                        <li 
                        className={`${isActive('driver-management') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/driver-management/drivers'>   
                                <i className="uil uil-bus-school"></i>
                                <span>Driver Management</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('settings') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/settings'>   
                                <i className="uil uil-setting"></i>
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('analytics') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/analytics'>   
                                <i className="uil uil-analytics"></i>
                                <span>Analytics and Reporting</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('category-management') ? 'active' : ''} sideMenu-item`}
                        >
                            <div onClick={() => setShowCatDropMenu(prev => !prev)}>   
                                <i className="uil uil-sitemap"></i>
                                <span>Category Management</span>
                            </div>
                        </li>
                        {/* DROP MENU */}
                        {
                            showCatDropMenu && 
                            <ul className='dropMenu'>
                                <li className={`${isActive('main-category') ? 'drop-active' : ''}
                                dropMenu-item
                                `}>
                                    <Link to='/category-management/main-category'>
                                        <div className='dot'></div>
                                        <span>Main Category</span>
                                    </Link>
                                </li>
                                <li className={`${isActive('sub-category') ? 'drop-active' : ''}
                                dropMenu-item
                                `}>
                                    <Link to='/category-management/sub-category'>
                                        <div className='dot'></div>
                                        <span>Sub Category</span>
                                    </Link>
                                </li>
                            </ul>
                        }
                        <li 
                        className={`${isActive('coupons') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/coupons'>   
                                <i className="uil uil-pricetag-alt"></i>
                                <span>Coupons/Discount</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('banners') ? 'active' : ''} sideMenu-item`}
                        >
                            <Link to='/banners'>   
                                <i className="uil uil-scenery"></i>
                                <span>App Layout Banner</span>
                            </Link>
                        </li>
                        <li 
                        className={`sideMenu-item signout`}
                        >
                            <i className="uil uil-signout"></i>
                            <span>Sign Out</span>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default Sidebar