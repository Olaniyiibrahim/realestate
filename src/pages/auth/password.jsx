import { NavLink, useNavigate } from "react-router"
import Logo from "../../assets/Logo.png"
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export default function PasswordOtp() {
    const navigate = useNavigate()
    const [first , setFirst] = useState("");
    const [second , setSecond] = useState("");
    const [three , setThree] = useState("");
    const [four , setFour] = useState("");
    const [five , setFive] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleClick(e) {
        if(!first  || !second || !three || !four || !five)return toast.error("fill the required input")
        const Numbers = {
            first,
            second,
            three,
            four,
            five
        }
        e.preventDefault();
        // console.log(userData)
        try {
            setIsLoading(true); // Set loading state to true before API call
            const response =  axios.patch(
            'https://quiickshield.thriftpals.live/v1/email_verifications/icode.debug@gmail.com/verify',
              Numbers  // Replace with your API endpoint and data structure
            );
            setMessages(response.data);
            toast.success("login successful");
            navigate('/'); // Assuming you have a navigation function
        } catch (error) {
            navigate('/');
            console.error('Error fetching messages:', error);
            toast.error('Error fetching messages. Please try again.'); // Inform user about error
        } finally {
            setIsLoading(false); // Set loading state to false after API call (important for cleanup)
        }
    }
    return (
        <>
    <div className='flex flex-col items-center'>
    <p className='pl-[900px]'>Not a customer? <NavLink to="/signup" className="text-blue-700">Sign up</NavLink> </p>
    <div>
        <div className="space-y-3 flex flex-col items-center justify-center">
            <img src={Logo} alt="" className="mb-7" />
            <h2 className="font-bold text-2xl">Forgot Password</h2>
            <p className="font-light w-[350px] text-center">Check your email for a 5 digits OTP , input them in the field below and reset your password</p>
        </div>
    <form action="" className='text-center w-[500px] h-[300px] p-5 space-y-7 mt-12 rounded-lg'>
        <div className="space-y-2 ">
            <label htmlFor="" className="text-left">Enter Otp</label>
            <br />
            <div className="space-x-5 ">
                <input type="" value={first} onChange={e => setFirst(e.target.value)} required  className="border w-[50px] p-2  text-center rounded-xl outline outline-none"/>
                <input type="" value={second} onChange={e => setSecond(e.target.value)} className="border w-[50px] p-2 rounded-xl text-center outline outline-none"/>
                <input type="" value={three} onChange={e => setThree(e.target.value)} className="border w-[50px] p-2 rounded-xl text-center outline outline-none"/>
                <input type="" value={four} onChange={e => setFour(e.target.value)} className="border w-[50px] p-2 rounded-xl text-center outline outline-none"/>
                <input type="" value={five} onChange={e => setFive(e.target.value)} className="border w-[50px] p-2 rounded-xl text-center outline outline-none"/>
                
            </div>
        <button className="bg-lime-900 p-1 text-white w-[435px] rounded-md" onClick={handleClick}>{isLoading? "loading..." : "Continue"}</button>
        </div>
    </form>
    </div>
    </div>
    </>
    )
}
