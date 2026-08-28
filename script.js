async function askAI() {
    const questionInput = document.getElementById("question");
    const answer = document.getElementById("answer");

    const question = questionInput.value.trim();

    if (!question) {
        answer.innerText = "Please enter a question.";
        return;
    }

    answer.innerText = "Thinking... 🤖";

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (data.answer) {
            answer.innerText = data.answer;
        } else {
            answer.innerText = data.error || "Something went wrong.";
        }

    } catch (error) {
        console.error(error);
        answer.innerText = "Could not connect to the server.";
    }
}