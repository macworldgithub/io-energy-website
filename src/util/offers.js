// api.ts
const API_BASE =
  import.meta.env.MODE === "production" || import.meta.env.MODE === "staging"
    ? "https://api.gleen.com.au/ioenergy"
    : "http://localhost:8000/ioenergy";

// tiny fetch helper with timeout + JSON parsing + rich errors
async function http(url, options = {}) {
  const controller = new AbortController();
  const timeout = options.timeout ?? 15000;
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    const ct = res.headers.get("content-type") || "";
    const raw = await res.text();
    clearTimeout(id);

    const data =
      ct.includes("application/json") && raw ? JSON.parse(raw) : null;

    if (!res.ok) {
      const err = new Error(data?.detail || res.statusText || "Request failed");
      err.status = res.status;
      err.code = data?.code;
      err.fieldErrors = data?.field_errors;
      err.payload = data ?? raw;
      throw err;
    }
    return data ?? raw;
  } catch (e) {
    clearTimeout(id);
    if (e.name === "AbortError") {
      const err = new Error("Network timeout. Please try again.");
      err.code = "timeout";
      throw err;
    }
    throw e;
  }
}

export async function fetchOffers(token) {
  return http(`${API_BASE}/offers/${token}/`, { method: "GET" });
}

export async function acceptOffer(token, requiredFieldsData) {
  return http(`${API_BASE}/offers/${token}/accept/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requiredFieldsData),
  });
}

export async function declineOffer(token, reason = "") {
  return http(`${API_BASE}/offers/${token}/decline/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reason ? { reason } : {}),
  });
}
