import {createRoot} from 'react-dom/client'
import React from 'react'
import App from "@/App"
import{HashRouter} from "react-router-dom"
const root = createRoot(document.getElementById("root")as HTMLDivElement)
root.render(
<React.StrictMode>
    <HashRouter>
    <App/>
    </HashRouter>
</React.StrictMode>
)