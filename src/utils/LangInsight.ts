export type LanguageUsage = {
  language: string;
  commits: number;
  color: string;
};

export type LanguageInsight = {
  title: string;
  description: string;
  stat: string;
};

export function getLanguageInsight(
  languages: LanguageUsage[]
): LanguageInsight {
  if (!languages || languages.length === 0) {
    return {
      title: "No dominant language",
      description: "Your year was light on commits, but every journey starts somewhere.",
      stat: "Exploration phase detected."
    };
  }

  const sorted = [...languages].sort((a, b) => b.commits - a.commits);

  const totalCommits = sorted.reduce((sum, l) => sum + l.commits, 0);
  const main = sorted[0];
  const second = sorted[1];

  const mainPct = Math.round((main.commits / totalCommits) * 100);

  if (mainPct >= 70 && totalCommits >= 200) {
    return {
      title: "Pure specialization.",
      description: `You lived and breathed ${main.language} this year.`,
      stat: `${mainPct}% of your commits were written in ${main.language}.`
    };
  }


  if (mainPct >= 55 && second) {
    return {
      title: "A clear favorite.",
      description: `${main.language} led the way, but ${second.language} stayed close behind.`,
      stat: `${main.language}: ${main.commits} commits • ${second.language}: ${second.commits}`
    };
  }


  if (second && mainPct < 55 && mainPct > 40) {
    return {
      title: "Balanced stack.",
      description: `You moved comfortably between ${main.language} and ${second.language}.`,
      stat: `Nearly split focus across two major languages.`
    };
  }


  if (sorted.length >= 4) {
    return {
      title: "Polyglot energy.",
      description: "You switched syntax often and adapted quickly.",
      stat: `${sorted.length} languages used throughout the year.`
    };
  }


  if (totalCommits < 100) {
    return {
      title: "A quiet year.",
      description: "Less noise, more intention.",
      stat: `${totalCommits} commits total — steady and thoughtful.`
    };
  }


  return {
    title: "A distinct flavor.",
    description: `You wrote ${main.language} like a native.`,
    stat: `${mainPct}% of your code was ${main.language}.`
  };
}
