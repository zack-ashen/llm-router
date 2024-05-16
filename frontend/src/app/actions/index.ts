"use server";

export async function promptHandler(prompt: string) {
  const response = await fetch("http://localhost:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  console.log(response);
  return "";
}
