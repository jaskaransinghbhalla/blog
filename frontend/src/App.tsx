import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
