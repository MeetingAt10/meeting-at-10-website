# Meeting At 10

Public website for Meeting At 10, the eleven students who build ACCS for the QCU College of Computer Studies. Next.js 16 and React 19, exported as static files to `out/`. This site has its own styles and components and does not use the design system.

## Run and verify

Use Node.js 22, matching CI.

```bash
npm ci
npm run dev
```

Run the checks serially on the shared development machine:

```bash
flock /tmp/claude-1000/capstone-build.lock pcore npm run lint
flock /tmp/claude-1000/capstone-build.lock pcore npm run typecheck
flock /tmp/claude-1000/capstone-build.lock pcore npm run verify
```

`verify` builds the static export and runs the Node.js content tests in `tests/site.test.mjs` (10 tests) against `out/`. The tests check that:

- the page has the eleven team surnames with their exact job titles, and no email addresses or `mailto:` links;
- the counts for user stories (58), black-box cases (183) and sites (4) are in static HTML, with no document codes or module IDs in visible copy;
- every external link goes to a configured destination or the team GitHub organization, every `#` anchor exists, and no link points to `/register` or to the admin, records or cases paths on the portal;
- the page has one `h1`, one `main`, one `footer`, a skip link, the section IDs and the day's times;
- the hero clock has twelve marks, the eleven surnames and the meeting;
- the page has no `/imagery/` files, no `ds-` classes and no design-system dependency;
- visible copy has no em or en dashes, never uses the words module or role, and does not claim that this site shares the design system.

## Build-time URLs

`src/lib/sites.ts` reads these public environment variables when the site builds.

| Variable | Default |
|---|---|
| `NEXT_PUBLIC_LANDING_URL` | https://access-ccs.com |
| `NEXT_PUBLIC_PORTAL_URL` | https://portal.access-ccs.com |
| `NEXT_PUBLIC_DESIGN_URL` | https://design.access-ccs.com |
| `NEXT_PUBLIC_MEETING_URL` | https://team.access-ccs.com |

## The working day

The page is one working day. Each section holds a time:

| Section | Time | Slot |
|---|---|---|
| `#about` | 10:00 | Standup |
| `#team` | 10:15 | Roll call |
| `#projects` | 10:30 | Build |
| `#lunch` | 12:30 | Lunch |
| `#architecture` | 13:30 | Review |
| `#timeline` | 15:00 | Check |
| `#stats` | 15:30 | Write-up |
| `#contact` | 16:00 | Ship |

The footer is the end of the day, 17:00 on the clock. It has no time label of its own.

## The clock

The hero clock has twelve marks: the eleven surnames and the 10 o'clock meeting. `src/data/team.ts` holds each member's hour. Hovering or focusing a name swings the hour hand to that hour.

`src/app/_components/day-clock.tsx` docks the clock in the top bar as the page scrolls. It maps scroll position to the time, using the section starts, from 10:00 to 17:00. With reduced motion the large clock stays in place instead of travelling to the top bar. The docked clock still appears once the page has scrolled past it and follows the time.

## Architecture and numbers

`#architecture` holds only the request path, under the heading "How a request reaches the data". `#stats` shows 183 black-box test cases, 58 user stories, 11 team members, 7 workspaces and 4 sites. The site count comes from `src/lib/sites.ts`, which has 4 entries.

The module and role lists are not on this site. They are on the design system site, in `docs/modules-and-roles.md` of the design system repository, at `/guides/modules-and-roles/`. Team job titles such as Lead Developer stay on the roster.

## Visual system

- Type: Funnel Display for headlines and names, Funnel Sans for reading, Martian Mono for times.
- Color: a sky palette in 15 minute bands from morning to night, sun `#FFD21E`, appointment blue `#005FDB` and navy `#031B38`.
- Theme: one theme. The site ignores the OS color scheme because the day is its identity.
- The page has no picture assets and no design-system dependency.
- `motion` supplies the scroll values and `@phosphor-icons/react` the icons.

## Deployment

`.github/workflows/deploy.yml` runs on pushes to `main` and `dev` and on manual dispatch. The concurrency group is per branch, so a `main` run and a `dev` run do not cancel each other, and runs are not cancelled.

1. Check out the repository, set up Node.js 22 with the npm cache and run `npm ci`.
2. Configure AWS credentials in `ap-southeast-1` from the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` repository secrets.
3. Pick the CloudFormation stack by branch: `accs-prod` for `main`, `accs-dev` for `dev`. Read the `MeetingBucket`, `MeetingDistributionId`, `MeetingUrl`, `AppUrl` and `DesignUrl` outputs.
4. Run `npm run verify` with `NEXT_PUBLIC_PORTAL_URL` and `NEXT_PUBLIC_DESIGN_URL` set to the stack's `AppUrl` and `DesignUrl`, so links point at the portal and design system of the same environment.
5. Sync `out/` to the S3 bucket with `--delete`, then invalidate `/*` on the CloudFront distribution.

The rebuild spec is `context/deltas/2026-11-07-v2-rebuild.md`.
