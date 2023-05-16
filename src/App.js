import Sidebar from "components/global/sidebar";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useState } from "react";
import Dashboard from "pages/dashboard";
import Users from "pages/userManagement";
import UserDetails from "pages/userManagement/UserDetails";
import AddUser from "pages/userManagement/AddUser";
import EditUser from "pages/userManagement/EditUser";
import Orders from "pages/orderManagement";
import PreBookings from "pages/orderManagement/PreBookings";
import AcceptedOrders from "pages/orderManagement/AcceptedOrder";
import Inventories from "pages/inventoryManagement";
import AddInventory from "pages/inventoryManagement/AddInventory";
import Drivers from "pages/driverManagement";
import DriverDetails from "pages/driverManagement/DriverDetails";
import AddDriver from "pages/driverManagement/AddDriver";
import EditDriver from "pages/driverManagement/EditDriver";
import Banners from "pages/banners";
import AddNewBanner from "pages/banners/AddNewBanner";
import EditBanner from "pages/banners/EditBanner";
import EditInventory from "pages/inventoryManagement/EditInventory";
import MainCategory from "pages/categoryManagement";
import SubCategory from "pages/categoryManagement/SubCategory";
import AddSubCategory from "pages/categoryManagement/AddSubCategory";
import AnalyticsAndReporting from "pages/analyticsAndReporting";
import Coupons from "pages/coupons";
import AddCoupon from "pages/coupons/AddCoupon";
import Login from "pages/auth/Login";
import AddCategory from "pages/categoryManagement/AddCategory";
import EditCategory from "pages/categoryManagement/EditCategory";
import EditSubCategory from "pages/categoryManagement/EditSubCategory";


function App() {
    const [isLoginPage , setIsLoginPage] = useState(false);

    return (
        <div className="space">
            <ToastContainer 
                style={{fontSize: 15}}
                position="top-center"
                autoClose={3000}
                closeOnClick
                pauseOnHover
            />
            <Router>
            {!isLoginPage && <Sidebar />}
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route 
                    path='/login' 
                    element={<Login setIsLoginPage={setIsLoginPage} />} 
                    />
                    <Route path='/user-management/users' element={<Users />} />
                    <Route 
                    path='/user-management/users/:id' 
                    element={<UserDetails />} 
                    />
                    <Route 
                    path='/user-management/add-new'
                    element={<AddUser />}
                    />
                    <Route 
                    path='/user-management/edit-user/:id'
                    element={<EditUser />}
                    />
                    <Route 
                    path='/order-management/orders'
                    element={<Orders />}
                    />
                    <Route 
                    path='/order-management/pre-bookings'
                    element={<PreBookings />}
                    />
                    <Route 
                    path='/order-management/accepted-orders'
                    element={<AcceptedOrders />}
                    />
                    <Route 
                    path='/inventory-management/inventories'
                    element={<Inventories />}
                    />
                    <Route 
                    path='/inventory-management/add-new'
                    element={<AddInventory />}
                    />
                    <Route 
                    path='/inventory-management/edit-inventory/:id'
                    element={<EditInventory />}
                    />
                    <Route 
                    path='/driver-management/drivers'
                    element={<Drivers />}
                    />
                    <Route 
                    path='/driver-management/drivers/:id' 
                    element={<DriverDetails />} 
                    />
                    <Route 
                    path='/driver-management/add-new'
                    element={<AddDriver />}
                    />
                    <Route 
                    path='/driver-management/edit-driver/:id'
                    element={<EditDriver />}
                    />
                    <Route 
                    path='/banners'
                    element={<Banners />}
                    />
                    <Route 
                    path='/banners/add-new'
                    element={<AddNewBanner />}
                    />
                    <Route 
                    path='/banners/edit-banner/:id'
                    element={<EditBanner />}
                    />
                    <Route 
                    path='/category-management/main-category'
                    element={<MainCategory />}
                    />
                    <Route 
                    path='/category-management/main-category/add'
                    element={<AddCategory />}
                    />
                    <Route 
                    path='/category-management/main-category/edit/:id'
                    element={<EditCategory />}
                    />
                    <Route 
                    path='/category-management/sub-category'
                    element={<SubCategory />}
                    />
                    <Route 
                    path='/category-management/sub-category/add'
                    element={<AddSubCategory />}
                    />
                    <Route 
                    path='/category-management/sub-category/edit/:id'
                    element={<EditSubCategory />}
                    />
                    <Route 
                    path='/analytics'
                    element={<AnalyticsAndReporting />}
                    />
                    <Route 
                    path='/coupons'
                    element={<Coupons />}
                    />
                    <Route 
                    path="/coupons/add-new"
                    element={<AddCoupon />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
