import { FormEvent } from "react";
import { useAuthStore } from "../../stores/bears/auth.store";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const { username, password, remember } = event.target as HTMLFormElement; // aquí quedaría de tipo any todo, por eso abajo se está haciendo más completo aunque hay muchas formas para poder hacerlo como con Formik, useState, Use Form, etc
    const { username, password, remember } =
      event.target as typeof event.target & {
        username: { value: string };
        password: { value: string };
        remember: { checked: boolean };
      };
    console.log(username.value, password.value, remember.checked);

    try {
      await loginUser(username.value, password.value);
      navigate("/dashboard");

      /* aquí se podría hacer la limpieza de los campos pero como se está sacando al usuario de una url para pasarla a otra, entonces no sería tan necesario hacer esa limpieza */
      // username.value = "";
      // password.value = "";
      // remember.checked = false;
    } catch (error) {
      console.log(error);
      console.log("No se pudo autenticar");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input type="text" name="username" autoComplete="off" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" name="remember" className="text-blue-500" />
          <label className="text-gray-600 ml-2">Remember Me</label>
        </div>

        <div className="mb-6 text-blue-500">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="bg-indigo-600">
          Login
        </button>
      </form>
      <div className="mt-6 text-blue-500 text-center">
        <a href="#" className="hover:underline">
          Sign up Here
        </a>
      </div>
    </>
  );
};
