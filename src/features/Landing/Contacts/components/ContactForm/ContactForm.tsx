import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./ContactForm.css";
import type { ContactFormType } from "@src/shared/types";
import { ContactSchema } from "@src/shared/schema/ContactSchema";
import { useContactMutation } from "@src/store/api/contactApi";
import { showToast } from "@src/shared/helpers";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import { useEffect, useState } from "react";

export const ContactForm = () => {
  const [contact, { isLoading }] = useContactMutation();
  const [showLoading, setShowLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactSchema),
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading || isSubmitting) {
      timer = setTimeout(() => setShowLoading(true), 0);
    } else if (!isLoading && !isSubmitting) {
      timer = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isLoading, isSubmitting]);

  const onSubmit = async (data: ContactFormType) => {
    try {
      await contact(data).unwrap();
      showToast("Success", "Message sent successfully", ToastType.SUCCESS);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form id="contact-form" className="p-6 lg:p-12 lg:px-24 w-full max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-gibed text-3xl text-c-yellow mb-8">Contact Us</h1>

      <div className="form-group">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-c-dark-gray">
          Email
        </label>
        <input
          {...register("email")}
          type="text"
          id="email"
          onChange={() => clearErrors("email")}
          className={`bg-c-light-gray border w-full border-c-dark-gray text-c-dark text-base rounded-xl p-3 focus:outline-none ${errors.email ? "border-red-500" : ""}`}
          placeholder="example@mail.com"
        />
        <span
          className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.email ? "opacity-100" : "opacity-0"}`}>
          {errors.email?.message ?? "\u00A0"}
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-c-dark-gray">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={5}
          id="message"
          onChange={() => clearErrors("message")}
          className={`bg-c-light-gray border w-full border-c-dark-gray text-c-dark text-base rounded-xl p-3 focus:outline-none ${errors.message ? "border-red-500" : ""}`}
          placeholder="Your message here"
        />
        <span
          className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.message ? "opacity-100" : "opacity-0"}`}>
          {errors.message?.message ?? "\u00A0"}
        </span>
      </div>

      <button
        type="submit"
        disabled={showLoading}
        className={`submit text-lg btn-secondary mt-8 rounded-3xl py-1 w-30 ${showLoading ? "loading pe-8" : ""}`}>
        Send
      </button>
    </form>
  );
};
