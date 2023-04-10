import { Fragment } from "react";
import { IMenuType } from "./type";
import { Route } from "react-router-dom";

export const renderRoutes = (routes: IMenuType[]) => {
    return routes.map((item,index) => {
        if (item.children) {
            return (
                <Fragment key={item.key}>
                    {renderRoutes(item.children)}
                </Fragment>)
        } else {
            return <Route key={item.key} path={item.key} element={item.element}></Route>
        }
    }
    )
}
