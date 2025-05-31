import React, { useState } from 'react';
import { useBookmarks, Bookmark, Category } from '../../contexts/BookmarkContext';
import { Search, Plus, Filter, Download, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';
import BookmarkCard from '../../components/bookmarks/BookmarkCard';
import BookmarkForm from '../../components/bookmarks/BookmarkForm';
import CategoryForm from '../../components/bookmarks/CategoryForm';
import ImportExportButtons from '../../components/bookmarks/ImportExportButtons';

type FormType = 'bookmark' | 'category' | null;

const DashboardPage: React.FC = () => {
  const { bookmarks, categories, isLoading } = useBookmarks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeForm, setActiveForm] = useState<FormType>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'az' | 'za'>('newest');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleCategoryFilter = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  const filteredBookmarks = bookmarks
    .filter(bookmark => {
      const matchesSearch = searchTerm === '' || 
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bookmark.notes && bookmark.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.some(catId => bookmark.categoryIds.includes(catId));

      return matchesSearch && matchesCategories;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">My Bookmarks</h1>
          <div className="flex flex-wrap gap-2">
            <ImportExportButtons />

            <button
              onClick={() => setActiveForm('category')}
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </button>
            
            <button
              onClick={() => setActiveForm('bookmark')}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Bookmark
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search bookmarks by title or URL..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A to Z</option>
                <option value="za">Z to A</option>
              </select>
              
              {(searchTerm || selectedCategories.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategoryFilter(category.id)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategories.includes(category.id)
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 border-2 border-primary-500'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600'
                  }`}
                  style={{
                    backgroundColor: selectedCategories.includes(category.id) 
                      ? `${category.color}20` // 20% opacity
                      : undefined,
                    borderColor: selectedCategories.includes(category.id) 
                      ? category.color 
                      : undefined,
                    color: selectedCategories.includes(category.id) 
                      ? category.color 
                      : undefined
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Forms */}
        {activeForm === 'bookmark' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Bookmark</h2>
              <button
                onClick={() => setActiveForm(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <BookmarkForm onComplete={() => setActiveForm(null)} />
          </motion.div>
        )}
        
        {activeForm === 'category' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Category</h2>
              <button
                onClick={() => setActiveForm(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CategoryForm onComplete={() => setActiveForm(null)} />
          </motion.div>
        )}

        {/* Bookmarks Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            {filteredBookmarks.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No bookmarks found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm || selectedCategories.length > 0
                    ? "No bookmarks match your current filters. Try adjusting your search or filters."
                    : "You don't have any bookmarks yet. Add your first bookmark to get started!"}
                </p>
                {(searchTerm || selectedCategories.length > 0) ? (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveForm('bookmark')}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Bookmark
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookmarks.map((bookmark) => (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    categories={categories.filter(cat => bookmark.categoryIds.includes(cat.id))}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;