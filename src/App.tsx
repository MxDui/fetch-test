import { QueryClient, QueryClientProvider } from "react-query";
import Search from "./pages/Search";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );
}

export default App;
