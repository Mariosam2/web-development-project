import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import "./ProfileSettingsModal.css";
import { AvatarImageDrop } from "../AvatarImageDrop/AvatarImageDrop";
import { useEffect, useState } from "react";
import { MAX_IMAGE_SIZE, showToast } from "@src/shared/helpers";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProfileSettingsForm } from "@src/shared/types";
import { ProfileSettingsSchema } from "@src/shared/schema/ProfileSettingsSchema";
import { useGetProfileQuery, useUpdateProfileMutation } from "@src/store/api/profileApi";
import { useForgotPasswordMutation } from "@src/store/api/authApi";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const ProfileSettingsModal = ({ isOpen, onOpenChange }: ProfileSettingsModalProps) => {
  const { data: profile } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileSettingsForm>({
    resolver: zodResolver(ProfileSettingsSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    if (profile?.data) {
      reset({
        firstname: profile.data.firstname,
        lastname: profile.data.lastname,
        username: profile.data.username,
        email: profile.data.email,
      });
    }
  }, [profile, reset]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isUpdating || isSubmitting) {
      timer = setTimeout(() => setShowLoading(true), 0);
    } else if (!isUpdating && !isSubmitting) {
      timer = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isUpdating, isSubmitting]);

  const onImageSelect = (file: File | null, imageRemoved: boolean) => {
    if (file !== null && file.size > MAX_IMAGE_SIZE) {
      showToast("Error", "Image must be under 5MB", ToastType.DANGER);
      return;
    }

    setImageRemoved(imageRemoved);
    setAvatar(file);
  };

  const onSubmit = async (data: ProfileSettingsForm) => {
    try {
      const formData = new FormData();
      for (const key of Object.keys(data)) {
        formData.append(key, data[key]);
      }

      if (avatar) formData.append("image", avatar);
      formData.append("imageRemoved", String(imageRemoved));

      await updateProfile(formData).unwrap();
      onOpenChange(false);
      showToast("Success", "Profile updated successfully", ToastType.SUCCESS);
    } catch (err) {
      console.error("error", err);
    }
  };

  const sendResetPasswordEmail = () => {
    if (!profile?.data.email) return;
    forgotPassword({ email: profile?.data.email });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xs" backdrop="opaque">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">Profile Settings</ModalHeader>
            <ModalBody>
              <form id="profile-form" className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex ps-4 mb-2.5">
                  <AvatarImageDrop
                    onImageSelect={onImageSelect}
                    imageUrl={
                      profile?.data.imageId ? import.meta.env.VITE_API_BASE_URL + profile?.data.imageUrl : undefined
                    }
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm text-c-dark-gray">First Name</label>
                    <input
                      {...register("firstname")}
                      className={`border border-c-gray rounded-xl px-3 py-2 text-sm ${errors.firstname ? "border-red-500" : ""}`}
                      placeholder="Firstname"
                    />
                    {errors.firstname && <span className="text-red-500 text-xs">{errors.firstname.message}</span>}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm text-c-dark-gray">Last Name</label>
                    <input
                      {...register("lastname")}
                      className={`border border-c-gray rounded-xl px-3 py-2 text-sm ${errors.lastname ? "border-red-500" : ""}`}
                      placeholder="Last name"
                    />
                    {errors.lastname && <span className="text-red-500 text-xs">{errors.lastname.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-c-dark-gray">Username</label>
                  <input
                    {...register("username")}
                    className={`border border-c-gray rounded-xl px-3 py-2 text-sm ${errors.username ? "border-red-500" : ""}`}
                    placeholder="Username"
                  />
                  {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-c-dark-gray">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className={`border border-c-gray rounded-xl px-3 py-2 text-sm ${errors.email ? "border-red-500" : ""}`}
                    placeholder="Email"
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
              </form>
              <button
                onClick={sendResetPasswordEmail}
                className="text-sm text-c-dark-gray underline text-left cursor-pointer">
                Send password reset email
              </button>
            </ModalBody>

            <ModalFooter>
              <div className="flex items-center gap-x-3 pt-2.5">
                <button className="btn-primary rounded-xl px-4 py-3" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  form="profile-form"
                  className={`btn-secondary rounded-xl px-4 py-3 ${showLoading ? "loading pe-12" : ""} `}>
                  {showLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
