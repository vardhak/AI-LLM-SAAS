import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <h1>Hello folks</h1>
      <Button>Subscribe</Button>
      <UserButton />
    </>
  );
}
