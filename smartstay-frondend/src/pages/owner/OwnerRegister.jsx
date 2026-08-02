import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ownerRegister } from "../../services/ownerService";

import "../../styles/OwnerRegister.css";


const OwnerRegister = () => {


    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: ""

    });


    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [loading, setLoading] = useState(false);


    const [message, setMessage] = useState("");

    const [error, setError] = useState("");




    // Handle Input Change

    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };





    // Validation

    const validateForm = () => {


        if(formData.fullName.trim().length < 3){

            setError("Name must contain at least 3 characters");

            return false;

        }



        const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



        if(!emailRegex.test(formData.email)){

            setError("Enter valid email address");

            return false;

        }




        const mobileRegex =
        /^[6-9]\d{9}$/;



        if(!mobileRegex.test(formData.mobileNumber)){

            setError("Enter valid 10 digit mobile number");

            return false;

        }




        if(formData.password.length < 6){

            setError(
                "Password must contain minimum 6 characters"
            );

            return false;

        }





        if(formData.password !== formData.confirmPassword){


            setError(
                "Password and Confirm Password do not match"
            );


            return false;

        }



        return true;


    };






    // Submit Registration

    const handleSubmit = async(e)=>{


        e.preventDefault();


        setError("");

        setMessage("");



        if(!validateForm()){

            return;

        }



        try{


            setLoading(true);



            const ownerData = {

                fullName: formData.fullName,

                email: formData.email,

                mobileNumber: formData.mobileNumber,

                password: formData.password

            };



            const response =
            await ownerRegister(ownerData);



            setMessage(response.data);



            setTimeout(()=>{


                navigate("/owner/login");


            },2000);



        }
        catch(err){


            setError(

                err.response?.data ||
                "Registration failed"

            );


        }
        finally{


            setLoading(false);


        }


    };






    return (


        <div className="owner-register-page">


            <div className="owner-register-card">



                <h2>
                    Create Owner Account
                </h2>



                <p className="subtitle">
                    Register your account to manage PG listings
                </p>




                {
                    message &&

                    <div className="success-message">

                        {message}

                    </div>

                }





                {
                    error &&

                    <div className="error-message">

                        {error}

                    </div>

                }






                <form onSubmit={handleSubmit}>


                    {/* Full Name */}

                    <div className="input-group">


                        <input

                        type="text"

                        name="fullName"

                        placeholder="Full Name"

                        value={formData.fullName}

                        onChange={handleChange}

                        />

                    </div>





                    {/* Email */}

                    <div className="input-group">


                        <input

                        type="email"

                        name="email"

                        placeholder="Email Address"

                        value={formData.email}

                        onChange={handleChange}

                        />

                    </div>






                    {/* Mobile */}

                    <div className="input-group">


                        <input

                        type="text"

                        name="mobileNumber"

                        placeholder="Mobile Number"

                        value={formData.mobileNumber}

                        onChange={handleChange}

                        />

                    </div>








                    {/* Password */}

                    <div className="password-box">


                        <input

                        type={
                            showPassword
                            ?
                            "text"
                            :
                            "password"
                        }

                        name="password"

                        placeholder="Password"

                        value={formData.password}

                        onChange={handleChange}

                        />



                        <span

                        onClick={()=>
                            setShowPassword(!showPassword)
                        }

                        >

                        {
                            showPassword
                            ?
                            "Hide"
                            :
                            "Show"
                        }


                        </span>


                    </div>








                    {/* Confirm Password */}


                    <div className="password-box">


                        <input


                        type={
                            showConfirmPassword
                            ?
                            "text"
                            :
                            "password"
                        }


                        name="confirmPassword"


                        placeholder="Confirm Password"


                        value={formData.confirmPassword}


                        onChange={handleChange}


                        />




                        <span

                        onClick={()=>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }

                        >


                        {
                            showConfirmPassword
                            ?
                            "Hide"
                            :
                            "Show"
                        }


                        </span>


                    </div>









                    <button

                    type="submit"

                    disabled={loading}

                    >


                    {
                        loading
                        ?
                        "Registering..."
                        :
                        "Register"
                    }


                    </button>



                </form>







                <div className="login-link">


                    Already have account?


                    <Link to="/owner/login">

                        Login

                    </Link>


                </div>





            </div>


        </div>


    );

};



export default OwnerRegister;