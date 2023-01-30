import AppProvider from "./context/Provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/globalStyle";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/HomePage";
import NewestBooks from "./pages/NewestBooks";
import BestSellersPage from "./pages/BestSellersPage";



function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppProvider>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/book-detail?/:id" element={<BookDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/books?/newest" element={<NewestBooks />} />
          <Route path="/books?/best-sellers" element={<BestSellersPage />} />
        
        </Routes>


      </AppProvider>
    </BrowserRouter>

  );
}

export default App;
