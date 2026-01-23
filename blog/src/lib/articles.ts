import { supabase, Article } from './supabase';

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data || [];
}

export async function getArticleById(id: number): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return data;
}

export async function getAllArticleIds(): Promise<number[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('id')
    .eq('published', true);

  if (error) {
    console.error('Error fetching article IDs:', error);
    return [];
  }

  return data?.map((a) => a.id) || [];
}
