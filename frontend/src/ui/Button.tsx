/** @format */

// /** @format */

// import { ReactNode } from "react";

// /** @format */
// interface ButtonProps {
//   children: ReactNode;
//   type?: "primary" | "secondary";
//   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
//   options: any;
// }

// const Button: React.FC<ButtonProps> = ({
//   children,
//   type = "primary",
//   onClick,
//   options,
// }) => {
//   const genneralStyle =
//     "rounded-full flex items-center justify-center w-fit px-4 py-2 cursor-pointer";

//   const style =
//     type === "primary"
//       ? `${genneralStyle} bg-[var(--color-red-900)] text-white hover:bg-[var(--color-red-500)] transition-colors duration-200`
//       : `${genneralStyle} bg-[rgb(48,48,48)] border border-[rgb(134,134,134)] hover:bg-[rgb(101,101,101)] transition-colors duration-200`;

//   return (
//     <button className={style} onClick={onClick} {...options}>
//       {children}
//     </button>
//   );
// };

// export default Button;
