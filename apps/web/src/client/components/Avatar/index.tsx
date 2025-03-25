import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "~/client/lib/utils";

const avatarVariants = cva(
  [
    "flex items-center justify-center rounded-full bg-(--primary) text-white font-semibold",
  ],
  {
    variants: {
      size: {
        default: "w-8 h-8 text-base",
        sm: "w-6 h-6 text-sm",
        lg: "w-10 h-10 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type AvatarProps = VariantProps<typeof avatarVariants> & {
  name: string;
  className?: string;
};

const Avatar = ({ name, size, className }: AvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={cn(avatarVariants({ size, className }))}
      aria-label={`Avatar for ${name}`}
      role="img"
    >
      {getInitials(name)}
    </div>
  );
};

export { Avatar, avatarVariants };
