// Adaptive Curriculum Sequencing Engine for CARVEX AI Career OS
import type { BranchModuleData } from "./branchModules";
import { getBranchModules } from "./branchModules";
import { ROLE_TAXONOMY_MAP } from "./roleTaxonomy";

export interface StudentProfile {
  departmentId: string;
  roleId: string;
  careerLevel: number; // 0 to 8
  experienceLevel: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  targetCompanies: string[];
  learningGoals: string[];
  completedModules: string[];
  assessmentScores: Record<string, number>;
}

export function calculatePersonalizedCurriculum(profile: StudentProfile): BranchModuleData[] {
  const allModules = getBranchModules(profile.departmentId, profile.roleId);
  const roleInfo = ROLE_TAXONOMY_MAP[profile.roleId];

  // Score each module based on student profile alignment
  const scoredModules = allModules.map(module => {
    let score = 100;

    // 1. Role match boost
    if (module.roles && module.roles.includes(profile.roleId)) {
      score += 50;
    }

    // 2. Target company match boost
    if (profile.targetCompanies && profile.targetCompanies.length > 0) {
      const hasCompanyMatch = module.mnc?.some(m => 
        profile.targetCompanies.some(tc => tc.toLowerCase() === m.company.toLowerCase())
      );
      if (hasCompanyMatch) score += 30;
    }

    // 3. Level alignment adjustment
    const levelMap: Record<string, number> = {
      "Foundation": 1, "Core": 2, "Intermediate": 3, "Advanced": 4, "Placement Prep": 5, "Expert": 6, "Mastery": 7
    };
    const modLevelNum = levelMap[module.level] || 2;
    if (modLevelNum <= profile.careerLevel + 1) {
      score += 20; // Appropriate level
    } else {
      score -= 30; // Too advanced for current level
    }

    // 4. Completed penalty (move to end)
    if (profile.completedModules && profile.completedModules.includes(module.moduleTitle)) {
      score -= 200;
    }

    return { module, score };
  });

  // Sort modules descending by adaptive score
  scoredModules.sort((a, b) => b.score - a.score);

  return scoredModules.map(item => item.module);
}
