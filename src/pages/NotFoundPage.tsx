import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">Page not found</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Sorry, we couldn't find the page you're looking for. The bookmark might have been moved or deleted.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <Search className="h-5 w-5 mr-2" />
            Search bookmarks
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;