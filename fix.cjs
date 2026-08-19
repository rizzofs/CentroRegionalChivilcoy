const fs = require('fs');
let content = fs.readFileSync('src/pages/Home_backup.tsx', 'utf8');
content = content.replace('function App() {', 'export default function Home() {');
content = content.replace("import { BookOpen,", "import { Link } from 'react-router-dom';\nimport { BookOpen,");
content = content.replace('export default App;', 'export default Home;');
fs.writeFileSync('src/pages/Home.tsx', content);
