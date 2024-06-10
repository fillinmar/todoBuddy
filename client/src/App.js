import './style.css';
import Header from "./components/Header/header";
import Notepad from "./components/Notepad/notepad";
import {InstallAppModal} from "./components/InstallAppModal/InstallAppModal";

function App() {
    return (
        <div className="App">
            <Header />
            <Notepad />
            <InstallAppModal />
        </div>
    );
}

export default App;
