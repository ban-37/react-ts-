import {createRoot} from 'react-dom/client'
import React from 'react'
import App from "@/App"
import{HashRouter} from "react-router-dom"

import { Provider } from 'react-redux'
import { store } from './store'
import { ID, KEY, BASE } from "@/config";
import Cloud from "leancloud-storage";
Cloud.init({
  appId: ID,
  appKey: KEY,
  serverURL: BASE,
});
const root = createRoot(document.getElementById("root")as HTMLDivElement)
root.render(
<React.StrictMode>
    <HashRouter>
      <Provider store={store}>
    <App/>
    </Provider>
    </HashRouter>
</React.StrictMode>
)