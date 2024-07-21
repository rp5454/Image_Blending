const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/api/blend', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
  const image1Path = req.files['image1'][0].path;
  const image2Path = req.files['image2'][0].path;

  // Call the Python script to blend the images
  exec(`python blend_images.py ${image1Path} ${image2Path}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to blend images' });
    }
    res.json({ blendedImage: stdout.trim() });
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
