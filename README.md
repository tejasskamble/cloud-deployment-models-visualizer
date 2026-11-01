# Cloud Deployment Models Visualizer

An interactive, animated, beginner-friendly guide to the four cloud deployment models, told through **Ravi**, a business owner who needs infrastructure. Built with HTML5, CSS3, vanilla JavaScript and one inline SVG. No frameworks, npm, build step or backend.

## The four models and their analogies

| Model | Analogy | Examples |
|---|---|---|
| **Public** | Renting a room in a large shared commercial building | AWS, Microsoft Azure, Google Cloud Platform |
| **Private** | Owning and operating a dedicated building | OpenStack, VMware-based private cloud, Azure Stack HCI |
| **Hybrid** | Your own building plus rented space elsewhere | AWS Outposts + AWS Region, Azure Arc, Google Distributed Cloud |
| **Community** | Sharing a dedicated building with similar organisations | Government clouds, shared healthcare clouds, university research clouds |

## Features

- One animated SVG (`viewBox="0 0 1400 850"`) with four panels; packets move with `animateMotion` + `mpath`.
- Colours: blue public, purple private, teal hybrid, green community, orange traffic, red security restrictions.
- Deployment model switcher, clickable Architecture Explorer, Beginner/Technical mode, light/dark theme.
- Comparison tool (8 aspects, hide/show models), scenario simulator (4 scenarios), searchable glossary (10 terms), 5-question quiz.
- Respects `prefers-reduced-motion`; keyboard accessible with visible focus outlines.
- Responsive: sidebar on desktop, horizontal steps on mobile, diagram scrolls (min width 820px).

## Comparison

| Aspect | Public | Private | Hybrid | Community |
|---|---|---|---|---|
| Ownership | Provider | One organisation | Mixed | Members / third party |
| Sharing | Many tenants | Not shared | Private part dedicated | Closed group |
| Security & control | Shared responsibility | Highest | Strict where sensitive | Group-agreed |
| Scalability | Near-unlimited | Hardware-limited | Burst to public | Moderate |
| Cost | Pay-as-you-go | High upfront | Balanced | Split |
| Maintenance | Provider | Organisation | Split | Shared |
| Access | Internet | Internal / VPN | VPN + internet | Approved members |
| Suits | Startups | Banks | Enterprises | Government, health, universities |

## Cloud provider examples

- **AWS:** public cloud; Outposts and Direct Connect for hybrid.
- **Azure:** public cloud; Azure Stack HCI (private) and Azure Arc (hybrid).
- **Google Cloud:** public cloud; Google Distributed Cloud (hybrid).
- **OpenStack / VMware:** build private clouds.

## Nine learning steps

1 Introduction · 2 Traditional Infrastructure · 3 Public · 4 Private · 5 Hybrid · 6 Community · 7 Real-World Examples · 8 Comparison · 9 Knowledge Quiz. Auto-play advances every 5 seconds; Pause and Reset are in the sidebar.

## Project structure

```text
cloud-deployment-models-visualizer/
├── index.html
├── css/style.css
├── js/app.js            UI controller (steps, tabs, tools)
├── js/architecture.js   SVG builder
├── js/animations.js     panel reveal, animation toggle, reduced motion
├── js/steps.js          all learning content
├── js/quiz.js           quiz logic
├── assets/favicon.svg
├── .nojekyll
├── LICENSE
└── README.md
```

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. (The Bricolage Grotesque font loads from Google Fonts; system fonts are used offline.)

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (branch `main`).
2. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
3. Open the URL GitHub shows after about a minute.

## Customise

- Change text, quiz questions, scenarios, comparison rows and glossary in `js/steps.js` and `js/quiz.js`.
- Change colours via the CSS variables at the top of `css/style.css`.
- Change diagram layout in `js/architecture.js` (each panel uses its own relative coordinates).

## License

MIT, see `LICENSE`.
