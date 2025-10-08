import { IoPersonOutline } from "react-icons/io5";
import { BsCassette } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { PiPasswordLight } from "react-icons/pi";
import { MdOutlineSubscriptions } from "react-icons/md";
// import sideImage from "../../assets/sideSign.png"

// import { IoIosInformationCircleOutline } from "react-icons/io";
import { NavLink } from "react-router";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import Button from "@/components/Button";
// import { BsStars } from "react-icons/bs";

export default function CreditCard() {
  const [formDetails, setFormDetails] = useState({
      cardNumber: "",
      fullName: "",
      expDate: "",
      cvv: ""
  })

  const handleOnChange = useCallback((e) => {
      const key = e.target.name
      const value = e.target.value
      setFormDetails(prev => ({...prev, [key]: value})) 
  },[])
  
  return (
    <div className='flex-1 h-screen flex flex-col items-center pt-[7em] gap-5'>
      <div className="text-left space-y-5 w-[34em]">
        <div className="mb-10">
          <h2 className="font-bold text-2xl">Credit Card Details</h2>
          <p className="mt-5">Enter credit card details for subscription to complete <br /> subscription</p>
        </div>
        <form action="" className="space-y-3 ">
          <Input
              className="mb-[8px]"
              value={formDetails.cardNumber}
              onChange={handleOnChange}
              label={<label className="text-[#1E1E1E] font-medium text-[0.9em]">Card number</label>} 
              placeholder=""
              type="number"
              name="cardNumber"
            />
            <Input
              className="mb-[8px]"
              value={formDetails.fullName}
              onChange={handleOnChange}
              label={<label className="text-[#1E1E1E] font-medium text-[0.9em]">Full Name</label>} 
              placeholder=""
              type="text"
              name="fullName"
            />
            <div className="flex gap-5">
              <Input
                className="mb-[8px]"
                value={formDetails.expDate}
                onChange={handleOnChange}
                label={<label className="text-[#1E1E1E] font-medium text-[0.9em]">Expiry Date</label>} 
                placeholder=""
                type="date"
                name="expDate"
              />
              <Input
                className="mb-[8px]"
                value={formDetails.cvv}
                onChange={handleOnChange}
                label={<label className="text-[#1E1E1E] font-medium text-[0.9em]">CVV</label>} 
                placeholder=""
                type="number"
                name="cvv"
              />
            </div>
          {/* <button className="bg-lime-900 p-2 text-white w-[435px] rounded-md"><NavLink to="/creditotp">Next</NavLink></button> */}
          <Button>Next</Button>
        </form>
      </div>
    </div>
  )
}

