export async function submitSignup(connections, consent) {
  //merge consent into each connection for submission as bulk
  const payload = connections.map((connection) => ({
    ...connection,
    consent: consent,
  }));
  console.log("Payload for submission:", payload);
  const api_path =
    import.meta.env.MODE === "production" || import.meta.env.MODE === "staging"
      ? "https://api.gleen.com.au"
      : "http://localhost:8000";

  try {
    const response = await fetch(`${api_path}/ioenergy/signups/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.status === 200) return true;
  } catch (error) {
    console.error(error);
  }
}
