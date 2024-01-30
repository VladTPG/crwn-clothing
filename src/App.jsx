import Home from "./routes/home/home.components";

import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<div>Shop</div>}></Route>
        <Route path="auth" element={<Authentication />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
