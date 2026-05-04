import { useGetMyUser, useUpdateMyUse } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isUserLoading } = useGetMyUser();
  const { updateUser, isLoading } = useUpdateMyUse();

  const currentUserFormData = currentUser
    ? {
        name: currentUser.name ?? "",
        addressLine1: currentUser.addressLine1 ?? "",
        city: currentUser.city ?? "",
        country: currentUser.country ?? "",
      }
    : undefined;

  if (isUserLoading) {
    return <div className="p-6 text-sm text-gray-600">Loading profile...</div>;
  }

  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isLoading}
      currentUser={currentUserFormData}
    />
  );
};

export default UserProfilePage;
