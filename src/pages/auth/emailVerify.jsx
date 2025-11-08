import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useVerifyEmailMutation, useCreateEmailVerificationMutation } from "@/stores/email_verifications";
// import { useVerifyEmailMutation, useCreateEmailVerificationMutation } from "@stores/email_verifications";
import { useAuth } from "@stores/auth";
import { useFormik } from "formik";
import { ChangeEvent, useContext, useRef, useState } from "react";
import Button from "@/components/Button";
import useLoading from "@/utilities/hooks/useLoading";
import ActivityIndicator from "@/components/ActivityIndicator";
import { appContext } from "@/context/appContext";

export default function EmailVerification() {
    const navigate = useNavigate()
    const {signupData} = useContext(appContext)
    const { auth } = useAuth();
    const {loading, startLoading, stopLoading} = useLoading()
    const [verifyEmailApi] = useVerifyEmailMutation();
    const [sendEmailVerificationApi] = useCreateEmailVerificationMutation();
    const numberSequence = [0, 1, 2, 3, 4, 5]
    const [userInput, setUserInput] = useState<{ [key: string]: string }>({
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
            value6: "",
        })
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const initVerifyEmail = async () => {
        let code = ""
        Object.values(userInput).map(value => {code = code + value})

        try {
            startLoading()
            await verifyEmailApi({email: signupData?.email, verification_code: code, type: "email-verification"}).unwrap().then((fulfilled) => {
                console.log(fulfilled)
                navigate('/onboarding/set-password');
            }).catch((error: unknown) => {
                console.error(error)
                toast.error("Error occured")
                navigate('/onboarding/set-password');
                // toast.error(resolveApiError(error));
            });
        } catch(error) {
            console.error(error)
            toast.error("Error occured")
        } finally {
            stopLoading()
        }
    };

    const initSendEmailVerification = () => {
        sendEmailVerificationApi({ email: auth.email,
            type: 'email-verification' 
        }).unwrap().then(() => {
            toast.success("Email sent");
        }).catch((error: unknown) => {
            console.error(error)
            toast.error("Error occured")
            // toast.error(resolveApiError(error));
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        // Only update the state if the current input is empty and the new value is a single digit
        if (userInput[`value${index + 1}`] === "" && value.length === 1) {
            setUserInput(prevState => ({
                ...prevState,
                [`value${index + 1}`]: value,
            }));

            // Shift focus to the next input field if the current one is filled
            if (index < numberSequence.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };
    
    // FOR OTP INPUT FIELD
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const { key } = e;

        if (key === 'Backspace') {
            if (userInput[`value${index + 1}`] !== "") {
                // Clear the current input field immediately
                setUserInput(prevState => ({
                    ...prevState,
                    [`value${index + 1}`]: "",
                }));
            } else if (index > 0) {
                // If the current field is already empty, move to the previous field and clear it
                inputRefs.current[index - 1]?.focus();
                setUserInput(prevState => ({
                    ...prevState,
                    [`value${index}`]: "",
                }));
            }
        }
    };

    return (
        <div className="flex flex-col h-full items-center pt-[7em] space-x-11 font-thin space-y-3">
            <div className="flex flex-col w-[34em]">
                <div className="">
                    <h2 className="font-semibold text-2xl">Email Verification</h2>
                    <p className="text-[14px] font-[300] mt-2">Check your email for a 5 digits OTP, input them in the <br />field below and verify your email</p>
                </div>
                <p className="mt-8 text-[#1E1E1E] font-[400] mb-2 text-[16px]">Enter OTP</p>
                <div className="flex justify-between mb-5">
                    {numberSequence.map((item, i) => (
                        <input 
                            // @ts-ignore
                            ref={el => inputRefs.current[i] = el} // Attach refs to the input fields
                            autoFocus={i === 0}
                            value={userInput[`value${i + 1}`]} // Bind the input value to state
                            onChange={(e) => handleInputChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            type="number" 
                            className="border border-[#D9D9D9] font-medium text-[1.5em] sm:text-[2em] text-black h-[2em] w-[13%] sm:w-[2em] text-center"
                            max={10}
                        />
                    ))}
                </div>
                <Button disabled={loading} onClick={initVerifyEmail} className="mt-2 h-[2.63em]" type="submit" >{loading ? <ActivityIndicator /> : "Next"}</Button>
                {/* <form action="" className='mt-6 rounded-lg flex flex-col gap-4'>
                    <div className="space-x-5">
                        <input
                            type="text"
                            value={values.code}
                            name={"code"}
                            required
                            placeholder="Verification code"
                            onChange={handleChange}
                            className="border w-full p-2 rounded-md outline outline-none"
                        />
                    </div>
                    <button className="bg-lime-900 p-3 text-white w-[300px] rounded-lg" onClick={handleSubmit}>Next</button>
                </form> */}
                <div role="button" className="mt-4" onClick={initSendEmailVerification}>
                    Resend email 
                </div>
            </div>
        </div>
    )
}
