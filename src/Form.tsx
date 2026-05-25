import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    investment: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    investment: "",
  });

  // Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For mobile, restrict to numbers only as the user types
    if (name === "mobile" && value !== "" && !/^\d+$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validation Logic
  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", mobile: "", investment: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Strict Mobile Validation: Exactly 10 digits
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required.";
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
      isValid = false;
    }

    if (!formData.investment) {
      newErrors.investment = "Investment amount is required.";
      isValid = false;
    } else if (Number(formData.investment) <= 0) {
      newErrors.investment = "Please enter a valid amount.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Form Submission with SaaS-like Flow
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Prepared:", formData);

      // Step 1: Start loading state
      setIsSubmitting(true);

      // Step 2: Simulate network request / processing delay (1.2 seconds)
      setTimeout(() => {
        setIsSubmitting(false);

        // Step 3: Show Success State on the button
        setIsSubmitted(true);

        // Step 4: Wait for user to read "Submitted!" before firing the dialer (1 second)
        setTimeout(() => {
          window.location.href = "tel:9558925406";
        }, 1000);
      }, 1200);
    }
  };

  const isLocked = isSubmitting || isSubmitted;

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-30 z-0"></div>
      <div className="fixed top-[-5%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-500/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-600/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass p-8 sm:p-10 rounded-[24px] sm:rounded-[32px] border border-yellow-500/30 shadow-[0_10px_40px_rgba(234,179,8,0.15)] bg-black/80 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Join The <span className="text-yellow-500">Network</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Enter your details to access private investment insights.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="text-yellow-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="John Doe"
                className={`w-full bg-black/50 border ${
                  errors.name ? "border-red-500" : "border-yellow-500/30"
                } rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
              )}
            </div>

            {/* Mobile Input */}
            <div>
              <label className="text-yellow-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="9876543210"
                maxLength={10}
                className={`w-full bg-black/50 border ${
                  errors.mobile ? "border-red-500" : "border-yellow-500/30"
                } rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1.5">{errors.mobile}</p>
              )}
            </div>

            {/* Investment Input */}
            <div>
              <label className="text-yellow-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-2">
                Planned Investment (₹)
              </label>
              <input
                type="number"
                name="investment"
                value={formData.investment}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="500000"
                className={`w-full bg-black/50 border ${
                  errors.investment ? "border-red-500" : "border-yellow-500/30"
                } rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.investment && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.investment}
                </p>
              )}
            </div>

            {/* Submit Button with Dynamic States */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLocked}
                className={`relative w-full group overflow-hidden px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.2)] ${
                  isSubmitted
                    ? "bg-green-500 text-black cursor-default shadow-green-500/40"
                    : "bg-yellow-500 text-black hover:bg-yellow-400 active:scale-95 hover:scale-[1.02]"
                } ${isSubmitting ? "opacity-90 cursor-wait" : ""}`}
              >
                {/* Sweep animation (only shown when idle) */}
                {!isLocked && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>
                )}

                <span className="text-sm md:text-base font-bold uppercase tracking-wider relative z-10 leading-tight flex items-center justify-center gap-2">
                  {/* Loading Spinner */}
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}

                  {/* Success Checkmark */}
                  {isSubmitted && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}

                  {/* Text Logic */}
                  {isSubmitting
                    ? "Processing..."
                    : isSubmitted
                      ? "Submitted..."
                      : "Submit Application"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
