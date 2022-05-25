import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      <Header />
      <Form />
    </div>
  );
}

export default App;
