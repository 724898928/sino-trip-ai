// @ts-nocheck
export const onRequestPost: PagesFunction<{ AI: any }> = async ({ request, env }) => {
  const { messages, province } = await request.json()
  
  const systemPrompt = `你是一位中国旅游规划专家。用户计划去${province || '中国'}旅游。请根据对话生成详细的每日行程，包括景点、美食推荐、交通建议，使用Markdown格式。`
  
  const chat = [
    { role: 'system', content: systemPrompt },
    ...messages
  ]

  try {
    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: chat,
      stream: false
    })
    return Response.json({ reply: response.response })
  } catch (e) {
    // 降级到模拟回复
    return Response.json({ reply: "## 模拟行程\n**Day 1**: 抵达后游览..." })
  }
}