const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5000;
const usersList = path.join(__dirname , 'users.js');
const postsFile = path.join(__dirname , 'posts.json');
const postsDir = path.join(__dirname, 'uploads', 'posts');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // отдавать картинки по ссылке


function Loading() {
  if (!fs.existsSync(usersList)) return [];
  const data = fs.readFileSync(usersList);
  return JSON.parse(data);
}

function Saving(users) {
  fs.writeFileSync(usersList, JSON.stringify(users, null, 2));
}

app.post('/', (req, res) => {
  const { email, password } = req.body;
  const USING = Loading();

  const userExist = USING.find((u) => u.email === email);

  if (userExist) {
    return res.status(400).json({ message: 'This user is already registered' });
  }

  const NewUser = { email, password };
  USING.push(NewUser);
  Saving(USING);

  res.status(200).json({ message: 'You registered successfully' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const USING = Loading();

  const user = USING.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Welcome', user: { email } });
});


function loadPosts() {
  if (!fs.existsSync(postsFile)) return [];
  const data = fs.readFileSync(postsFile);
  return JSON.parse(data);
}

function savePosts(posts) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

app.post('/posts', upload.single('image'), (req, res) => {
  const { title, content, email } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const newPost = {
    id: Date.now(),
    email,
    title,
    content,
    image,
    createdAt: new Date().toISOString(),
  };

  const posts = loadPosts();
  posts.push(newPost);
  savePosts(posts);

  res.status(201).json({ message: 'Post created successfully', post: newPost });
});

app.get('/posts', (req, res) => {
    const postsFile = path.join(__dirname, 'posts.json');
  
    if (!fs.existsSync(postsFile)) {
      return res.json([]);
    }
  
    const data = fs.readFileSync(postsFile);
    const posts = JSON.parse(data);
    res.json(posts);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
