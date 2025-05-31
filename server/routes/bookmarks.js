import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import { Readable } from 'stream';
import Bookmark from '../models/Bookmark.js';
import Category from '../models/Category.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get all bookmarks for the current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(bookmarks);
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific bookmark
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    
    res.json(bookmark);
  } catch (error) {
    console.error('Get bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new bookmark
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, url, notes, categoryIds } = req.body;
    
    const bookmark = new Bookmark({
      title,
      url,
      notes,
      categoryIds,
      user: req.user.id,
    });
    
    await bookmark.save();
    
    res.status(201).json(bookmark);
  } catch (error) {
    console.error('Create bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a bookmark
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, url, notes, categoryIds } = req.body;
    
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        title,
        url,
        notes,
        categoryIds,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    
    res.json(bookmark);
  } catch (error) {
    console.error('Update bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a bookmark
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    
    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Delete bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Import bookmarks from CSV
router.post('/import', authenticateToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const results = [];
    const categoryMap = new Map();
    
    // Get existing categories for the user
    const existingCategories = await Category.find({ user: req.user.id });
    existingCategories.forEach(cat => {
      categoryMap.set(cat.name.toLowerCase(), cat._id);
    });
    
    // Parse CSV file
    const stream = Readable.from(req.file.buffer.toString());
    
    stream
      .pipe(csv())
      .on('data', async (data) => {
        results.push(data);
      })
      .on('end', async () => {
        const bookmarksToInsert = [];
        
        for (const row of results) {
          const categoryIds = [];
          
          // Process categories
          if (row.Categories) {
            const categoryNames = row.Categories.split(';');
            
            for (const name of categoryNames) {
              if (!name) continue;
              
              const normalizedName = name.trim().toLowerCase();
              
              if (categoryMap.has(normalizedName)) {
                categoryIds.push(categoryMap.get(normalizedName));
              } else {
                // Create new category
                const newCategory = new Category({
                  name: name.trim(),
                  user: req.user.id,
                });
                
                const savedCategory = await newCategory.save();
                categoryIds.push(savedCategory._id);
                categoryMap.set(normalizedName, savedCategory._id);
              }
            }
          }
          
          // Create bookmark object
          bookmarksToInsert.push({
            title: row.Title,
            url: row.URL,
            notes: row.Notes || '',
            categoryIds,
            user: req.user.id,
          });
        }
        
        // Insert all bookmarks
        if (bookmarksToInsert.length > 0) {
          await Bookmark.insertMany(bookmarksToInsert);
        }
        
        res.status(201).json({
          message: `Successfully imported ${bookmarksToInsert.length} bookmarks`,
          count: bookmarksToInsert.length,
        });
      });
  } catch (error) {
    console.error('Import bookmarks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export bookmarks to CSV
router.get('/export/csv', authenticateToken, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    // Get all categories
    const categories = await Category.find({ user: req.user.id });
    const categoryMap = new Map();
    
    categories.forEach(cat => {
      categoryMap.set(cat._id.toString(), cat.name);
    });
    
    // Create CSV string
    let csv = 'Title,URL,Notes,Categories,Created At\n';
    
    bookmarks.forEach(bookmark => {
      const categoryNames = bookmark.categoryIds
        .map(id => categoryMap.get(id.toString()) || '')
        .join(';');
      
      const title = bookmark.title.replace(/"/g, '""');
      const url = bookmark.url.replace(/"/g, '""');
      const notes = (bookmark.notes || '').replace(/"/g, '""');
      
      csv += `"${title}","${url}","${notes}","${categoryNames}","${bookmark.createdAt}"\n`;
    });
    
    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=webm-bookmarks.csv');
    
    res.send(csv);
  } catch (error) {
    console.error('Export bookmarks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;