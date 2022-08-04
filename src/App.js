import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import ShowTime from "./components/ShowTime";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/"}
            render={(propsRoute) => {
              return (
                <>
                  <Navbar {...propsRoute} />
                  <Main {...propsRoute} />
                </>
              );
            }}
          />
          <Route exact path={"/showtime/:movie"} component={ShowTime} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
