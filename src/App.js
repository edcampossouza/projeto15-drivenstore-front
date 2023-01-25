import AppProvider from "./context/Provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/globalStyle";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppProvider>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/book-detail?/:id" element={<BookDetailPage />} />
        </Routes>


      </AppProvider>
    </BrowserRouter>

  );
}

export default App;
