import { createBrowserRouter } from "react-router-dom";
// @NOTE: Layouts
import Layout from "./layouts/Layout";
// @NOTE: Views
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader, // Aqui se asigna el loader al componente Products para precargar los datos de los productos, se suele crear un alias para evitar conflictos de nombres.
                action: updateAvailabilityAction // Aqui se asigna el action al componente Products para manejar el cambio de disponibilidad de los productos, se suele crear un alias para evitar conflictos de nombres.
            },
            {
                path: "products/new",
                element: <NewProduct />,
                action: newProductAction // Aqui se asigna el action al componente NewProduct para manejar la creación de nuevos productos, se suele crear un alias para evitar conflictos de nombres.
            },
            {
                path: "/products/:id/edit", // ROA Pattern - Resource Oriented Design
                element: <EditProduct />,
                loader: editProductLoader, // Aqui se asigna el loader al componente EditProduct para precargar los datos del producto a editar, se suele crear un alias para evitar conflictos de nombres.
                action: editProductAction, // Aqui se asigna el action al componente EditProduct para manejar la edición de productos, se suele crear un alias para evitar conflictos de nombres.
            },
            {
                path: "/products/:id/delete",
                action: deleteProductAction, // Aqui se asigna el action al componente ProductDetails para manejar la eliminación de productos, se suele crear un alias para evitar conflictos de nombres.
            }
        ]
    }
]);