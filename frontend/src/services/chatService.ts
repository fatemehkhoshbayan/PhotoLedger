// Replace this function body when the real chatbot API is ready.
export async function sendMessage(message: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return `Got it: "${message}". What's next?`
}
