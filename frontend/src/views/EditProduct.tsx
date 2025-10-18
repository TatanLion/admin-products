import { Link, Form, useActionData, useNavigation, type LoaderFunctionArgs, redirect, useLoaderData, type ActionFunctionArgs } from "react-router-dom"
import { getProductById, updateProduct } from "../services/ProductService"
import ErrorMessage from "../components/ErrorMessage"
import type { Product } from "../schemas"


// @IMPORTANT: Param request to get form data and must be tiped as LoaderFunctionArgs
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  try {
    if (id !== undefined) {
      const product = await getProductById(+id);
      return product;
    }
  } catch (error) {
    console.error('Error loading product:', error);
    return redirect('/');
  }
}


export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;
  if (id === undefined) {
    return redirect('/');
  }
  try {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if (Object.values(data).includes('')) {
      error = 'Todos los campos son obligatorios'
      return error
    }

    // Call the service to create the product and wait for it to complete
    await updateProduct(data, +id);

    return redirect('/');
  } catch (error) {
    console.error('Error updating product:', error);
    return redirect('/');
  }
}

// @NOTE: Opciones de disponibilidad
const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false }
]

const EditProduct = () => {

  // @NOTE: useActionData: Hook to access the data returned from the action function after form submission.
  const error = useActionData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const product = useLoaderData() as Product;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form
        method="post"
        className="mt-10"
      >
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="name"
          >Nombre Producto:</label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
            defaultValue={product.name}
          />
        </div>
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="price"
          >Precio:</label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            defaultValue={product.price}
          />
        </div>
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="availability"
          >Disponibilidad:</label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product.availability.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          disabled={isSubmitting}
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed"
          value={isSubmitting ? 'Editando...' : 'Editar Producto'}
        />
      </Form>
    </>
  )
}

export default EditProduct