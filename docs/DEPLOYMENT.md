# Deployment and Release Workflow

## Existing production destinations

- Repository: `puikinsh/CoolAdmin`, branch `master`.
- Demo: `https://preview.colorlib.com/theme/cooladmin/`, R2 bucket `colorlib-preview`, prefix `theme/cooladmin/`.
- Download: `https://downloads.colorlib.com/theme/cooladmin.zip`, R2 bucket `colorlib-downloads`, key `theme/cooladmin.zip`.
- Website/docs: `https://cooladmin.colorlib.com/`, Cloudflare Pages project `cooladmin-colorlib`, production branch `main`.
- Website source: `templates/cooladmin-landing/` in the separate `ColorlibHQ/tailwind-templates` repository.

Both R2 buckets are shared. Upload only the CoolAdmin prefix/key; never sync or delete a bucket root. Credentials belong in existing local profiles or environment configuration and must not be committed.

## Prepare and validate

1. Update `package.json`, the lockfile version, the shared Pug generator metadata, README, changelog, and release notes. Update the in-demo `docs.html` source and the separate website's release/tooling documentation.
2. Run `npm ci` and `npm run check`. Review generated page, CSS, and vendor diffs. Repeating the build should leave outputs unchanged.
3. Smoke-test all pages at desktop/mobile widths; exercise the calendar, chart refresh, command palette, themes, and navigation. Check console errors, failed requests, and local asset references.
4. Commit only intended files and push to `master` without force. Publish release notes and an archive for the corresponding tag.

## Publish the demo and download

Stage only root HTML, `css/`, `js/`, `vendor/`, `fonts/`, `images/`, `media/`, required screenshots, README, changelog, and licenses. CoolAdmin uses relative URLs and does not need Astro-style subpath rebasing.

Back up the current `theme/cooladmin/` prefix and `theme/cooladmin.zip` before replacing them. With the existing authenticated `r2pro` profile:

```bash
rclone copy /path/to/runtime-stage/ r2pro:colorlib-preview/theme/cooladmin/
rclone copyto /path/to/cooladmin.zip r2pro:colorlib-downloads/theme/cooladmin.zip
```

Use a commit archive for the ZIP so `.git`, `node_modules`, secrets, and unrelated untracked files are excluded. Upload dependencies before the HTML that references them. Keep superseded versioned vendor files available for cached old HTML until its cache lifetime has elapsed.

The preview Worker applies caching independently of R2 object metadata. Invalidate only changed CoolAdmin URLs using the existing cache controls, then verify ordinary URLs as well as cache-busted requests. Do not purge unrelated themes.

## Publish the website

Build only `@templates/cooladmin-landing` with its workspace dependencies, inspect the generated homepage/docs, and deploy its `dist/` using:

```bash
wrangler pages deploy /path/to/cooladmin-landing/dist/ \
  --project-name cooladmin-colorlib --branch main
```

Commit only the CoolAdmin landing source changes in the monorepo; preserve unrelated local edits. Verify the custom domain, version/date, current dependency table, download/demo links, docs sidebar, and new release/workflow pages.

## Verify and roll back

Compare live HTML/scripts with the staged files and download the public ZIP to inspect its version and contents. Test calendar views and chart rendering on the live demo. Record release commit, tag, deployment URL/ID, and verification outcome in release notes.

If verification fails, restore the saved demo prefix and ZIP, or redeploy the prior Pages build. Invalidate the affected URLs again and verify the restored version. Keep backups outside the shared public runtime prefix.
