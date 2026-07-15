import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const walk = (directory) =>
  readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }
  );

const siteImports = [
  ...read("src/styles/site.css").matchAll(/@import\s+"([^"]+)";/g),
].map((match) => match[1]);

assert.deepEqual(
  siteImports,
  ["./tokens.css", "./fonts.css", "./base.css"],
  "site.css must contain global foundations only"
);

const ownedStyles = [
  ["src/components/icons/Icon.astro", "./Icon.css"],
  ["src/components/layout/Container.astro", "./Container.css"],
  ["src/components/layout/Section.astro", "./Section.css"],
  ["src/components/layout/SiteHeader.astro", "./SiteHeader.css"],
  ["src/components/layout/SiteFooter.astro", "./SiteFooter.css"],
  ["src/components/ui/Button.astro", "./Button.css"],
  ["src/components/sections/HeroSection.astro", "./HeroSection.css"],
  ["src/components/sections/FaqSection.astro", "./FaqSection.css"],
  ["src/components/sections/GallerySection.astro", "./GallerySection.css"],
  ["src/components/sections/Values/ValuesSection.astro", "./ValuesSection.css"],
  ["src/components/sections/Values/ValuesIntro.astro", "./ValuesIntro.css"],
  [
    "src/components/sections/Values/ValuesDifference.astro",
    "./ValuesDifference.css",
  ],
  ["src/components/sections/Values/VisitSection.astro", "./VisitSection.css"],
];

for (const [component, stylesheet] of ownedStyles) {
  assert(
    read(component).includes(`import "${stylesheet}";`),
    `${component} must import ${stylesheet}`
  );
}

const componentFiles = walk("src/components");
const astroFiles = componentFiles.filter((path) => path.endsWith(".astro"));
const cssFiles = componentFiles.filter((path) => path.endsWith(".css"));

for (const path of astroFiles) {
  const source = read(path);
  assert(!/<style\b/i.test(source), `${path} contains an inline style block`);
  assert(
    !/<script\b(?![^>]*\bsrc=)[^>]*>/i.test(source),
    `${path} contains an inline script block`
  );
  assert(
    !/\bis:inline\b/.test(source),
    `${path} bypasses Astro script processing`
  );
  assert(!/#[0-9a-f]{3,8}\b/i.test(source), `${path} contains a raw color`);
}

const rawFunctionalColor = /#[0-9a-f]{3,8}\b|(?:rgb|rgba|hsl|hsla)\s*\(/i;
const rawNamedColor = /(?:^|[\s(:,])(?:white|black)(?=[\s,;)])/im;
const typographyDeclaration =
  /^\s*(?:font-size|font-weight|line-height|letter-spacing):\s*([^;]+);/gim;

for (const path of cssFiles) {
  const source = read(path);
  assert(!rawFunctionalColor.test(source), `${path} contains a raw color`);
  assert(!rawNamedColor.test(source), `${path} contains a named raw color`);
  const rawTypographyValues = [...source.matchAll(typographyDeclaration)]
    .filter((match) => !/^(?:var\(|inherit$|normal$)/i.test(match[1].trim()))
    .map((match) => match[0].trim());
  assert.deepEqual(
    rawTypographyValues,
    [],
    `${path} contains raw typography: ${rawTypographyValues.join(", ")}`
  );
}

assert(
  read("src/components/layout/SiteHeader.astro").includes(
    '<script src="./SiteHeader.ts"></script>'
  ),
  "SiteHeader must load its processed TypeScript module"
);
assert(
  read("src/components/sections/GallerySection.astro").includes(
    '<script src="./GallerySection.ts"></script>'
  ),
  "GallerySection must load its processed TypeScript module"
);

const headerMarkup = read("src/components/layout/SiteHeader.astro");
assert(
  headerMarkup.includes("data-mobile-close") &&
    headerMarkup.includes('aria-label="Close menu"'),
  "SiteHeader must expose an accessible mobile close control"
);

const galleryMarkup = read("src/components/sections/GallerySection.astro");
assert(
  galleryMarkup.includes('role="group"') &&
    galleryMarkup.includes('aria-labelledby="gallery-title"'),
  "Gallery carousel must have a role and accessible name"
);

const sourceFiles = walk("src").filter((path) =>
  /\.(?:astro|css|ts)$/.test(path)
);
const sourceText = sourceFiles.map(read).join("\n");
const globalTokens = [
  ...read("src/styles/tokens.css").matchAll(/^\s*(--[a-z0-9-]+):/gm),
].map((match) => match[1]);
const unusedTokens = globalTokens.filter(
  (token) => !sourceText.includes(`var(${token})`)
);

assert.deepEqual(
  unusedTokens,
  [],
  `Unused global tokens: ${unusedTokens.join(", ")}`
);

for (const path of sourceFiles) {
  for (const match of read(path).matchAll(/["'](\/assets\/[^"']+)["']/g)) {
    const assetPath = join("public", match[1]);
    assert(
      existsSync(join(root, assetPath)),
      `${relative(root, path)} references missing ${match[1]}`
    );
  }
}

// Whitelist of files allowed to bypass the "any" cast check (currently empty)
const anyCheckWhitelist = [];

// Source hygiene and "any" cast assertions
const hygieneRegex =
  /src=""|image:\s*["']["']|alt="\?\?\?"|img\[src=["']["']\]/;
const anyRegex = /\bas any\b|:\s*any\b/;

for (const path of sourceFiles) {
  const relativePath = relative(root, path);
  const source = read(path);
  const lines = source.split(/\r?\n/);

  lines.forEach((line, index) => {
    assert(
      !hygieneRegex.test(line),
      `Source hygiene violation in ${relativePath}:${index + 1}: ${line.trim()}`
    );

    if (!anyCheckWhitelist.includes(relativePath)) {
      assert(
        !anyRegex.test(line),
        `Broad 'any' type cast violation in ${relativePath}:${index + 1}: ${line.trim()}`
      );
    }
  });
}

console.log("Architecture checks passed");
