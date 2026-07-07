import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
  });

  // Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "mobile" && value !== "" && !/^\d+$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validation Logic
  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", mobile: "" };

    if (!formData.name.trim()) {
      newErrors.name = "कृपया अपना पूरा नाम दर्ज करें।";
      isValid = false;
    }

    const mobileRegex = /^[0-9]{12}$/;
    if (!formData.mobile) {
      newErrors.mobile = "मोबाइल नंबर दर्ज करना आवश्यक है।";
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "कृपया सही अंकों का मोबाइल नंबर दर्ज करें।";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form Submit Logic
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      try {
        const leadData = {
          name: formData.name,
          mobile: formData.mobile,
          createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, "leads"), leadData);

        console.log("✅ Data Successfully Stored in Firebase!");
        console.log("👉 Document ID:", docRef.id);
        console.log("👉 User Data:", leadData);

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Redirect to WhatsApp 1 second after successful submission
        setTimeout(() => {
          window.location.href = "https://wa.me/447412812865";
        }, 1000);
      } catch (error) {
        console.error("❌ Firebase Error:", error);
        setIsSubmitting(false);
      }
    }
  };

  const isLocked = isSubmitting || isSubmitted;
  const isFormIncomplete =
    !formData.name.trim() || formData.mobile.length !== 12;
  const isButtonDisabled = isLocked || isFormIncomplete;

  return (
    <div className="min-h-screen bg-[#0B1120] relative flex items-center justify-center p-4 overflow-hidden">
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-20 z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-teal-500/20 blur-[120px] md:blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-5%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-600/10 blur-[100px] md:blur-[130px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass p-8 sm:p-10 rounded-[24px] sm:rounded-[32px] border border-teal-500/30 shadow-[0_10px_40px_rgba(45,212,191,0.15)] bg-[#0f172a]/60 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              हमारे <span className="text-teal-400">नेटवर्क</span> से जुड़ें
            </h2>
            <p className="text-slate-400 text-sm">
              GOALDEX से जुड़ने और फॉर्म सबमिट करने के लिए, नीचे दी गई सभी
              डिटेल्स भरना अनिवार्य है।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-teal-400 text-[15px] sm:text-sm font-bold tracking-widest uppercase block mb-2">
                पूरा नाम *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="अपना पूरा नाम लिखें"
                className={`w-full bg-[#0B1120]/50 border ${
                  errors.name ? "border-red-500" : "border-teal-500/30"
                } rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all ${
                  isLocked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-teal-400 text-[15px] sm:text-sm font-bold tracking-widest uppercase block mb-2">
                मोबाइल नंबर *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="अंकों में मोबाइल नंबर लिखें"
                maxLength={12}
                className={`w-full bg-[#0B1120]/50 border ${
                  errors.mobile ? "border-red-500" : "border-teal-500/30"
                } rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all ${
                  isLocked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1.5">{errors.mobile}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`relative w-full group overflow-hidden px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitted
                    ? "bg-emerald-500 text-white cursor-default shadow-emerald-500/40"
                    : isFormIncomplete
                      ? "bg-teal-500/30 text-white/40 cursor-not-allowed border border-teal-500/20"
                      : "bg-teal-500 text-white hover:bg-teal-400 active:scale-95 hover:scale-[1.02] shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                } ${isSubmitting ? "opacity-90 cursor-wait" : ""}`}
              >
                {!isLocked && !isFormIncomplete && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>
                )}

                <span className="text-sm md:text-base font-bold uppercase tracking-wider relative z-10 leading-tight flex items-center justify-center gap-2">
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      ></circle>
                      <path
                        fill="currentColor"
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}

                  {isSubmitted && (
                    <svg
                      className="w-5 h-5 text-white"
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

                  {isSubmitting
                    ? "प्रक्रिया चल रही है..."
                    : isSubmitted
                      ? "सबमिट हो गया!"
                      : "सबमिट करें"}
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
