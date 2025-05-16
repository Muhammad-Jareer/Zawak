import { useState } from "react";
import axios from "axios";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

const EasypaisaForm = ({orderId}) => {
  const [formData, setFormData] = useState({ transId: "", accountName: "" });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fData = new FormData();
      fData.append("image", file);
      fData.append("transactionId", formData.transId);
      fData.append("senderAccountName", formData.accountName);
      fData.append("orderId", orderId);
      fData.append("paymentMethod", "EASYPAISA");

      const res = await api.post('http://localhost:8000/api/v1/payment/pay', fData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log(res.data);
      if(res.status){
        navigate("/order-done");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Payment Steps */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 md:space-y-0 md:flex md:gap-6">
        {[1, 2, 3].map((num, idx) => (
          <div key={num} className="flex flex-col items-center gap-2 md:flex-1">
            <p className="w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full font-bold">{num}</p>
            <p className="text-gray-700 text-center">
              {idx === 0 && "Pay your bill on our account, details above mentioned."}
              {idx === 1 && "Upload the screen shot of payment proof enter your transaction ID and account name in the form fields below."}
              {idx === 2 && <>Click the <span className="font-semibold">"Pay Now"</span> button to submit your payment details for verification.</>}
            </p>
          </div>
        ))}
      </div>

      {/* Upload Zone */}
      <div className="rounded-lg p-6 transition flex items-center gap-4 border-2 border-red-900">
        <div className=" lg:min-w-[40%] flex flex-col justify-center items-center">
        {!file && <label htmlFor="dropzone-file" className="bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center px-4 h-64 lg:h-[700px] lg:w-full cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg className="w-10 h-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="text-sm font-medium text-gray-600">
              <span className="text-primary-500 font-semibold text-2xl">Click to upload</span> or drag and drop
            </p>
            <p className="text-lg text-gray-500">Supported formats: PNG, JPG</p>
          </div>
          <input id="dropzone-file" type="file" onChange={handleFileChange} className="hidden" />
        </label>}
        {file && <div className=" lg:min-w-[30%] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold font-sans text-center my-2">Your Screenshot</h2>
          <img src={URL.createObjectURL(file)} alt="Your Screenshot" className="h-[700px] w-[400px]" />
        </div>}
        </div>

        <div className="w-[30%]">
            <img src="/easypaisa-qrcode.jpg" alt="QR Code" className="h-full w-full" />
        </div>

        <div className=" lg:min-w-[30%] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold font-sans text-center my-2">Sample Screenshot</h2>
          <img src="/easypaisa-sample-screenshot.jpg" alt="Screenshot Sample Image" className="h-[700px] w-[400px]" />
        </div>
      </div>

      {/* Form */}
      <form className="bg-white shadow-lg rounded-lg p-6 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="transId" className="block text-sm font-medium text-gray-700">Transaction ID</label>
          <input
            type="text"
            id="transId"
            name="transId"
            value={formData.transId}
            onChange={handleChange}
            placeholder="Your Transaction ID"
            required
            className="mt-2 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">Account Name</label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            placeholder="Your Account Name"
            required
            className="mt-2 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button type="submit" className="w-full py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600">
          {submitting ? "Submitting..." : "Pay Now"}
        </button>
      </form>
    </>
  );
};

export default EasypaisaForm;