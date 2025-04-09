import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "./Modal";
import { db } from "./firebase"; // Import Firebase
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

const Form = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      // Store user data in Firebase
      await db.collection("users").add(data);
      setModalMessage("Login successful! User data saved.");
      setModalOpen(true);
      reset();
    } catch (error) {
      setModalMessage("Error saving user data. Please try again.");
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/"); // Redirect to the shop
  };

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Name
          </label>
          <input
            {...register("name")}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleCloseModal} // Redirect to shop on close
      />
    </div>
  );
};

export default Form;