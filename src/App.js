import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PostWrite from "./screen/posts/PostWrite";
import PostsList from "./screen/posts/PostsList"
import PostEdit from "./screen/posts/PostEdit";
import Login from "./screen/user/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/api/v1/posts/edit/:id" component={PostEdit} />
        <Route exact path="/api/v1/posts" component={PostWrite} />
        <Route exact path="/api/v1/list" component={PostsList} />
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>

  );
}

export default App;
