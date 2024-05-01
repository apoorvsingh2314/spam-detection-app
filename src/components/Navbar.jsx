// Navbar.jsx
import { useDarkMode } from '/src/DarkModeContext.jsx'; // Import useDarkMode from DarkModeContext
import { Link } from 'react-router-dom';

function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode(); // Use useDarkMode hook to access dark mode state and toggle function

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gray-900 text-white h-[10vh]">
      <Link to={"/"}>
      <h1 className="text-2xl font-bold">Spam Detection</h1>
      </Link>
      <button onClick={toggleDarkMode} className={`absolute top-4 right-4 h-8 w-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} text-gray-600 hover:text-gray-900 focus:outline-none ring-2 focus:ring-offset-2 focus:ring-gray-500`}>
      <span className={`sr-only`}>{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
        <div className={`ml-[1px] h-6 w-6 rounded-full ${darkMode ? 'bg-white' : 'bg-gray-600'} transform transition duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </button>
    </nav>
  );
}

export default Navbar;
