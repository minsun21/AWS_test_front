import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PostWrite from "./screen/posts/PostWrite";
import PostsList from "./screen/posts/PostsList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/api/v1/posts" component={PostWrite} />
        <Route exact path="/" component={PostsList} />
      </Switch>
    </Router>

  );
}

export default App;
