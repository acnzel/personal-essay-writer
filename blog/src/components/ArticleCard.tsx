import Link from 'next/link';
import { Article } from '@/lib/supabase';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const date = new Date(article.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="py-6 border-b border-[var(--border)] last:border-b-0">
      <Link href={`/article/${article.id}`} className="block group">
        <h2 className="text-xl font-semibold mb-2 group-hover:opacity-70 transition-opacity">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-[var(--muted)] mb-3 line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <time className="text-sm text-[var(--muted)]">{date}</time>
      </Link>
    </article>
  );
}
