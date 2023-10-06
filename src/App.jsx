import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HistoryRouter, history } from './utils/history'
import { AuthRoute } from './components/AuthRoute'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'
import PcLayout from '@/pages/Layout'

function App() {
  return (
    <HistoryRouter history={history}>
      {/* <BrowserRouter> */}
      <Routes>
        {/* 需要鉴权的路由 */}
        <Route
          path="/"
          element={
            <AuthRoute>
              <PcLayout />
            </AuthRoute>
          }>
          {/* 二级路由默认页面 */}
          <Route index element={<Home />} />
          <Route path="article" element={<Article />} />
          <Route path="publish" element={<Publish />} />
        </Route>
        {/* 不需要鉴权的路由 */}
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* </BrowserRouter> */}
    </HistoryRouter>
  )
}

export default App
