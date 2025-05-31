import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  notes?: string;
  categoryIds: string[];
  createdAt: string;
  updatedAt: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  categories: Category[];
  isLoading: boolean;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBookmark: (id: string, bookmark: Partial<Bookmark>) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  exportBookmarks: () => void;
  importBookmarks: (file: File) => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  // Generate a unique ID (simple version for demo)
  const generateId = () => Math.random().toString(36).substring(2, 15);

  // Load bookmarks and categories from localStorage when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadBookmarks();
      loadCategories();
    } else {
      // Clear data when user logs out
      setBookmarks([]);
      setCategories([]);
    }
  }, [isAuthenticated]);

  const loadBookmarks = () => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    } else {
      // Demo data
      const demoBookmarks: Bookmark[] = [
        {
          id: generateId(),
          title: 'Google',
          url: 'https://www.google.com',
          notes: 'Search engine',
          categoryIds: ['cat1'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          title: 'GitHub',
          url: 'https://github.com',
          notes: 'Code repository',
          categoryIds: ['cat2'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          title: 'Stack Overflow',
          url: 'https://stackoverflow.com',
          notes: 'Developer Q&A',
          categoryIds: ['cat2'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setBookmarks(demoBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(demoBookmarks));
    }
  };

  const loadCategories = () => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // Demo data
      const demoCategories: Category[] = [
        { id: 'cat1', name: 'General', color: '#3B82F6' },
        { id: 'cat2', name: 'Development', color: '#10B981' },
        { id: 'cat3', name: 'News', color: '#F59E0B' },
      ];
      setCategories(demoCategories);
      localStorage.setItem('categories', JSON.stringify(demoCategories));
    }
  };

  const addBookmark = async (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // const response = await axios.post('http://localhost:5000/api/bookmarks', bookmark);
      
      // Simulate API call
      const now = new Date().toISOString();
      const newBookmark: Bookmark = {
        ...bookmark,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      
      const updatedBookmarks = [...bookmarks, newBookmark];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      toast.success('Bookmark added successfully!');
    } catch (error) {
      console.error('Error adding bookmark:', error);
      toast.error('Failed to add bookmark');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookmark = async (id: string, updatedFields: Partial<Bookmark>) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // const response = await axios.put(`http://localhost:5000/api/bookmarks/${id}`, updatedFields);
      
      // Simulate API call
      const updatedBookmarks = bookmarks.map((bookmark) => {
        if (bookmark.id === id) {
          return {
            ...bookmark,
            ...updatedFields,
            updatedAt: new Date().toISOString(),
          };
        }
        return bookmark;
      });
      
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      toast.success('Bookmark updated successfully!');
    } catch (error) {
      console.error('Error updating bookmark:', error);
      toast.error('Failed to update bookmark');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // await axios.delete(`http://localhost:5000/api/bookmarks/${id}`);
      
      // Simulate API call
      const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      toast.success('Bookmark deleted successfully!');
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      toast.error('Failed to delete bookmark');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = async (category: Omit<Category, 'id'>) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // const response = await axios.post('http://localhost:5000/api/categories', category);
      
      // Simulate API call
      const newCategory: Category = {
        ...category,
        id: generateId(),
      };
      
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      toast.success('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (id: string, updatedFields: Partial<Category>) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // const response = await axios.put(`http://localhost:5000/api/categories/${id}`, updatedFields);
      
      // Simulate API call
      const updatedCategories = categories.map((category) => {
        if (category.id === id) {
          return {
            ...category,
            ...updatedFields,
          };
        }
        return category;
      });
      
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      toast.success('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // await axios.delete(`http://localhost:5000/api/categories/${id}`);
      
      // Simulate API call
      const updatedCategories = categories.filter((category) => category.id !== id);
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      
      // Also update bookmarks to remove the deleted category
      const updatedBookmarks = bookmarks.map((bookmark) => {
        if (bookmark.categoryIds.includes(id)) {
          return {
            ...bookmark,
            categoryIds: bookmark.categoryIds.filter((catId) => catId !== id),
            updatedAt: new Date().toISOString(),
          };
        }
        return bookmark;
      });
      
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const exportBookmarks = () => {
    // Create CSV string
    let csv = 'Title,URL,Notes,Categories,Created At\n';
    
    bookmarks.forEach((bookmark) => {
      const categoryNames = bookmark.categoryIds
        .map((id) => categories.find((c) => c.id === id)?.name || '')
        .join(';');
      
      csv += `"${bookmark.title}","${bookmark.url}","${bookmark.notes || ''}","${categoryNames}","${bookmark.createdAt}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'webm-bookmarks.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Bookmarks exported successfully!');
  };

  const importBookmarks = async (file: File) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would upload the file to an API endpoint
      // const formData = new FormData();
      // formData.append('file', file);
      // await axios.post('http://localhost:5000/api/bookmarks/import', formData);
      
      // Simulate API call by parsing the CSV file
      const text = await file.text();
      const lines = text.split('\n');
      
      // Skip header row
      if (lines.length > 1) {
        const newBookmarks: Bookmark[] = [];
        
        // Process each line
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          // Simple CSV parsing (doesn't handle all edge cases)
          const parts = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
          if (parts && parts.length >= 2) {
            const title = parts[0].replace(/"/g, '');
            const url = parts[1].replace(/"/g, '');
            const notes = parts.length > 2 ? parts[2].replace(/"/g, '') : '';
            const categoryNames = parts.length > 3 ? parts[3].replace(/"/g, '').split(';') : [];
            
            // Find or create categories
            const categoryIds: string[] = [];
            for (const name of categoryNames) {
              if (!name) continue;
              
              let category = categories.find((c) => c.name === name);
              if (!category) {
                const newCategory: Category = {
                  id: generateId(),
                  name,
                  color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                };
                categoryIds.push(newCategory.id);
                
                // Add to categories
                setCategories((prev) => [...prev, newCategory]);
              } else {
                categoryIds.push(category.id);
              }
            }
            
            // Create new bookmark
            const now = new Date().toISOString();
            newBookmarks.push({
              id: generateId(),
              title,
              url,
              notes,
              categoryIds,
              createdAt: now,
              updatedAt: now,
            });
          }
        }
        
        // Update bookmarks state
        const updatedBookmarks = [...bookmarks, ...newBookmarks];
        setBookmarks(updatedBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        localStorage.setItem('categories', JSON.stringify(categories));
        toast.success(`Imported ${newBookmarks.length} bookmarks successfully!`);
      }
    } catch (error) {
      console.error('Error importing bookmarks:', error);
      toast.error('Failed to import bookmarks');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    bookmarks,
    categories,
    isLoading,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    addCategory,
    updateCategory,
    deleteCategory,
    exportBookmarks,
    importBookmarks,
  };

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
};

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};