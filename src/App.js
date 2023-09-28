import BrowserRouter from "./components/BrowserRouter";
import Route from './components/Route'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
  return (
    <div>
          <BrowserRouter>
      {/* <Switch> */}
        <Route path="/home" component={Home}/>
        <Route path="/about" component={About}/>
      {/* </Switch> */}
    </BrowserRouter>
    </div>
  );
}
