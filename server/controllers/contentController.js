const Content = require('../models/Content');

exports.getContent = async (req, res) => {
  try {
    const content = await Content.find();
    // Format into a friendly dictionary: { page: { section: data } }
    const formattedContent = {};
    content.forEach(item => {
      if (!formattedContent[item.page]) {
        formattedContent[item.page] = {};
      }
      formattedContent[item.page][item.section] = item.data;
    });
    res.json(formattedContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { page, section, data } = req.body;
    let content = await Content.findOne({ page, section });
    
    if (content) {
      content.data = data;
      await content.save();
    } else {
      content = new Content({ page, section, data });
      await content.save();
    }
    res.json({ message: 'Content updated successfully', content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};
