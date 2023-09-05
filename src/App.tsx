import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
