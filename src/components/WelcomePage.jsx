import { Link } from 'react-router-dom';
import { useDarkMode } from '/src/DarkModeContext.jsx'; // Import useDarkMode from DarkModeContext

function WelcomePage() {
  const { darkMode } = useDarkMode(); // Use useDarkMode hook to access dark mode state

  return (
    <div className={`h-[90vh] flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className={`text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} animate-fade-in-down`}>Welcome to Your <span className={`text-indigo-600 ${darkMode ? 'dark' : 'light'}`}>Text Analysis Tools</span></h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-4 `}>Analyze and classify text with ease!</p>
        <div className="mt-8 justify-center flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link to="/spam-check" className={`inline-block font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-100 hover:bg-indigo-200 text-gray-900'} `}>
            Spam Detector
          </Link>
          <Link to="/predict-emotions" className={`inline-block font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-100 hover:bg-indigo-200 text-gray-900'} `}>
            Predict Emotions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
