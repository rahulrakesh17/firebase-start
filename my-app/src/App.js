import logo from './logo.svg';
import './App.css';
import AddForm from './pages/AddForm';
import { ContextProvider } from "./context/context"
function App() {
  return (
    <ContextProvider>
      <AddForm/>
    </ContextProvider>
    
  );
}

export default App;
