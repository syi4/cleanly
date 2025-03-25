import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/client/components/Card";
import { Logo } from "~/client/components/Logo";
import { LogInForm } from "./form";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="my-8 text-center">
        <Logo width={350} />
      </div>
      <Card className="p-5 shadow-none sm:shadow">
        <CardHeader>
          <h1 className="text-center text-2xl font-semibold">
            Log in to your account
          </h1>
        </CardHeader>
        <CardContent>
          <LogInForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-(--muted)">
            Don't have an account?{" "}
            <Link href="#" className="text-blue-500">
              {" "}
              Sign up
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
