export const streetTypeCorrections = {
  AV: "AVE",
  CR: "CRES",
  CSWY: "CAUS",
  DVWY: "DRWY",
  GLDE: "GLD",
  HIRD: "HRD",
  MTWY: "MWY",
  PWAY: "PHWY",
  PWY: "PKWY",
  THFR: "THOR",
  TRIANGLE: "TRI",
  VIAD: "VDCT",
};

export function adjustStreetType(street_type) {
  if (streetTypeCorrections[street_type]) {
    return streetTypeCorrections[street_type];
  }
  return street_type;
}
