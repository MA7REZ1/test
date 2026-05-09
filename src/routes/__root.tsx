import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Body, Head, Html, Meta, Scripts, Title } from "@tanstack/start";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Title>TanStack Start App</Title>
        <Meta charSet="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="A TanStack Start app" />
      </Head>
      <Body>
        {children}
        <TanStackRouterDevtools />
        <Scripts />
      </Body>
    </Html>
  );
}
