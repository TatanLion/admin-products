## Acciones

Actions are functions that are executed when a form is submitted. They allow you to handle form submissions and perform server-side logic, such as saving data to a database or processing user input.

In this case, we will use <Form> from react-router-dom to create a form that submits data to an action function. The action function will be defined in the same file as the component that renders the form.

React Router suggest call function action, but you can name it whatever you want. The important thing is to export it from the same file as the component that renders the form. An example of this function

```tsx
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
    return error;
  }

  return {};
}
```

Even we can get that error in the component with useActionData

```tsx
const error = useActionData() as string;
```


## Loaders

Loaders are functions that are executed before a route is rendered. They allow you to fetch data from a server or perform other asynchronous operations before the component is displayed.
In this case, we will use a loader function to fetch data from an API before rendering the Products component. The loader function will be defined in the same file as the Products component.

```tsx
export async function loader() {
  const products = await getProducts();
  return products;
}
```

Then, we can use the useLoaderData hook to access the data returned by the loader function in the Products component.

```tsx
const products = useLoaderData() as Product[];
```
