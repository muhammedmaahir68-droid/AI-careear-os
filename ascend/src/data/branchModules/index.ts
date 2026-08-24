import type { BranchModuleData } from "./types";
import { CSE_IT_MODULES } from "./cse";
import { AIML_AIDS_MODULES } from "./aiml";
import { ECE_MODULES } from "./ece";
import { EEE_MODULES } from "./eee";
import { MECH_MODULES } from "./mech";
import { BIOTECH_MODULES } from "./biotech";
import { IOT_MODULES } from "./iot";
import { ROLE_SPECIFIC_MODULES } from "./roleModules";

export * from "./types";
export * from "./cse";
export * from "./aiml";
export * from "./ece";
export * from "./eee";
export * from "./mech";
export * from "./biotech";
export * from "./iot";
export * from "./roleModules";

export function getBranchModules(branchId: string | null, roleId?: string | null): BranchModuleData[] {
  if (roleId) {
    const r = roleId.toLowerCase();
    if (ROLE_SPECIFIC_MODULES[r] && ROLE_SPECIFIC_MODULES[r].length > 0) {
      return ROLE_SPECIFIC_MODULES[r];
    }
  }

  let modules: BranchModuleData[] = CSE_IT_MODULES;

  if (branchId) {
    const b = branchId.toLowerCase();
    if (b === "cse" || b === "it") modules = CSE_IT_MODULES;
    else if (b === "aiml" || b === "aids") modules = AIML_AIDS_MODULES;
    else if (b === "ece") modules = ECE_MODULES;
    else if (b === "eee") modules = EEE_MODULES;
    else if (b === "mech") modules = MECH_MODULES;
    else if (b === "biotech") modules = BIOTECH_MODULES;
    else if (b === "iot") modules = IOT_MODULES;
  }

  if (roleId) {
    const r = roleId.toLowerCase();
    const roleSpecific = modules.filter(m => m.roles && m.roles.some(role => role.toLowerCase() === r));
    if (roleSpecific.length > 0) {
      const general = modules.filter(m => !m.roles || !m.roles.some(role => role.toLowerCase() === r));
      return [...roleSpecific, ...general];
    }
  }

  return modules;
}
