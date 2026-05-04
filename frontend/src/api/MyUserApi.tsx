import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type UserProfile = {
  _id: string;
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isPending: isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createUserRequest,
  });

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useGetMyUser = () => {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAuth0();

  const getMyUserRequest = async (): Promise<UserProfile> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myUser"],
    queryFn: getMyUserRequest,
    enabled: isAuthenticated && !isAuthLoading,
  });

  return { currentUser, isLoading, error };
};

type updateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: updateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return response.json();
  };

  const { mutateAsync: updateUser, isPending: isLoading } = useMutation({
    mutationFn: updateMyUserRequest,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.toString());
    },
  });

  return { updateUser, isLoading };
};

export const useUpdateMyUse = useUpdateMyUser;
