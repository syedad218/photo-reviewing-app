import { Provider } from "react-redux";
import { store } from "../../lib/store";
import ImageApproval from "../ImageApproval";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ImageApproval />
      </div>
    </Provider>
  );
}

export default App;
