import { ReduxRouter } from "@lagunovsky/redux-react-router";
import { store } from "app/store";
import { AppRoutes } from "routes";
import { browserHistory } from "utils/history";

function App() {
  return (
    <>
      <ReduxRouter
        history={browserHistory}
        store={store}
        children={<AppRoutes />}
      ></ReduxRouter>
    </>
  );
}

export default App;
