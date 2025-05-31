import React, { useState, useEffect } from 'react';
import { useBookmarks, Bookmark } from '../../contexts/BookmarkContext';
import { Link, Save } from 'lucide-react';

interface BookmarkFormProps {
  bookmark?: Bookmark;
  onComplete: () => void;
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({ bookmark, onComplete }) => {
  const { categories, addBookmark, updateBookmark, isLoading } = useBookmarks();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    notes: '',
    categoryIds: [] as string[],
  });
  const [errors, setErrors] = useState({
    title: '',
    url: '',
  });

  useEffect(() => {
    if (bookmark) {
      setFormData({
        title: bookmark.title,
        url: bookmark.url,
        notes: bookmark.notes || '',
        categoryIds: bookmark.categoryIds,
      });
    }
  }, [bookmark]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    
    setFormData(prev => ({ ...prev, categoryIds: selectedValues }));
  };

  const validateForm = () => {
    const newErrors = {
      title: '',
      url: '',
    };
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      try {
        // Check if it's a valid URL
        new URL(formData.url);
      } catch (e) {
        newErrors.url = 'Please enter a valid URL (e.g., https://example.com)';
      }
    }
    
    setErrors(newErrors);
    return !newErrors.title && !newErrors.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (bookmark) {
        await updateBookmark(bookmark.id, formData);
      } else {
        await addBookmark(formData);
      }
      onComplete();
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title <span className="text-error-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            errors.title ? 'border-error-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Website name"
        />
        {errors.title && <p className="mt-1 text-sm text-error-500">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          URL <span className="text-error-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.url ? 'border-error-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="https://example.com"
          />
        </div>
        {errors.url && <p className="mt-1 text-sm text-error-500">{errors.url}</p>}
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Add some notes about this bookmark (optional)"
        />
      </div>
      
      <div>
        <label htmlFor="categories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Categories
        </label>
        <select
          id="categories"
          name="categories"
          multiple
          value={formData.categoryIds}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple categories
        </p>
      </div>
      
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onComplete}
          className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {bookmark ? 'Update Bookmark' : 'Save Bookmark'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default BookmarkForm;