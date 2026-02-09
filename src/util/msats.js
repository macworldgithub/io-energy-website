export async function nmiLookup(NMI) {
  let response;
  try {
    response = await fetch(
      `https://mw91ji60sh.execute-api.ap-southeast-2.amazonaws.com/api/getNMIDetails?nmi=${NMI}`,
      { method: "GET" },
    );
  } catch (error) {
    console.error(error);
    return { error: `Network error. Please try again` };
  }

  if (response.status === 200) {
    const data = await response.json();
    return data.body;
  }

  return {
    error: `Server error. Please try again or search for your address instead.`,
  };
}

export function isMeterRequired(msats) {
  if (!msats) return null;
  if (msats.meterTypeCode.startsWith("COMMS")) return false;
  return true;
}

// status - 0: unknown, 1: meter install required, 2: tariff change required, 3: ready
export function getConnectionStatus(msats) {
  const tariffCode = msats?.tariffCode || null;
  const meterTypeCode = msats?.meterTypeCode || null;

  if (!tariffCode || !meterTypeCode) return 0;
  if (!meterTypeCode.startsWith("COMMS")) return 1;
  if (["RELE", "SBTOUE", "RELECL"].includes(tariffCode)) return 3;
  return 2;
}
