/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { FC } from "react";
  const MDXComponent: FC;
  export default MDXComponent;
}
