import "./App.css";
import { Route, Routes } from "react-router-dom";
import WritePage from "./pages/WritePage/WritePage";
import SearchUsernamePage from "./pages/SearchUsernamePage/SearchUsernamePage";
import MessagePage from "./pages/MessagePage/MessagePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MessagePage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/search" element={<SearchUsernamePage />} />
    </Routes>
  );
}

export default App;
