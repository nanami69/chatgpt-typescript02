import fetch from "node-fetch"

export type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};

export const chatCompletion = async (
  messages: Message[]
): Promise<Message | undefined> => {
  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo",
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer {openai_key}`,
    },
    body,
  });
  const data: any = await res.json();
  // console.log(data);
  const choice = 0;
  return data.choices[choice].message;
};

const messages: Message[] = [
  {
    role: "user",
    content: "JSで`0.1+0.1+0.1`の実行結果を教えて",
  },
];

;(async () => {
    const res = await chatCompletion(messages);
    console.log(res?.content);
   })()