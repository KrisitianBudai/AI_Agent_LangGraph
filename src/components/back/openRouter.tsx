'use server'

export async function callOpenRouter(prompt: string, tools?: any[]) {


    // console.log("API KEY:", process.env.OPENROUTER_API_KEY);

    // try {
    //     const response = await fetch('https://openrouter.ai/api/v1/check-api-key', {
    //       method: 'GET',
    //       headers: {
    //         'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    //       },
    //     });
    
    //     console.log("key: ", response)
    //   } catch (error) {
    //     console.error('Error during API key check:', error);
    //   }
   
    // const res1 = await fetch("https://openrouter.ai/api/v1/models", {
    //     headers: {
    //         "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    //     },
    // });
    // const data1 = await res1.json();
    // const data2 = data1.data.filter((model : any) => model.id == "openai/gpt-4o")
    // console.log("Available models:", data2);



  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "model": 'openai/gpt-3.5-turbo',
      "messages": [
        {
          "role": "system",
          "content": "You are an assistant that can respond, call tools, or schedule events based on user input. Use tools only if needed.",
        },
        {
          "role": "user",
          "content": prompt,
        },
      ],
      ...(tools ? { tools } : {}),
    }),
  });

//   console.log("response: ", res);
  const json = await res.json();
//   console.log("json: ", json);
  return json;
}
