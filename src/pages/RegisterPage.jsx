import { RegistrationTitle } from "../components/RegistrationTitle";

const RegisterPage = () => {
  return <RegistrationTitle />;
};
export default RegisterPage;

/*
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer", // Default to 'buyer'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    const { confirmPassword, ...userData } = formData; // Exclude confirmPassword from the data to be sent

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Registration successful:", result);

      navigate("/arts");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle errors, e.g., show user error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (formData.password !== formData.confirmPassword) {
      errors.password = "Passwords do not match.";
      formIsValid = false;
    }

    if (!formData.email.includes("@")) {
      errors.email = "Invalid email.";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="artist"
              checked={formData.role === "artist"}
              onChange={handleChange}
            />
            Artist
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="buyer"
              checked={formData.role === "buyer"}
              onChange={handleChange}
            />
            Buyer
          </label>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

*/
