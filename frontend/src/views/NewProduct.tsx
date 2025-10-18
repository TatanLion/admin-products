import { Link, Form, useActionData, useNavigation, type ActionFunctionArgs, redirect } from "react-router-dom"
import { createProduct } from "../services/ProductService"
import ErrorMessage from "../components/ErrorMessage"




// @IMPORTANT: Param request to get form data and must be tiped as ActionFunctionArgs
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  let error = ''
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios'
    return error
  }

  // Call the service to create the product and wait for it to complete
  await createProduct(data);

  return redirect('/');

}


const NewProduct = () => {

  // @NOTE: useActionData: Hook to access the data returned from the action function after form submission.
  const error = useActionData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
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
          />
        </div>
        <input
          type="submit"
          disabled={isSubmitting}
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed"
          value={isSubmitting ? 'Creando...' : 'Crear Producto'}
        />
      </Form>
    </>
  )
}

export default NewProduct