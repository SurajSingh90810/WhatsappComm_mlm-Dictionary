import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"; // सुनिश्चित करें कि firebase.ts इसी फोल्डर में है

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

    // मोबाइल के लिए केवल नंबर टाइप करने की अनुमति दें
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
    const newErrors = { name: "", mobile: "", investment: "" };

    if (!formData.name.trim()) {
      newErrors.name = "कृपया अपना पूरा नाम दर्ज करें।";
      isValid = false;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile) {
      newErrors.mobile = "मोबाइल नंबर दर्ज करना आवश्यक है।";
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।";
      isValid = false;
    }

    if (formData.investment && Number(formData.investment) <= 0) {
      newErrors.investment = "कृपया सही राशि दर्ज करें।";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // फॉर्म सबमिट करने की प्रक्रिया (Firebase के साथ)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      try {
        // जो डेटा Firebase में सेव करना है उसे तैयार करें
        const leadData = {
          name: formData.name,
          mobile: formData.mobile,
          investment: formData.investment
            ? Number(formData.investment)
            : "Not Provided",
          createdAt: serverTimestamp(),
        };

        // Firebase Firestore में डेटा सेव करें
        const docRef = await addDoc(collection(db, "leads"), leadData);

        // ✅ CONSOLE LOG: सेव हुआ सारा डेटा कंसोल में दिखाएं
        console.log("✅ Data Successfully Stored in Firebase!");
        console.log("👉 Document ID:", docRef.id);
        console.log("👉 User Data:", leadData);

        setIsSubmitting(false);
        setIsSubmitted(true);

        // 1 सेकंड बाद डायलर ओपन करें
        setTimeout(() => {
          window.location.href = "tel:9558925406";
        }, 1000);
      } catch (error) {
        // अगर कोई एरर आता है तो उसे कंसोल में दिखाएं
        console.error("❌ Firebase Error:", error);
        setIsSubmitting(false);
      }
    }
  };

  const isLocked = isSubmitting || isSubmitted;
  const isFormIncomplete =
    !formData.name.trim() || formData.mobile.length !== 10;
  const isButtonDisabled = isLocked || isFormIncomplete;

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
              हमारे <span className="text-yellow-500">नेटवर्क</span> से जुड़ें
            </h2>
            {/* यहाँ हमने विवरण की जगह डेटा का उपयोग किया और निर्देश को स्पष्ट किया */}
            <p className="text-gray-400 text-sm">
              निजी निवेश की विशेष जानकारी पाने के लिए अपना <strong>डेटा</strong>{" "}
              नीचे भरें। जानकारी सुरक्षित है, कृपया सही मोबाइल नंबर दें ताकि हम
              आपसे संपर्क कर सकें।
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="text-yellow-500 text-[15px] sm:text-sm font-bold tracking-widest uppercase block mb-2">
                पूरा नाम *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="अपना पूरा नाम लिखें"
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
              <label className="text-yellow-500 text-[15px] sm:text-sm font-bold tracking-widest uppercase block mb-2">
                मोबाइल नंबर *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="10 अंकों का मोबाइल नंबर"
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
              <label className="text-yellow-500 text-[15px] sm:text-sm font-bold tracking-widest uppercase block mb-2 flex justify-between">
                <span>अनुमानित निवेश राशि (₹)</span>
                <span className="text-gray-500 text-[10px]">(वैकल्पिक)</span>
              </label>
              <input
                type="number"
                name="investment"
                value={formData.investment}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="आप कितना निवेश करना चाहते हैं?"
                className={`w-full bg-black/50 border ${
                  errors.investment ? "border-red-500" : "border-yellow-500/30"
                } rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`relative w-full group overflow-hidden px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300   ${
                  isSubmitted
                    ? "bg-green-500 text-black cursor-default shadow-green-500/40"
                    : isFormIncomplete
                      ? "bg-yellow-500/30 text-white/40 cursor-not-allowed border border-yellow-500/20"
                      : "bg-yellow-500 text-black hover:bg-yellow-400 active:scale-95 hover:scale-[1.02]"
                } ${isSubmitting ? "opacity-90 cursor-wait" : ""}`}
              >
                {!isLocked && !isFormIncomplete && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>
                )}

                <span className="text-sm md:text-base font-bold uppercase tracking-wider relative z-10 leading-tight flex items-center justify-center gap-2">
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-5 w-5 text-black"
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
                      className="w-5 h-5 text-black"
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
