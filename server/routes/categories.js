import express from 'express';
import Category from '../models/Category.js';
import Bookmark from '../models/Bookmark.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all categories for the current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id })
      .sort({ name: 1 });
    
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific category
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new category
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, color } = req.body;
    
    const category = new Category({
      name,
      color,
      user: req.user.id,
    });
    
    await category.save();
    
    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a category
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, color } = req.body;
    
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, color },
      { new: true }
    );
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a category
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Remove this category from all bookmarks
    await Bookmark.updateMany(
      { user: req.user.id, categoryIds: req.params.id },
      { $pull: { categoryIds: req.params.id } }
    );
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;