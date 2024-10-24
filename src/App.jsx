import './App.css'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RulesTables from './components/RulesTables';
import EvaluateRule from './components/EvaluateRule';
function App() {
  return (
    <>
    <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
   />
     <Navbar/>
     <EvaluateRule/>
     <RulesTables/>
    </>
  )
}

export default App
