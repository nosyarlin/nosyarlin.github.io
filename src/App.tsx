import { Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import { ArticlesPage } from "@/pages/articles-page";
import { ArticleDetailPage } from "@/pages/article-detail-page";
import { ProjectsPage } from "@/pages/projects-page";
import {
  AboutPageStub,
  HomePage,
} from "@/pages/stubs";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPageStub />} />
      </Route>
    </Routes>
  );
}
