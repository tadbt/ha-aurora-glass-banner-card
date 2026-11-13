#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 \"<commit message>\" <version>"
  echo "Example: $0 \"Release compact banner card\" 1.0.0"
  exit 1
fi

COMMIT_MSG="$1"
RAW_VERSION="$2"
VERSION="${RAW_VERSION#v}"
TAG="v${VERSION}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Update version in package.json and tools/build.py
node -e '
const fs = require("fs");
const v = process.argv[1];
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
pkg.version = v;
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
' "$VERSION"

python3 -c '
import pathlib, re, sys
v = sys.argv[1]
p = pathlib.Path("tools/build.py")
txt = p.read_text(encoding="utf-8")
txt = re.sub(r"^VERSION\s*=\s*\"[^\"]+\"", f"VERSION = \"{v}\"", txt, count=1, flags=re.M)
p.write_text(txt, encoding="utf-8")
' "$VERSION"

# Rebuild bundle and verify syntax
npm run build
node --check aurora-glass-banner-card.js

# Stage, commit, tag, and push
git add -A
git commit -m "$COMMIT_MSG"
git tag -a "$TAG" -m "Release $TAG"
git push origin HEAD
git push origin "$TAG"

echo "Released $TAG successfully."

