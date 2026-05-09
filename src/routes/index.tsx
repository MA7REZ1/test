function Index() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to TanStack Start!</h1>
      <p className="text-lg text-gray-600">
        This is a basic TanStack Start application with React, TypeScript, and Tailwind CSS.
      </p>
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Features:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>TanStack Router for routing</li>
          <li>TanStack Query for data fetching</li>
          <li>Tailwind CSS for styling</li>
          <li>TypeScript for type safety</li>
          <li>Ready for Vercel deployment</li>
        </ul>
      </div>
    </div>
  );
}

export default Index;
