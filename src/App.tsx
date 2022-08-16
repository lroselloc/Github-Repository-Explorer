import "./App.css";
import SearchUserPage from "./components/pages/SearchUserPage";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <div className="App">
      <Layout>
        <SearchUserPage />
      </Layout>
    </div>
  );
}

export default App;
