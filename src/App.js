import AppProvider from "./context/Provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/globalStyle";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppProvider>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/book-detail?/:id" element={<BookDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>


      </AppProvider>
    </BrowserRouter>

  );
}

export default App;
