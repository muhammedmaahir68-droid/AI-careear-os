import type { BranchModuleData } from "./types";
import { CSE_IT_MODULES } from "./cse";
import { AIML_AIDS_MODULES } from "./aiml";
import { ECE_MODULES } from "./ece";
import { EEE_MODULES } from "./eee";
import { MECH_MODULES } from "./mech";

export * from "./types";
export * from "./cse";
export * from "./aiml";
export * from "./ece";
export * from "./eee";
export * from "./mech";

export function getBranchModules(branchId: string | null, roleId?: string | null): BranchModuleData[] {
  if (!branchId) return CSE_IT_MODULES;
  
  const b = branchId.toLowerCase();
  if (b === "cse" || b === "it") {
    return CSE_IT_MODULES;
  }
  if (b === "aiml" || b === "aids") {
    return AIML_AIDS_MODULES;
  }
  if (b === "ece") {
    return ECE_MODULES;
  }
  if (b === "eee") {
    return EEE_MODULES;
  }
  if (b === "mech") {
    return MECH_MODULES;
  }

  return CSE_IT_MODULES;
}
