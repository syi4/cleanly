import ThemeButton from "~/client/components/Button/ThemeButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/client/components/Card";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="flex flex-col w-full ">
      <header className="flex p-2">
        <h1>Chore Header</h1>
        <ThemeButton />
      </header>

      <div className="grid p-5 auto-rows-min gap-4 md:grid-cols-2">
        <Card className="bg-white border-none">
          <CardHeader>
            <CardTitle className="text-xl">Matthews Bedroom</CardTitle>

            <CardDescription className="pt-3 dark:text-gray-400">
              Your journey to a cleaner, more organized world starts here. Begin
              managing your cleaning tasks, assign roles, and collaborate
              effortlessly. Whether you're tidying up a single room or an entire
              building, Cleanly makes it easy to keep everything in order.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col text-lg space-y-7">
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
          </CardContent>
        </Card>
        <Card className="bg-(--my-green) border-none">
          <CardHeader>
            <CardTitle className="text-xl">Bathroom</CardTitle>
            <CardDescription className="pt-3 dark:text-gray-400">
              Your journey to a cleaner, more organized world starts here. Begin
              managing your cleaning tasks, assign roles, and collaborate
              effortlessly. Whether you're tidying up a single room or an entire
              building, Cleanly makes it easy to keep everything in order.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col text-lg space-y-7">
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
          </CardContent>
        </Card>
        <Card className="bg-(--my-purple) border-none">
          <CardHeader>
            <CardTitle className="text-xl">Kitchen</CardTitle>
            <CardDescription className="pt-3 dark:text-gray-400">
              Your journey to a cleaner, more organized world starts here. Begin
              managing your cleaning tasks, assign roles, and collaborate
              effortlessly. Whether you're tidying up a single room or an entire
              building, Cleanly makes it easy to keep everything in order.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col text-lg space-y-7">
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
          </CardContent>
        </Card>
        <Card className="bg-(--my-orange) border-none">
          <CardHeader>
            <CardTitle className="text-xl">Living Room</CardTitle>
            <CardDescription className="pt-3 dark:text-gray-400">
              Your journey to a cleaner, more organized world starts here. Begin
              managing your cleaning tasks, assign roles, and collaborate
              effortlessly. Whether you're tidying up a single room or an entire
              building, Cleanly makes it easy to keep everything in order.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col text-lg space-y-7">
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
          </CardContent>
        </Card>
        <Card className="bg-(--my-yellow) border-none">
          <CardHeader>
            <CardTitle className="text-xl">Hallway</CardTitle>
            <CardDescription className="pt-3 dark:text-gray-400">
              Your journey to a cleaner, more organized world starts here. Begin
              managing your cleaning tasks, assign roles, and collaborate
              effortlessly. Whether you're tidying up a single room or an entire
              building, Cleanly makes it easy to keep everything in order.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col text-lg space-y-7">
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
            <div>clean bed</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
