// src/lib/ai.ts

interface ReadinessStats {
  checklistProgress: number; // 0-100
  xp: number;
  completedModules: number;
  streak: number;
  scores: {
    Aptitude: number;
    Coding: number;
    SQL: number;
    Communication: number;
    DSA: number;
    Interview: number;
  };
}

export async function getPlacementReadinessScore(stats: ReadinessStats): Promise<{ score: number, recommendation: string }> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.warn("No VITE_ANTHROPIC_API_KEY found, using rule-based scoring fallback.");
    return generateRuleBasedScore(stats);
  }

  try {
    const prompt = `
    You are an expert AI Career Coach evaluating a student's placement readiness for top MNCs.
    
    Here are their stats:
    - Checklist Completion: ${stats.checklistProgress}%
    - Total XP: ${stats.xp}
    - Modules Completed: ${stats.completedModules}
    - Current Streak: ${stats.streak} days
    - Skill Scores (0-100): ${JSON.stringify(stats.scores, null, 2)}
    
    Based on these metrics, provide a single numeric score (0-100) representing their overall placement readiness, followed by a concise (2-3 sentences), encouraging, and highly specific recommendation on what they should focus on next.
    
    Respond strictly in JSON format:
    {
      "score": <number>,
      "recommendation": "<string>"
    }
    `;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerously-allow-browser": "true"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawText = data.content[0].text;
    
    // Extract JSON from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to parse JSON from AI response");
    
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      score: parsed.score || 0,
      recommendation: parsed.recommendation || "Keep practicing your core skills!"
    };

  } catch (error) {
    console.error("AI scoring failed, falling back to rules:", error);
    return generateRuleBasedScore(stats);
  }
}

function generateRuleBasedScore(stats: ReadinessStats): { score: number, recommendation: string } {
  // Simple weighted average
  const avgSkills = Object.values(stats.scores).reduce((a, b) => a + b, 0) / 6;
  const rawScore = (stats.checklistProgress * 0.4) + (avgSkills * 0.6);
  const finalScore = Math.min(100, Math.round(rawScore));

  let recommendation = "You are making solid progress!";
  if (finalScore < 50) {
    recommendation = "Focus on completing your daily challenges to boost your core skill scores (DSA and Aptitude) before applying to top companies.";
  } else if (finalScore < 80) {
    recommendation = "You have a strong foundation! Now focus on finishing the final items in your Placement Ready checklist and completing more Mock Interviews.";
  } else {
    recommendation = "You are practically ready for top MNCs! Keep your streak alive, polish your resume, and start taking those technical rounds.";
  }

  return {
    score: finalScore,
    recommendation
  };
}
