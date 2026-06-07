// @ts-nocheck
export const onRequestPost: PagesFunction<{ DB: D1Database }> = async ({ request, env }) => {
  const { text, targetLang } = await request.json()
  
  // 1. 查缓存
  const cached = await env.DB.prepare(
    'SELECT translated FROM translations WHERE source_text = ? AND lang = ?'
  ).bind(text, targetLang).first()
  
  if (cached) return Response.json({ translated: cached.translated })

  // 2. 调用 Workers AI 翻译
  const ai = env.AI
  const result = await ai.run('@cf/meta/m2m100-1.2b', {
    text,
    source_lang: 'zh',
    target_lang: targetLang
  })

  // 3. 存入缓存
  await env.DB.prepare(
    'INSERT INTO translations (source_text, lang, translated) VALUES (?, ?, ?)'
  ).bind(text, targetLang, result.translated).run()

  return Response.json({ translated: result.translated })
}