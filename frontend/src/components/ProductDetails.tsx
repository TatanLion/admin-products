import { Form, redirect, useFetcher, useNavigate, type ActionFunctionArgs } from 'react-router-dom';
import { type Product } from '../schemas';
import { formatCurrency } from '../../utils/index';
import { deleteProductById } from '../services/ProductService';

interface ProductDetailsProps {
    product: Product;
}


export async function action({ params }: ActionFunctionArgs) {
    const { id } = params;
    try {
        if (id === undefined) {
            throw new Error('ID del producto no proporcionado');
        }
        await deleteProductById(+id);
        return redirect('/');

    } catch (error) {
        console.log(error);
        throw new Error('Error al eliminar el producto');
    }
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const isAvailable = product.availability ? 'Disponible' : 'No Disponible';

    const navigate = useNavigate();
    const fetcher = useFetcher();

    return (
        <tr className="border-b border-b-gray-300">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="post">
                    <button
                        type='submit'
                        name='id'
                        value={product.id.toString()} // Se envia el id del producto ya que el backend lo recibe y cambia la disponibilidad opuesta
                        className={`${product.availability ? 'text-green-700 hover:bg-green-100' : 'text-red-700 hover:bg-red-100'} 
                            text-black rounded-lg w-full p-2 uppercase text-xs font-semibold border-1 border-black-100 hover:cursor-pointer
                        `}
                    >
                        {isAvailable}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg w-full p-2 uppercase font-bold text-center text-xs cursor-pointer"
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                    >
                        Editar
                    </button>
                    <Form
                        className='w-full'
                        method='post'
                        action={`/products/${product.id}/delete`} // Como esto se esta enviando desde el localhost y este no tiene un action, entonces se indica la ruta aquí
                        onSubmit={(e) => {
                            if (!confirm(`¿Deseas eliminar este producto? ${product.name}`)) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input
                            type='submit'
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 uppercase font-bold text-center text-xs w-full"
                            value={'Eliminar'}
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
