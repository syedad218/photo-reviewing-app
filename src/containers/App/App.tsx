import { Provider } from "react-redux";
import { store } from "../../lib/store";
import AppContainer from "../AppContainer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppContainer />
      </div>
    </Provider>
  );
}

export default App;
