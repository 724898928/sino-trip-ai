// @ts-nocheck
export const onRequestGet: PagesFunction<{ DB: D1Database }> = async ({ env }) => {
  const { results } = await env.DB.prepare('SELECT * FROM provinces').all()
  return Response.json(results)
}