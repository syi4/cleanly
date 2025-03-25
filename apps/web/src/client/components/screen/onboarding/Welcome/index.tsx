import { Button } from "~/client/components/Button";

const Welcome = ({ onClick }: { onClick: () => void }) => (
  <div className="flex flex-col flex-1 justify-center items-center px-5 space-y-4">
    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:gap-2">
      <h1 className="text-5xl">Welcome to</h1>
      <h1 className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#d946ef] to-[#5b21b6]">
        Cleanly
      </h1>
    </div>
    <h2 className="text-(--text-grey) text-2xl text-center">
      Whether you're tackling a single room or an entire building, managing
      tasks, and collaborating has never been easier.
    </h2>
    <div className="mt-15">
      <Button type="button" variant="secondary" size="lg" onClick={onClick}>
        Get Started
      </Button>
    </div>
  </div>
);

export { Welcome };
