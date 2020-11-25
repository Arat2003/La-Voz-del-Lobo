import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email.",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message:
          "Username is too short. Usernames must contain more than 2 characters.",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username cannot include an @.",
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message:
          "Password is too short. Passwords must contain more than 2 characters.",
      },
    ];
  }

  return null;
};
