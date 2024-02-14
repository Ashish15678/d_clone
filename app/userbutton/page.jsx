import { ThemeProvider } from "@/components/providers/theme-provider";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle/mode-toggle";
export default function Page() {
  return (
    <>
      <UserButton />
      {/* <ThemeProvider/> */}
      <ModeToggle/>
    </>
  );
}
