import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Post } from './pages/Posts'
import { UpdateRoute } from './pages/UpdateRoute'
import { GenerativeAi } from './pages/AIgenerator'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blog />} ></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blogs />} />
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/post" element={<Post />}></Route>
          <Route path="/update/:blogId" element={<UpdateRoute />} />
          <Route path="/geneartiveAi" element={<GenerativeAi></GenerativeAi>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App