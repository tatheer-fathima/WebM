import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Edit, Trash2, Save, X } from 'lucide-react';
import { useBookmarks, Bookmark, Category } from '../../contexts/BookmarkContext';
import BookmarkForm from './BookmarkForm';

interface BookmarkCardProps {
  bookmark: Bookmark;
  categories: Category[];
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, categories }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { deleteBookmark } = useBookmarks();

  const handleDelete = async () => {
    try {
      await deleteBookmark(bookmark.id);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  if (isEditing) {
    return (
      <motion.div
        layout
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Bookmark</h3>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <BookmarkForm 
            bookmark={bookmark} 
            onComplete={() => setIsEditing(false)} 
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{bookmark.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="Edit bookmark"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500 transition-colors"
              aria-label="Delete bookmark"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">{bookmark.url}</p>
        
        {bookmark.notes && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{bookmark.notes}</p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <span 
              key={category.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `${category.color}20`, // 20% opacity
                color: category.color 
              }}
            >
              {category.name}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Visit Site
          </a>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(bookmark.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      {/* Delete Confirmation */}
      {showConfirmDelete && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Are you sure you want to delete this bookmark?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm font-medium text-white bg-error-500 rounded hover:bg-error-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BookmarkCard;