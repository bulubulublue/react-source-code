import { createBrowserHistory as createHistory } from "history";

export default function BrowserRouter(props){
    const history = createHistory(props);

    return <Router history={history} children={props.children} />;
}