import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import Datepicker, { type DateValueType } from "react-tailwindcss-datepicker";
import { endOfDay, isValid, parseISO, startOfDay } from "date-fns";
import { SearchInput } from "@/components/ui/search-input";
import { PageContainer } from "@/components/layout";
import { TextBody, TextEyebrow, TextHeading, TextMuted } from "@/components/ui";
import { ArticleCard } from "@/components/ui/article-card";
import { POST_MANIFEST } from "@/data/post-manifest";
import type { PostMeta } from "@/types/post";

function formatDateForSearch(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date.toLowerCase();
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(parsed)
    .toLowerCase();
}

function postSearchBlob(post: PostMeta): string {
  return [
    post.title,
    post.excerpt,
    post.tags.join(" "),
    post.date,
    formatDateForSearch(post.date),
  ]
    .join(" ")
    .toLowerCase();
}

export function ArticlesPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [writtenAfter, setWrittenAfter] = useState<DateValueType>(null);
  const [writtenBefore, setWrittenBefore] = useState<DateValueType>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 180);
    return () => window.clearTimeout(timer);
  }, [query]);

  const allTags = useMemo(() => {
    const unique = new Set<string>();
    for (const post of POST_MANIFEST) {
      for (const tag of post.tags) unique.add(tag);
    }
    return [...unique].sort((a, b) => a.localeCompare(b));
  }, []);

  const tagSuggestions = useMemo(() => {
    if (tagInput.length === 0) return [];
    const needle = tagInput.trim().toLowerCase();
    return allTags
      .filter((tag) => !selectedTags.includes(tag))
      .filter((tag) => !needle || tag.toLowerCase().includes(needle))
      .slice(0, 8);
  }, [allTags, selectedTags, tagInput]);

  function toValidDate(input: unknown): Date | null {
    if (!input) return null;
    const parsed = input instanceof Date ? input : new Date(String(input));
    return isValid(parsed) ? parsed : null;
  }

  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const filteredPosts = useMemo(() => {
    const afterDate = toValidDate(writtenAfter?.startDate);
    const beforeDate = toValidDate(writtenBefore?.startDate);

    return POST_MANIFEST.filter((post) => {
      if (normalizedQuery && !postSearchBlob(post).includes(normalizedQuery)) {
        return false;
      }

      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every((tag) => post.tags.includes(tag));
        if (!hasAllTags) return false;
      }

      const parsedPostDate = parseISO(post.date);
      if (!isValid(parsedPostDate)) return false;

      if (afterDate && parsedPostDate < startOfDay(afterDate)) {
        return false;
      }

      if (beforeDate && parsedPostDate > endOfDay(beforeDate)) {
        return false;
      }

      return true;
    });
  }, [normalizedQuery, selectedTags, writtenAfter, writtenBefore]);

  function addTag(tag: string) {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  }

  function clearFilters() {
    setQuery("");
    setDebouncedQuery("");
    setTagInput("");
    setSelectedTags([]);
    setWrittenAfter(null);
    setWrittenBefore(null);
  }

  return (
    <PageContainer>
      <TextEyebrow>Articles</TextEyebrow>
      <TextHeading as="h1" className="mt-2">
        All posts
      </TextHeading>
      <TextBody className="mt-3 max-w-prose">
        Filters apply to metadata only: title, excerpt, tags, and dates.
      </TextBody>

      <div className="mt-6 rounded-md border border-neutral-200 bg-white p-4 shadow-soft dark:border-neutral-700 dark:bg-neutral-800">
        <div className="grid gap-3">
          <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Search
            <SearchInput
              leftIcon={<Search className="h-4 w-4" aria-hidden />}
              placeholder="Search articles"
              aria-label="Search articles"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 py-0"
            />
          </label>
        </div>

        <div className="mt-3 grid gap-3">
          <label className="relative flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Tags
            <SearchInput
              placeholder="Filter by tag"
              aria-label="Filter by tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="h-10 py-0"
            />
            {tagSuggestions.length > 0 ? (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded-md border border-neutral-200 bg-white p-1 shadow-soft dark:border-neutral-700 dark:bg-neutral-800">
                {tagSuggestions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="block w-full rounded-md px-2 py-1.5 text-left text-sm normal-case tracking-normal text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                    onClick={() => addTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : null}
          </label>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Written After
            <Datepicker
              asSingle
              useRange={false}
              value={writtenAfter}
              onChange={setWrittenAfter}
              placeholder="Select start date"
              displayFormat="DD MMM YYYY"
              inputClassName="input-base"
              popoverDirection="down"
              primaryColor="blue"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Written Before
            <Datepicker
              asSingle
              useRange={false}
              value={writtenBefore}
              onChange={setWrittenBefore}
              placeholder="Select end date"
              displayFormat="DD MMM YYYY"
              inputClassName="input-base"
              popoverDirection="down"
              primaryColor="blue"
            />
          </label>
        </div>
      </div>

      {selectedTags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => removeTag(tag)}
              className="inline-flex items-center gap-1 rounded-md border border-primary-200 bg-primary-50 px-2 py-1 text-xs font-medium text-primary dark:border-primary-700 dark:bg-primary-900/30 dark:text-primary-200"
            >
              {tag}
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          ))}
        </div>
      ) : null}

      <TextMuted className="mt-4">
        {normalizedQuery
          ? `${filteredPosts.length} match${filteredPosts.length === 1 ? "" : "es"} for "${debouncedQuery.trim()}"`
          : `${POST_MANIFEST.length} post${POST_MANIFEST.length === 1 ? "" : "s"}`}
      </TextMuted>

      {(normalizedQuery ||
        selectedTags.length > 0 ||
        writtenAfter?.startDate ||
        writtenBefore?.startDate) && (
        <button
          type="button"
          onClick={clearFilters}
          className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Clear all filters
        </button>
      )}

      {filteredPosts.length === 0 ? (
        <div className="mt-8 rounded-md border border-dashed border-neutral-300 bg-neutral-100/60 p-6 dark:border-neutral-700 dark:bg-neutral-900/60">
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            No articles match that search.
          </p>
          <TextMuted className="mt-1">
            Try a different keyword from title, tags, excerpt, or date.
          </TextMuted>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
