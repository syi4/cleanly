export default async function PodPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <main className="flex flex-col w-full p-4">
      <h1>PodPage {id} Component</h1>
      Hello World
    </main>
  );
}
