import BrowserRouter from "./components/BrowserRouter";
import Route from "./components/Route";
import Home from "./pages/Home";
import About from "./pages/About";
import Link from "./components/Link";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </div>
        {/* <Route path="/" exact component={Home} />
        <Route path="/about" component={About} /> */}
        {/* <Switch> */}
        <Route path="/about" component={About} />
        <Route path="/:user" component={Home} />
        <Route component={() => <div>Not Found</div>} />
      {/* </Switch> */}
      </BrowserRouter>
    </div>
  );
}
