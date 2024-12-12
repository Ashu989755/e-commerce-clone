import { X } from "lucide-react";
import { React, useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Account_icn } from "../assets/image";
import { customerOtpVerification } from "../apis/customer/authentication";
import { customerResendCode } from "../apis/customer/authentication";
import { otpValidator } from "../helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



function Verify_Email({ isOpen, closeModal, Email }) {
  const navigate = useNavigate();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpValidator),
  });
  
  const inputRefs = useRef([]);
  const location = useLocation();
  const isBusiness = location.pathname === "/business-signup";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendDisabled, setResendDisabled] = useState(true); // Resend button is disabled initially
  const [timeLeft, setTimeLeft] = useState(120);
  
  const timerRef = useRef(null); // Track timer interval
  const expiredToastShown = useRef(false); // Track if expiration toast is shown

  useEffect(() => {
    if (isOpen) {
      resetTimer();
      resetOtp();
    }
  }, [isOpen]);

  const resetTimer = () => {
    clearInterval(timerRef.current); // Clear any existing timer
    setTimeLeft(120);
    setResendDisabled(true);
    expiredToastShown.current = false; // Reset the expiration toast flag

    // Start a new timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current); // Stop the timer when time reaches zero
          if (!expiredToastShown.current) {
            toast.error("Your Authentication code has expired.");
            expiredToastShown.current = true; // Ensure toast only shows once
          }
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current); // Clean up on unmount
  }, []);

  // Function to reset OTP and clear input fields
  const resetOtp = () => {
    setOtp(["", "", "", "", "", ""]); // Reset OTP state
    inputRefs.current.forEach((input) => {
      if (input) input.value = ""; // Clear input fields
    });
  };

  const focusNextInput = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPrevInput = (index) => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    setValue("otp", newOtp);

    if (e.target.value !== "" && index < inputRefs.current.length - 1) {
      focusNextInput(index);
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      focusPrevInput(index);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const pastedOtp = pastedText.split("").slice(0, 6);
    const newOtp = [...otp];
    pastedOtp.forEach((character, index) => {
      if (inputRefs.current[index]) {
        newOtp[index] = character;
        inputRefs.current[index].value = character;
      }
    });
    setOtp(newOtp);
    setValue("otp", newOtp);
  };

  const otpString = otp.join("");

  const handleVerification = async () => {
    try {
      const apiData = {
        EmailId: Email,
        Otp: otpString,
      };
      const response = await customerOtpVerification(apiData);
      if (response?.data?.success === true) {
        closeModal();
        navigate(isBusiness ? "/business/personal-info" : "/register");
      } else {
        toast.error(response?.data?.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    if (resendDisabled) return;

    try {
      const apiData = { Email };
      const response = await customerResendCode(apiData);
      resetTimer();
      setResendDisabled(true);
      toast.success("Resend Code Successfully");
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {isOpen && (
        <div id="add_modal" className="fixed z-[9999] inset-0 overflow-y-auto">
          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {/* Modal Inner Content */}
              <div className="bg-white ">
                {/* Header */}
                <div className="mod_hd flex justify-between text-center px-6 pt-4 pb-1">
                  <div> </div>
                  <h3 className="text-xl  leading-6 text-gray-900 font-bold block mt-1 p-1" id="modal-headline">
                    Verify Email
                  </h3>
                  <button type="button" onClick={closeModal}>
                    <X />
                  </button>
                </div>
                {/* Form */}
                <div className="px-6">
                  <p className="text-sm font-medium text-center">Please enter details below</p>
                  <div className="imgg flex justify-center my-5">
                    <img src={Account_icn} alt="" width="190px" />
                  </div>
                  <h3 className="font-bold text-xl text-dark_link text-center">Account Authentication</h3>
                  <p className="text-center w-1/2 mx-auto my-2">Please enter the unique code sent to your registered email address</p>
                  <form action="">
                    <div className="otp_inp">
                      <div className="itm flex gap-3 justify-center flex-wrap py-4">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength="1"
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                            onPaste={handlePaste}
                            className="py-3 px-2 w-[70px] italic text-center rounded-lg outline-0 bg-slate-200 shadow-sm border border-transparent focus:border-text_dark"
                          />
                        ))}
                      </div>
                      <p className="text-red-600 mt-1 mx-7 text-sm">{errors.otp?.message}</p>
                    </div>
                    <div className="otp_rw flex justify-between px-5 pb-5">
                      <p className="text-sm text-dark_link">Code Expires in {formatTime(timeLeft)}</p>
                      <a
                        onClick={handleResendOtp}
                        disabled={resendDisabled}
                        className={`text-semibold underline font-bold text-sm text-dark_link ${
                          resendDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        Resend code
                      </a>
                    </div>
                    <div className="btn px-3 mb-5">
                      <button
                        onClick={handleSubmit(handleVerification)}
                        className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Verify_Email;
