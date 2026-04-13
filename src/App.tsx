import { Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import { ArticlesPage } from "@/pages/articles-page";
import {
  AboutPageStub,
  HomePage,
  ProjectsPageStub,
} from "@/pages/stubs";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/projects" element={<ProjectsPageStub />} />
        <Route path="/about" element={<AboutPageStub />} />
      </Route>
    </Routes>
  );
}
