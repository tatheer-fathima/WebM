import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { useBookmarks } from '../../contexts/BookmarkContext';

const ImportExportButtons: React.FC = () => {
  const { exportBookmarks, importBookmarks, isLoading } = useBookmarks();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      await importBookmarks(files[0]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error importing bookmarks:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => exportBookmarks()}
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title="Export bookmarks as CSV"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </button>
      
      <button
        onClick={handleImportClick}
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title="Import bookmarks from CSV"
      >
        <Upload className="h-4 w-4 mr-2" />
        Import
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
    </div>
  );
};

export default ImportExportButtons;