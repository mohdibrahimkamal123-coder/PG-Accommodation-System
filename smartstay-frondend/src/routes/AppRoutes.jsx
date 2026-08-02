import { BrowserRouter, Routes, Route } from "react-router-dom";


// User Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PgListing from "../pages/PgListing";
import PgDetails from "../pages/PgDetails";
import UserDashboard from "../pages/UserDashboard";
import Profile from "../pages/Profile";
import MyBookings from "../pages/MyBookings";
import Wishlist from "../pages/Wishlist";


// User Protection
import ProtectedRoute from "../components/ProtectedRoute";


// Owner Pages
import OwnerLogin from "../pages/owner/OwnerLogin";
import OwnerRegister from "../pages/owner/OwnerRegister";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import AddPg from "../pages/owner/AddPg";



function AppRoutes() {


    return (

        <BrowserRouter>


            <Routes>


                {/* ==========================
                    PUBLIC USER ROUTES
                ========================== */}


                <Route 
                    path="/" 
                    element={<Home />} 
                />


                <Route 
                    path="/login" 
                    element={<Login />} 
                />


                <Route 
                    path="/register" 
                    element={<Register />} 
                />



                {/* ==========================
                    OWNER AUTH ROUTES
                ========================== */}



                <Route
                    path="/owner/login"
                    element={<OwnerLogin />}
                />


                <Route
                    path="/owner/register"
                    element={<OwnerRegister />}
                />



                {/* ==========================
                    PUBLIC PG ROUTES
                ========================== */}


                <Route 
                    path="/pgs" 
                    element={<PgListing />} 
                />


                <Route 
                    path="/pg/:id" 
                    element={<PgDetails />} 
                />




                {/* ==========================
                    OWNER ROUTES
                ========================== */}



                <Route
                    path="/owner/dashboard"
                    element={<OwnerDashboard />}
                />



                <Route
                    path="/owner/add-pg"
                    element={<AddPg />}
                />





                {/* ==========================
                    USER PROTECTED ROUTES
                ========================== */}



                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <UserDashboard />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="/profile"

                    element={

                        <ProtectedRoute>

                            <Profile />

                        </ProtectedRoute>

                    }

                />






                <Route

                    path="/bookings"

                    element={

                        <ProtectedRoute>

                            <MyBookings />

                        </ProtectedRoute>

                    }

                />






                <Route

                    path="/wishlist"

                    element={

                        <ProtectedRoute>

                            <Wishlist />

                        </ProtectedRoute>

                    }

                />




            </Routes>


        </BrowserRouter>

    );

}


export default AppRoutes;