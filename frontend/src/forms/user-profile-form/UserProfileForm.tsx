import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser?: UserFormData;
};

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      country: "",
      city: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      form.reset(currentUser);
    }
  }, [currentUser, form]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="space-y-6 rounded-lg bg-gray-50 p-6 md:p-10"
    >
      <div>
        <h2 className="text-2xl font-bold">User Profile Form</h2>
        <p className="text-sm text-gray-600">
          View and change your profile information here.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" className="bg-white" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="addressLine1" className="text-sm font-medium">
            Address Line 1
          </label>
          <Input
            id="addressLine1"
            className="bg-white"
            {...register("addressLine1")}
          />
          {errors.addressLine1 && (
            <p className="text-sm text-red-500">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <Input id="city" className="bg-white" {...register("city")} />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <Input id="country" className="bg-white" {...register("country")} />
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default UserProfileForm;
