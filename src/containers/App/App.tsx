import { Provider } from "react-redux";
import { store } from "../../lib/store";
import AppContainer from "../AppContainer";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppContainer />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
