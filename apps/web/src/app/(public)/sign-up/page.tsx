import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/client/components/Card";
import { Logo } from "~/client/components/Logo";
import { SignUpForm } from "./form";

export default function SignupPage() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="my-8 text-center">
        <Logo width={350} />
      </div>
      <Card className="p-5 shadow-none sm:shadow">
        <CardHeader>
          <h1 className="text-center text-2xl font-semibold">
            Create a new account
          </h1>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-(--muted)">
            Already have an account?{" "}
            <Link href="#" className="text-blue-500">
              {" "}
              Log in
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
