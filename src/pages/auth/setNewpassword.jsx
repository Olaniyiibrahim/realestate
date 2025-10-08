import toast from "react-hot-toast";
// import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { setCredential, useChangePasswordMutation } from "@/stores/auth";
import useLoading from "@/utilities/hooks/useLoading";
import ActivityIndicator from "@/components/ActivityIndicator";
import { appContext } from "@/context/appContext";
// import { globalState } from "@/stores/employees";
import { useDispatch } from "react-redux";

export default function SetNewPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const {signupData, setLoggedIn} = useContext(appContext)
    // const {loading, startLoading, stopLoading} = useLoading()
    
    const [password, setPassword] = useState("")
    const [confirm, setConFirm] = useState("")

    const handleClick = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            toast.error("Passwords don't match")
            return
        }
        const body = { password: signupData.password, new_password: password }

        try {
            startLoading()
            await changePassword({...body}).unwrap()
                .then(fulfilled => {
                    toast.success("Password has been reset")
                    setLoggedIn(true)
                    dispatch(setCredential(signupData));
                    navigate('/'); 
                })
                .catch(rejected => {
                    toast.error("Error occured")
                    navigate('/'); 
                })
        } catch (error) {
            console.error(error);
            toast.error('Error occured'); 
            navigate('/'); 
        } finally {
            stopLoading()
        }
    }

  return (
    <div className='flex-1 h-screen flex flex-col items-center pt-[7em] gap-5'>
        <div className='flex flex-col w-[34em] '>
            <div className="text-left">
                {/* <img src={"/images/Logo.png"} alt="" /> */}
                <h2 className="font-semibold text-2xl">Set a Password</h2>
                <p className="text-[16px] font-[300] text-[#000000] mt-2">Set a password to log into your accout</p>
            </div>
            <form onSubmit={handleClick} action="" className="space-y-3 mt-10">
                <div className="flex flex-col gap-3">
                    <Input 
                        className="mb-[8px]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label={<label className="text-[#333333] font-medium text-[1.1em]">Password</label>} 
                        placeholder=""
                        type="password"
                        name="password"
                    />
                    <Input 
                        className="mb-[8px]"
                        value={confirm}
                        onChange={(e) => setConFirm(e.target.value)}
                        label={<label className="text-[#333333] font-medium text-[1.1em]">Confirm Password</label>} 
                        placeholder=""
                        type="password"
                        name="confirm_password"
                    />
                </div>
                <Button disabled={loading} className="mt-3" type="submit">
                    {loading? <ActivityIndicator /> : "Next"}
                </Button>
            </form>
        </div>
    </div>
  )
}
