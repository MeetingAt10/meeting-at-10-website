# Meeting At 10

Public team website for the eleven-person capstone team building ACCS for the QCU College of Computer Studies. The site uses Next.js 16, React 19 and `@meetingat10/design-system` pinned to GitHub tag `v1.1.0`. It exports static files to `out/`.

## Run and verify

Use Node.js 22, matching CI. Installing the private design-system package requires GitHub SSH access.

```bash
npm ci
npm run dev
```

Development runs at `http://localhost:3000`. Run the checks serially on the shared development machine:

```bash
flock /tmp/claude-1000/capstone-build.lock pcore npm run lint
flock /tmp/claude-1000/capstone-build.lock pcore npm run typecheck
flock /tmp/claude-1000/capstone-build.lock pcore npm run verify
```

`verify` builds the static export and runs the Node.js compliance tests against `out/`. `npm test` checks an existing export. Preview the built files with a static server:

```bash
python3 -m http.server 4174 --directory out
```

See [module compliance](docs/module-compliance.md) for the acceptance scope and recorded results.

## Content and routes

`/` contains the work, process, team and illustrative working-day sections. The team list publishes surnames and project roles. The timetable's now-line stays at 10:00.

The page names its sources for 58 modules, 58 user stories and 183 black-box cases. The AWS site count is derived from the ten entries in `src/lib/sites.ts`: seven application sites and the landing, design-system and team sites.

## Design system

The Office Hours components provide the navigation, timetable, case timeline and motion. The page is typography and live component previews; it ships no decorative image files. Page styling lives in `src/app/globals.css` on `--ds-*` variables and the brand palette.

## Build-time URLs

`src/lib/sites.ts` reads these public environment variables when the site builds. Rebuild after changing a URL. The technical `portal` key refers to ACCS Home in the interface.

| Variable | Default |
|---|---|
| `NEXT_PUBLIC_LANDING_URL` | https://d1o7nnm2soozyn.cloudfront.net |
| `NEXT_PUBLIC_PORTAL_URL` | https://d1njh2nozcwz0u.cloudfront.net |
| `NEXT_PUBLIC_FORUMS_URL` | https://dgkec2nkm3n3s.cloudfront.net |
| `NEXT_PUBLIC_SCHEDULE_URL` | https://d19h8rd7p5r1ek.cloudfront.net |
| `NEXT_PUBLIC_CASES_URL` | https://d3aoaw841wc6e2.cloudfront.net |
| `NEXT_PUBLIC_EVALUATIONS_URL` | https://d3nw1hv5xoevnq.cloudfront.net |
| `NEXT_PUBLIC_RECORDS_URL` | https://du3q9mhys1ofn.cloudfront.net |
| `NEXT_PUBLIC_ADMIN_URL` | https://d3ru4j9n1z7rme.cloudfront.net |
| `NEXT_PUBLIC_DESIGN_URL` | https://dqd3zf55ijbpq.cloudfront.net |
| `NEXT_PUBLIC_MEETING_URL` | https://d34p7a45addcro.cloudfront.net |



## Deployment

`.github/workflows/deploy.yml` runs on pushes to `main` and on manual dispatch. It installs the private design-system dependency with `DS_DEPLOY_KEY`, reads the `MeetingBucket`, `MeetingDistributionId` and `MeetingUrl` outputs from the `accs-dev` CloudFormation stack in `ap-southeast-1`, builds the export, uploads `out/` to S3 and invalidates CloudFront. AWS access uses the repository's configured deployment secrets.

The deployed URL is the corresponding CloudFront default above. Custom domains remain a proposal.
