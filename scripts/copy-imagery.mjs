// Copies the design system's brand renders to public/imagery (gitignored) so they are served at /imagery/<name>.webp.
import { cpSync, mkdirSync } from "node:fs";

mkdirSync("public/imagery", { recursive: true });
cpSync("node_modules/@meetingat10/design-system/assets/imagery", "public/imagery", { recursive: true, filter: (src) => !src.endsWith(".json") });
