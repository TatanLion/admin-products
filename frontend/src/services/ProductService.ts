import axios from "axios";
import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema, ProductSchema, type Product } from "../schemas";

interface ProductData {
    [k: string]: FormDataEntryValue
}

// @NOTE: Servicio para crear un nuevo producto
export async function createProduct(data: ProductData) {
    try {
        // @NOTE: Validate data with valibot
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        if (!result.success) {
            throw new Error('Validation error');
        }

        const url = `${import.meta.env.VITE_API_URL}/api/products`;

        await axios.post(url, {
            // @NOTE: Send the validated data
            name: result.output.name,
            price: result.output.price
        })

    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}


// @NOTE: Servicio para obtener todos los productos
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url);
        // @NOTE: Validate data with valibot
        const result = safeParse(ProductsSchema, data.data);
        if (!result.success) {
            throw new Error('Validation error');
        }
        return result.output;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }

}


export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);
        // @NOTE: Validate data with valibot
        const result = safeParse(ProductSchema, data.data);
        if (!result.success) {
            throw new Error('Validation error');
        }
        return result.output;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}



export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        // @NOTE: Validate data with valibot
        const result = safeParse(ProductSchema, {
            id: Number(id),
            name: data.name,
            price: Number(data.price),
            availability: data.availability === 'true' // Convertir a booleano
        })

        if (!result.success) {
            throw new Error('Validation error');
        }

        const url = `${import.meta.env.VITE_API_URL}/api/products/${result.output.id}`;
        await axios.put(url, result.output);

    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}



export async function deleteProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}



export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const resp = await axios.patch(url);
        console.log(resp);
    }catch (error) {
        console.error('Error updating product availability:', error);
        throw error;
    }
}