import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Signup = () => {
  const [name, setName] = useState(""); // Initialize with empty string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To capture API errors
  const [success, setSuccess] = useState(false); // To handle success state



const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem('token'))
      router.push('/')
  
   
  }, [])






  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure input name and value
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const data = { name, email, password };

    try {
      let  res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Handle server errors
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Failed to sign up");
      }

      const response = await res.json();
      console.log("Signup successful:", response);

      // Reset the form
      setName("");
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="favicon.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign up for an account
        </h2>
        <p className="mt-2 text-center text-sm text-grey-600">
          Or
          <a
            href="/login"
            className="px-1 font-medium text-pink-600 hover:text-pink-500"
          >
            Login
          </a>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                value={name}
                onChange={handleChange}
                placeholder="Your Name"
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-pink-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-pink-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                value={password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-pink-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Sign up
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">
            Error: {error}
          </p>
        )}
        {success && (
          <p className="mt-4 text-center text-sm text-green-600">
            Signup successful!
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
