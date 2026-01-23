import { getArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/ArticleCard';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const articles = await getArticles();

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Essays</h1>
        <p className="text-[var(--muted)]">
          직장 생활, 자기계발, 삶에 대한 생각들
        </p>
      </section>

      <section>
        {articles.length === 0 ? (
          <p className="text-[var(--muted)] py-8 text-center">
            아직 글이 없습니다.
          </p>
        ) : (
          <div>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
