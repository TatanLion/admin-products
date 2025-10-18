import { array, boolean, number, object, string, type InferOutput } from "valibot";

// @NOTE: Schema para validar los datos del producto al crear (desde el formulario)
export const DraftProductSchema = object({
    name: string(),
    price: number()
})

// @NOTE: Schema para validar los datos del producto al obtener (desde la API)
export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})
export const ProductsSchema = array(ProductSchema);
export type Product = InferOutput<typeof ProductSchema>;