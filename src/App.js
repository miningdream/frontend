import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import News from "./pages/news";
import Login from "./pages/login";
import ForgetPassword from "./pages/forget-password";
import Register from "./pages/register";
import Courses from "./pages/courses";
import Profile from "./pages/profile";
import Unavailable from "./pages/404";
import Faq from "./pages/faq";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/faq" Component={Faq} />
      <Route path="/news" Component={News} />
      <Route path="/courses" Component={Courses} />
      <Route path="/login" Component={Login} />
      <Route path="/login/forget-password" Component={ForgetPassword} />
      <Route path="/register" Component={Register}/>
      <Route path="/profile" Component={Profile} />
      <Route path="/profile/:settings" Component={Profile}/>
      <Route path="*" Component={Unavailable} />
    </Routes>
  );
}

export default App;
