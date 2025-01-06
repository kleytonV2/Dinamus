'use client'

import { useState } from "react"
import Image from 'next/image';
import logo from "@/app/assets/logo.png";
import phone from "@/app/assets/phone.png";

interface EmailState {
  success: boolean;
  message: string;
}

export default function ContactSection () {

    const [emailState, setEmailState] = useState<EmailState | null>(null);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setEmailState({ success: true, message: result.message || 'Email sent successfully!' });
        } else {
          setEmailState({ success: false, message: result.error || 'Failed to send email.' });
        }
      } catch (error) {
        setEmailState({ success: false, message: 'An unexpected error occurred.' });
      }
    };

    return (
      <div className="w-full flex flex-col lg:flex-row items-center justify-between py-12 px-6">

        <div className="w-full lg:w-1/2 h-auto flex flex-col items-center justify-center">
          <div className="w-full lg:w-1/2">
            <Image className="w-full h-auto" src={logo} alt="logo" />
          </div>
          <div className="flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-200 rounded-lg p-8 max-w-lg w-full lg:w-1/2">
            <div className="w-1/3 mb-2">
              <Image className="w-full h-auto" src={phone} alt="phone" />
            </div>
            <p>+34 633 33 44 55</p>
          </div>
        </div>

        <div className="bg-white hover:shadow-xl transition-shadow duration-200 rounded-lg p-8 max-w-lg w-full lg:w-1/2 lg:mt-0 mt-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-600">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows='5'
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {emailState && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  emailState.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {JSON.stringify(emailState.message)}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    )
  }
  