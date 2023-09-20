import { Footer, Navbar } from "./components";
import { LayoutPage } from "./pages";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <div className="main_container">
          <LayoutPage />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
