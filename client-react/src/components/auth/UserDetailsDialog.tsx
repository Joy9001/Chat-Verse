import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";
import { FiCamera, FiUser, FiUserCheck } from "react-icons/fi";

interface UserDetailsFormData {
  name: string;
  username: string;
  gender: "Male" | "Female";
  avatar: string;
}

interface UserDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  register: UseFormRegister<UserDetailsFormData>;
  errors: FieldErrors<UserDetailsFormData>;
  setValue: UseFormSetValue<UserDetailsFormData>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  avatarUrl: string;
  onChangeAvatar: () => void;
  isAvatarLoading?: boolean;
}

function UserDetailsForm({
  register,
  errors,
  setValue,
  onSubmit,
  avatarUrl,
  onChangeAvatar,
  isAvatarLoading = false,
  className = "",
}: Omit<UserDetailsDialogProps, "isOpen" | "onOpenChange"> & {
  className?: string;
}) {
  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${className}`}>
      {/* Avatar section at the top */}
      <div className="mb-2 flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="border-primary h-24 w-24 overflow-hidden rounded-full border-2">
            <img
              src={avatarUrl}
              alt="Profile Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <Button
            type="button"
            onClick={onChangeAvatar}
            disabled={isAvatarLoading}
            className="bg-primary hover:bg-primary/90 absolute -right-1 -bottom-1 h-8 w-8 rounded-full p-2 text-white"
            aria-label="Change avatar"
          >
            {isAvatarLoading ? (
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <FiCamera size={16} />
            )}
          </Button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Choose an avatar for your profile
        </p>
      </div>

      {/* Form fields */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <div className="relative">
          <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
          <Input
            {...register("name")}
            placeholder="Enter your name"
            className="focus-visible:ring-primary/50 border-gray-300 pl-10"
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Username</label>
        <div className="relative">
          <FiUserCheck className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
          <Input
            {...register("username")}
            placeholder="Enter your username"
            className="focus-visible:ring-primary/50 border-gray-300 pl-10"
          />
        </div>
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Gender</label>
        <Select
          {...register("gender")}
          onValueChange={(value: "Male" | "Female") =>
            setValue("gender", value)
          }
        >
          <SelectTrigger className="focus:ring-primary/50 border-gray-300 bg-white text-gray-900">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="bg-primary hover:bg-primary/90 mt-4 w-full text-white"
      >
        Complete Registration
      </Button>
    </form>
  );
}

export function UserDetailsDialog(props: UserDetailsDialogProps) {
  const { isOpen, onOpenChange } = props;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="bg-white p-6 sm:max-w-[425px]">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Complete Your Profile
            </DialogTitle>
          </DialogHeader>
          <UserDetailsForm {...props} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="border-b pb-4 text-left">
          <DrawerTitle className="text-xl font-bold text-gray-900">
            Complete Your Profile
          </DrawerTitle>
        </DrawerHeader>
        <div className="max-h-[70vh] overflow-y-auto px-4 py-6">
          <UserDetailsForm {...props} />
        </div>
        <DrawerFooter className="border-t pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
