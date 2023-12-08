import { NextResponse } from "next/server";
import openai from "@/utils/openai";

export async function POST(request: Request) {
  try {
    const { todos } = await request.json();
    const response = await openai.chat.completions.create({
      // Your existing configuration
       messages: [
      {
        role: "system",
        content:
          "When responding, always welcome the user as Mr.Hasnat , make it a nice welcoming message and make sure to include Welcome to Trello Clone App. Limit the response to 200 characters .",
      },
      {
        role: "user",
        content: `Hey there!, given below is a list of todos.Provide a summary of the todos,count how many todos in each category which  toDo , inProgress and completed are (given as the status key), and then tell the user to have a nice day! Here's the data: ${JSON.stringify(
          todos,
        )} .`,
      },
      
    ],

    model: "gpt-3.5-turbo",
    temperature: 0.9,
    n: 1,
    stream: false,
    max_tokens: 200,
  });

    // If the OpenAI call is successful, the response will not have a status property
    // It will directly return the result which you can send back to the client
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("Server-side error:", error);
    // Determine if the error object has a status code to return
    // const statusCode = error.status || 500; // Fallback to 500 if status is not available
    // const errorMessage = error.message || "Internal Server Error";

    return new Response(JSON.stringify({ error }), {
     
    });
  }
}
