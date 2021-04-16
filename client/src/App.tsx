import { Route, Switch } from "react-router";

function App() {
  return (
    <Switch>
      <Route path="/">
        <h1 className="title">App goes here</h1>
        <p className="subtitle">
          This <strong>is</strong> a subtitle.
        </p>
      </Route>
    </Switch>
  );
}

export default App;
