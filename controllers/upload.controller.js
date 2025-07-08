exports.uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file.filename
    });

  } catch (error) {
    console.error('Upload Single Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const fileNames = req.files.map(file => file.filename);
    res.status(200).json({
      message: 'Files uploaded successfully',
      files: fileNames
    });

  } catch (error) {
    console.error('Upload Multiple Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
