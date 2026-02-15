export async function getLevel(id) {
  return {
    id,
    question: "Who is smarter?",
    options: [
      { name: "Albert Einstein" },
      { name: "Nikola Tesla" }
    ],
    answer: 0
  };
}
