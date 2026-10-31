import { imagery, type ImageryName } from "@meetingat10/design-system/react";

/** FloatingArt props for a package render. scripts/copy-imagery.mjs copies the files to /imagery before each build. */
export const art = (name: ImageryName) => ({ src: `/imagery/${name}.webp`, width: imagery[name].width, height: imagery[name].height });
