import React, { useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactForm = () => {
  const form = useRef();

  const emailSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_YOUR_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Your message has been sent!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.text}`,
          });
        }
      );
  };

  return (
    <div>
      <h2 className="font-bold text-center  text-5xl pt-10 pb-5">
        Get in Touch
      </h2>
      <div className="flex items-center justify-center p-10">
        <form
          ref={form}
          onSubmit={emailSubmit}
          className="p-10 rounded-2xl shadow-lg w-full md:w-2/3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="from_name"
              placeholder="Name"
              className="input input-bordered w-full rounded-full"
              required
            />
            <input
              type="email"
              name="from_email"
              placeholder="Email"
              className="input input-bordered w-full rounded-full"
              required
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input input-bordered w-full rounded-full mt-4"
          />
          <textarea
            name="message"
            placeholder="Message"
            className="textarea textarea-bordered w-full rounded-2xl mt-4"
            rows="4"
            required
          ></textarea>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-green-300 text-gray-900 font-semibold rounded-full flex items-center gap-2 hover:bg-green-400 transition"
            >
              <FaPaperPlane /> Send It!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
