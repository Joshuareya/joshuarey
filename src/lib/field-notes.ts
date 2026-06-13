export type FieldNote = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  read: string;
  pullQuote: string;
  body: string[];
};

// Shared social image used for link previews across the site.
export const SOCIAL_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/aOtlyaDiiwUOWRqgqtoIuHfTgA52/social-images/social-1780447474258-Good_systems_make_the_right_behavior_easier._(2).webp";

export const notes: FieldNote[] = [
  {
    slug: "how-a-typo-cost-me-250000",
    date: "June 2026",
    title: "How a typo cost me ₦250,000",
    excerpt:
      "One digit in an eleven-character string, and ₦250,000 moved to a stranger. The riskiest moments are the ones that feel routine.",
    read: "3 min",
    pullQuote: "The riskiest moments are the ones that feel routine.",
    body: [
      "I was paying a supplier. Nothing unusual — an account number on a piece of paper, typed into my banking app the way it always is.",
      "Halfway through, I got distracted. Came back, finished typing, sent it.",
      "A few minutes later: 'I haven't received anything.'",
      "One digit. Somewhere in eleven characters, I'd typed the wrong one — and ₦250,000 moved to a stranger, a different bank, a different name. Days of calls and disputes later, most of it was simply gone.",
      "What stayed with me wasn't the money. It was how ordinary the moment had been. No alarm went off. No warning. Just a routine action, slightly wrong, with a permanent result.",
      "This is the pattern I keep coming back to: the riskiest moments are the ones that feel routine. Typing a number is so familiar that no one treats it with the care it deserves — until it's too late.",
      "Once I saw it as a behavior problem rather than a 'mistake,' the system became obvious. People don't mistype because they're careless. They mistype because typing eleven digits correctly, under no particular pressure, is simply harder than it looks — and there's no feedback loop until the money is already gone.",
      "Remove the typing entirely, and the error has nowhere to live.",
      "That observation became [ScanAcc](https://scanacc.xyz) — a QR code that copies an account number exactly, every time. Not a fix for carelessness. A removal of the step where carelessness becomes expensive."
    ]
  },
  {
    slug: "cost-of-being-slightly-hard-to-use",
    date: "May 2026",
    title: "The cost of being slightly hard to use",
    excerpt:
      "When a tool is 15% harder than it should be, people don't complain. They just stop opening it.",
    read: "4 min",
    pullQuote:
      "Most products don't lose users to a competitor. They lose them to mild inconvenience.",
    body: [
      "Friction is invisible. It hides inside the small extra tap, the second-guess, the moment of uncertainty before someone commits. None of it is dramatic enough to complain about.",
      "But behavior is honest. People keep showing up to the tool that respects their time and quietly drift away from the one that doesn't. The decline is rarely loud — it just looks like fewer logins, shorter sessions, slower replies.",
      "Most products don't lose users to a competitor. They lose them to mild inconvenience. Removing 15% of the friction often does more than adding any new feature.",
    ],
  },
  {
    slug: "visibility-before-rules",
    date: "Apr 2026",
    title: "Visibility before rules",
    excerpt:
      "Most teams add policy where they should have added a clear view. Behavior corrects itself once it can be seen.",
    read: "3 min",
    pullQuote:
      "Visibility works better than enforcement. The moment people can see what is happening, most things quietly self-correct.",
    body: [
      "When a team starts misbehaving, the first instinct is usually a new rule. A new policy. A new approval step. The system gets heavier and the underlying behavior rarely changes.",
      "Visibility works better than enforcement. The moment people can see who is doing what, when, and why, most things quietly self-correct. Nobody wants to be the obvious outlier.",
      "Movlify started here. Before tracking, before logging, before any rule — just the question: can everyone see what's happening right now?",
    ],
  },
  {
    slug: "building-for-the-second-open",
    date: "Mar 2026",
    title: "On building for the second time someone opens the app",
    excerpt:
      "First-use is a marketing problem. The system is judged on day two — when the novelty is gone and the friction is honest.",
    read: "5 min",
    pullQuote:
      "Build for the returning user, not the new one. Novelty fades in a day. Habit takes weeks.",
    body: [
      "First impressions are designed. Second impressions are revealed. The onboarding flow can be polished to perfection and still hide everything that matters about a product.",
      "Day two is when the real questions surface. Is it faster than what I was doing before? Does it remember me? Does it respect what I learned yesterday?",
      "Build for the returning user, not the new one. Novelty fades in a day. Habit takes weeks. The system that survives is the one that earns its second opening.",
    ],
  },
  {
    slug: "streaks-work-dashboards-dont",
    date: "Feb 2026",
    title: "Why streaks work and dashboards don't",
    excerpt:
      "A streak is a story. A dashboard is a report. People show up for stories.",
    read: "3 min",
    pullQuote:
      "Numbers without narrative are forgettable. But a streak says something about who you are becoming.",
    body: [
      "A dashboard tells you the truth. A streak tells you who you are becoming. One is information; the other is identity.",
      "Numbers without narrative are forgettable. But a 22-week streak says something about the person holding it. It becomes part of how they see themselves, and that's a much stronger reason to return tomorrow.",
      "Tithetify isn't built around a balance. It's built around a rhythm. The streak is the story you're telling yourself about the kind of person you're becoming.",
    ],
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

export const getNextNote = (slug: string) => {
  const idx = notes.findIndex((n) => n.slug === slug);
  if (idx === -1) return undefined;
  return notes[(idx + 1) % notes.length];
};
