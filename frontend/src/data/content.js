// All data here is illustrative sample data for the prototype.
export const CATS = {
  arts: { name: 'Creative Arts & Design', short: 'Arts', icon: '🎨', color: '#F4B740' },
  tech: { name: 'Science & Technology', short: 'Technology', icon: '🔬', color: '#6C4DC4' },
  env: { name: 'Environment & Sustainability', short: 'Environment', icon: '🌿', color: '#86A56B' },
  writing: { name: 'Writing & Communication', short: 'Writing', icon: '✍️', color: '#E2725B' },
  social: { name: 'Social Impact', short: 'Social Impact', icon: '🤝', color: '#4C8DC7' },
  logic: { name: 'Logical Thinking', short: 'Logic', icon: '🧩', color: '#8E6BD1' },
}

export const QUESTIONS = [
  { q: 'Which activity excites you most?', options: [
    { t: 'Drawing or designing something new', c: 'arts' },
    { t: 'Building an app or a gadget', c: 'tech' },
    { t: 'Helping people in my community', c: 'social' },
    { t: 'Writing a story or a speech', c: 'writing' } ] },
  { q: 'You have a free weekend. What do you pick?', options: [
    { t: 'Cleaning up a park or planting trees', c: 'env' },
    { t: 'Solving puzzles and brain teasers', c: 'logic' },
    { t: 'Making a poster or a short film', c: 'arts' },
    { t: 'Volunteering for a good cause', c: 'social' } ] },
  { q: 'In a group project, which role do you take?', options: [
    { t: 'Planning the steps and cracking the hard part', c: 'logic' },
    { t: 'Writing the report and presenting', c: 'writing' },
    { t: 'Designing how it looks', c: 'arts' },
    { t: 'Researching tools and experiments', c: 'tech' } ] },
  { q: 'Which problem would you most like to work on?', options: [
    { t: 'Reducing plastic waste in my area', c: 'env' },
    { t: 'Making a program run faster', c: 'tech' },
    { t: 'Getting books to students who need them', c: 'social' },
    { t: 'Explaining a hard idea simply', c: 'writing' } ] },
  { q: 'Which kind of lesson do you enjoy most?', options: [
    { t: 'Maths puzzles and patterns', c: 'logic' },
    { t: 'Science experiments', c: 'tech' },
    { t: 'Literature and languages', c: 'writing' },
    { t: 'Nature and environment studies', c: 'env' } ] },
  { q: 'What would you be proudest of?', options: [
    { t: 'A creative work people admire', c: 'arts' },
    { t: 'A tough puzzle I finally solved', c: 'logic' },
    { t: 'Someone I helped succeed', c: 'social' },
    { t: 'A place I made cleaner and greener', c: 'env' } ] },
]

export const STRENGTHS = {
  arts: ['Creative Thinking', 'Imagination'], tech: ['Curiosity', 'Tinkering'],
  env: ['Care for Nature', 'Responsibility'], writing: ['Expression', 'Storytelling'],
  social: ['Empathy', 'Teamwork'], logic: ['Problem Solving', 'Analytical Thinking'],
}
export const CAREERS = {
  arts: ['Graphic Designer', 'Content Creator'], tech: ['Software Developer', 'Lab Researcher'],
  env: ['Environmental Researcher', 'Sustainability Planner'], writing: ['Journalist', 'Content Writer'],
  social: ['Social Entrepreneur', 'Community Worker'], logic: ['Engineer', 'Data Analyst'],
}

// Each answer adds 1 to a category (every category appears in 4 questions).
export function scoreQuiz(answers) {
  const counts = Object.fromEntries(Object.keys(CATS).map((c) => [c, 0]))
  QUESTIONS.forEach((q, i) => {
    const pick = answers[i]
    if (pick !== undefined) counts[q.options[pick].c] += 1
  })
  const scores = {}
  Object.keys(counts).forEach((c) => { scores[c] = Math.round((counts[c] / 4) * 85) + 15 })
  return { scores, takenAt: Date.now() }
}
export const ranked = (result) =>
  Object.entries(result.scores).sort((a, b) => b[1] - a[1])

export const OPPORTUNITIES = [
  { id: 1, title: 'Young Innovators Scholarship', type: 'Scholarship', cats: ['tech', 'logic'], min: 8, max: 12, free: true, online: true, deadline: '30 Nov 2026', duration: 'One-time award', desc: 'Sample scholarship for students who enjoy science projects and problem solving.', eligibility: 'Classes 8–12, any board' },
  { id: 2, title: 'National Creative Writing Contest', type: 'Competition', cats: ['writing', 'arts'], min: 6, max: 12, free: true, online: true, deadline: '15 Dec 2026', duration: '2 weeks', desc: 'Sample contest to showcase your imagination through stories and essays.', eligibility: 'Classes 6–12' },
  { id: 3, title: 'Youth Climate Action Challenge', type: 'Program', cats: ['env', 'social'], min: 8, max: 12, free: true, online: true, deadline: '10 Jan 2027', duration: '6 weeks', desc: 'Sample program where teams design a small project that helps their local environment.', eligibility: 'Classes 8–12, teams of 3–4' },
  { id: 4, title: 'Space Apps Hackathon', type: 'Competition', cats: ['tech', 'logic'], min: 9, max: 12, free: true, online: true, deadline: '28 Oct 2026', duration: '48 hours', desc: 'Sample hackathon where students solve real-world challenges using open space data.', eligibility: 'Classes 9–12, no coding experience required' },
  { id: 5, title: 'Girls in Tech Program', type: 'Program', cats: ['tech', 'logic'], min: 8, max: 12, free: true, online: true, deadline: '30 Nov 2026', duration: '8 weeks', desc: 'Sample program that builds technology skills and confidence through guided projects.', eligibility: 'Girls, Classes 8–12' },
  { id: 6, title: 'Community Service Fellowship', type: 'Scholarship', cats: ['social'], min: 10, max: 12, free: true, online: false, deadline: '20 Jan 2027', duration: '3 months', desc: 'Sample fellowship supporting students who run small service projects in their neighbourhood.', eligibility: 'Classes 10–12' },
  { id: 7, title: 'Design Sprint Workshop', type: 'Program', cats: ['arts', 'tech'], min: 6, max: 10, free: false, online: false, deadline: '5 Dec 2026', duration: '2 days', desc: 'Sample hands-on workshop on sketching, colour and turning an idea into a poster or app screen.', eligibility: 'Classes 6–10' },
  { id: 8, title: 'Maths Puzzle League', type: 'Competition', cats: ['logic'], min: 6, max: 10, free: true, online: true, deadline: '12 Nov 2026', duration: '4 weeks', desc: 'Sample online league of weekly puzzles that reward creative thinking over memorising.', eligibility: 'Classes 6–10' },
]

export function matchFor(o, result) {
  if (!result) return null
  const avg = o.cats.reduce((s, c) => s + result.scores[c], 0) / o.cats.length
  return Math.min(98, Math.max(30, Math.round(35 + avg * 0.63)))
}
export function whyFor(o, result) {
  if (!result) return 'Take the interest quiz to see why this opportunity might suit you.'
  const best = [...o.cats].sort((a, b) => result.scores[b] - result.scores[a])[0]
  return `It relates to ${CATS[best].name}, which scored ${result.scores[best]}% in your quiz. This is a suggestion to explore, not a judgement of what you can do.`
}
