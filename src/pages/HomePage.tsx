import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Save, Search, Tag, Moon, Download, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Save className="w-8 h-8 text-primary-600" />,
      title: 'Easy Bookmarking',
      description: 'Save any website with a title, URL, and optional notes for quick access later.'
    },
    {
      icon: <Search className="w-8 h-8 text-primary-600" />,
      title: 'Quick Search',
      description: 'Find your bookmarks instantly with powerful search by title or URL.'
    },
    {
      icon: <Tag className="w-8 h-8 text-primary-600" />,
      title: 'Smart Categories',
      description: 'Organize bookmarks into custom categories with tags and folders.'
    },
    {
      icon: <Moon className="w-8 h-8 text-primary-600" />,
      title: 'Dark Mode',
      description: 'Easy on the eyes with a beautiful dark mode toggle for day and night browsing.'
    },
    {
      icon: <Download className="w-8 h-8 text-primary-600" />,
      title: 'Export Data',
      description: 'Export all your bookmarks as a CSV file for backup or migration.'
    },
    {
      icon: <Upload className="w-8 h-8 text-primary-600" />,
      title: 'Import Bookmarks',
      description: 'Easily import bookmarks from CSV files to populate your collection.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-500 to-accent-600 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="lg:w-1/2 text-white mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Organize Your Web<br />
                <span className="text-accent-200">The Modern Way</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">
                WebM helps you save, organize, and access your favorite websites from anywhere. 
                The smart bookmark manager for the modern web.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link 
                    to="/dashboard" 
                    className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-center transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/register" 
                      className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-center transition-colors"
                    >
                      Get Started Free
                    </Link>
                    <Link 
                      to="/login" 
                      className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium text-center transition-colors"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl transform rotate-1">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Bookmark className="w-8 h-8 text-primary-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">My Bookmarks</h3>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                            <span className="text-primary-600 dark:text-primary-400 font-semibold">{item}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Example Bookmark {item}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">example{item}.com</p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-2 py-1 text-xs bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300 rounded-full">Tag {item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">All the Features You Need</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              WebM comes packed with everything you need to efficiently manage your bookmarks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Organize Your Bookmarks?
              </h2>
              <p className="text-lg text-primary-100 mb-8">
                Join thousands of users who save and organize their web experiences with WebM.
                Start for free today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {isAuthenticated ? (
                  <Link 
                    to="/dashboard" 
                    className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/register" 
                      className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      Get Started Free
                    </Link>
                    <Link 
                      to="/login" 
                      className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      Learn More
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;