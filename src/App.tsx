import { Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import {
  AboutPageStub,
  ArticlesPageStub,
  HomePage,
  ProjectsPageStub,
} from "@/pages/stubs";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPageStub />} />
        <Route path="/projects" element={<ProjectsPageStub />} />
        <Route path="/about" element={<AboutPageStub />} />
      </Route>
    </Routes>
  );
}
