import {createRoot} from 'react-dom/client'
import React from 'react'
import App from "@/App"

const root = createRoot(document.getElementById("root")as HTMLDivElement)
root.render(
<React.StrictMode>
    <App></App>
</React.StrictMode>
)