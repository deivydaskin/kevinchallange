export async function logReq(square, pos) {
  let payload;
  if (square === "X") {
    payload = `X player played on ${pos + 1} square.`;
  } else if (square === "O") {
    payload = `O player played on ${pos + 1} square.`;
  } else if (square === "restart") {
    payload = `Game has been restarted`;
  }

  const response = await fetch(`http://localhost:3001/logs`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: `{"text": "${payload}"}`,
  });
  return response;
}

export async function getLogs() {
  let temp;
  await fetch(`http://localhost:3001/logs`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.json())
    .then((data) => {
      temp = data;
    });

  return temp;
}
