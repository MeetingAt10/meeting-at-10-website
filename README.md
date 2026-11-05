# Meeting At 10

Public website for Meeting At 10, the eleven students who build ACCS for the QCU College of Computer Studies. The site uses Next.js 16, React 19 and `@meetingat10/design-system` pinned to GitHub tag `v1.2.1`. It exports static files to `out/`.

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

## Content and routes

`/` has sections for the team, its projects, the module inventory, the release process and a typical working day. The team roster lists surnames and project roles. The timetable's now-line stays at 10:00.

The page shows counts for 58 modules, 58 user stories and 183 black-box cases without source captions. Visible copy carries no document codes or module IDs. The AWS site count comes from the ten entries in `src/lib/sites.ts`: seven application sites, the landing site, the design-system site and this site.

## Design system

The Office Hours components provide the timetable, case timeline, badges and motion. The page uses type and live component previews, and ships no image files. Styling lives in `src/app/globals.css` and builds on the `--ds-*` variables and the brand palette.

## Build-time URLs

`src/lib/sites.ts` reads these public environment variables when the site builds. Rebuild after changing a URL. The technical `portal` key refers to ACCS Home in the interface.

| Variable | Default |
|---|---|
| `NEXT_PUBLIC_LANDING_URL` | https://access-ccs.com |
| `NEXT_PUBLIC_PORTAL_URL` | https://portal.access-ccs.com |
| `NEXT_PUBLIC_DESIGN_URL` | https://design.access-ccs.com |
| `NEXT_PUBLIC_MEETING_URL` | https://team.access-ccs.com |


## Deployment

`.github/workflows/deploy.yml` runs on pushes to `main` and on manual dispatch. It installs the private design-system dependency with `DS_DEPLOY_KEY`, reads the `MeetingBucket`, `MeetingDistributionId` and `MeetingUrl` outputs from the `accs-dev` CloudFormation stack in `ap-southeast-1`, builds the export, uploads `out/` to S3 and invalidates CloudFront. AWS access uses the repository's configured deployment secrets.

The deployed URL is the corresponding CloudFront default above. Custom domains remain a proposal.
