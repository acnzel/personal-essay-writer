import { notFound } from 'next/navigation';
import { getArticleById, getAllArticleIds } from '@/lib/articles';
import { getArticleContent, markdownToHtml } from '@/lib/markdown';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllArticleIds();
  return ids.map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(Number(id));

  if (!article) {
    return { title: 'Not Found' };
  }

  return {
    title: article.title,
    description: article.excerpt || undefined,
  };
}

export const revalidate = 3600;

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(Number(id));

  if (!article) {
    notFound();
  }

  const markdown = await getArticleContent(article.filename);

  if (!markdown) {
    notFound();
  }

  const content = await markdownToHtml(markdown);
  const date = new Date(article.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article>
      <header className="mb-8">
        <Link
          href="/"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4 inline-block"
        >
          ← 목록으로
        </Link>
        <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
        <time className="text-[var(--muted)]">{date}</time>
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
