// SpamDetection.jsx

import { useState } from 'react';
import Loader from '../Loader';
import { FaEnvelopeCircleCheck } from 'react-icons/fa6';
import { useDarkMode } from '../DarkModeContext';

function SpamDetection() {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleInputChange = (e) => {
    setEmailText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/check-spam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailText }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: Unable to classify email.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmailText('');
    setResult('');
  };

  return (
    <div className={`h-[90vh] flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`text-3xl font-extrabold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Spam Detector</h2>
        </div>
        <div className="flex flex-col items-center">
          <textarea
            className={`border rounded-md shadow-sm py-3 px-4 mb-4 block w-full h-80 focus:outline-none ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-${darkMode ? 'indigo-500' : 'indigo-400'} focus:border-${darkMode ? 'indigo-500' : 'indigo-300'} sm:text-sm`}
            placeholder="Paste your email here..."
            value={emailText}
            onChange={handleInputChange}
          />
          <div className="flex justify-between items-center w-full">
            <button
              type="button"
              onClick={handleSubmit}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${darkMode ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'text-gray-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading || !emailText.trim()}
            >
              {loading ? <Loader /> : 'Check Spam'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${darkMode ? 'text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500' : 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </div>
        {result && (
          <p className={`mt-2 text-center text-lg flex gap-3 justify-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{result} <FaEnvelopeCircleCheck size={30} className={`${result === "Safe Email" ? 'text-green-700' : 'text-red-700'}`} /> </p>
        )}
      </div>
      {/* <button
        type="button"
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 h-8 w-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
      >
        <span className={`sr-only`}>{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
        <div className={`h-6 w-6 rounded-full ${darkMode ? 'bg-white' : 'bg-gray-600'} transform transition duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </button> */}
    </div>
  );
}

export default SpamDetection;


