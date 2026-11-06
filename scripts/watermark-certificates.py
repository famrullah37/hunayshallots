"""Render certificate PDFs to watermarked WebP previews for the website.

The original PDFs never go into /public — only these low-resolution copies with
the company watermark burned into the pixels, so a screenshot or a saved file
still carries the watermark.

Usage (from the project root, re-run when a certificate is renewed):
    python -I scripts/watermark-certificates.py ../sertifikat

Needs: pip install pymupdf pillow
"""

import io
import math
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "certificates"
WATERMARK = "CV. DUA PUTRI SHOLEHAH"
SUBMARK = "Preview only · not a valid copy"
MAX_WIDTH = 1100  # readable on screen, too small for a convincing print

# output slug -> (source PDF, pages to render, 0-based)
SOURCES = {
    "haccp": ("HACCP.NEW CV DUA PUTRI SHOLEHAH.pdf", [0]),
    "bpom": ("BPOM MD,Al Foil Fried Shallot.pdf", [1]),  # page 2: product annex with the MD number
    "fda": ("FDA CV.pdf", [0]),
    "gap": ("GAP.pdf", [0, 1]),
    "gs1": ("GS1 New.pdf", [0]),
    "halal": ("HALAL 7 PRODUK.pdf", [0, 1]),  # certificate + product list (outlet page skipped)
    "coa": ("COA CV DUA PUTRI SHOLEHAH.pdf", [0]),
}


def font(size: int) -> ImageFont.FreeTypeFont:
    for name in ("arialbd.ttf", "DejaVuSans-Bold.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default(size)


def render(page: pymupdf.Page) -> Image.Image:
    zoom = MAX_WIDTH / page.rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
    return Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")


def watermark(img: Image.Image) -> Image.Image:
    w, h = img.size
    diag = int(math.hypot(w, h))
    layer = Image.new("RGBA", (diag, diag), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    big, small = font(max(28, w // 22)), font(max(14, w // 55))
    step_x = int(draw.textlength(WATERMARK, font=big)) + w // 8
    step_y = int(w * 0.28)
    for row, y in enumerate(range(0, diag, step_y)):
        offset = (step_x // 2) * (row % 2)
        for x in range(-step_x, diag, step_x):
            draw.text((x + offset, y), WATERMARK, font=big, fill=(150, 20, 20, 62))
            draw.text((x + offset, y + big.size + 4), SUBMARK, font=small, fill=(150, 20, 20, 55))

    layer = layer.rotate(30, resample=Image.BICUBIC)
    left, top = (diag - w) // 2, (diag - h) // 2
    layer = layer.crop((left, top, left + w, top + h))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src_dir = Path(sys.argv[1])
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for slug, (filename, pages) in SOURCES.items():
        doc = pymupdf.open(src_dir / filename)
        for n, page_no in enumerate(pages, start=1):
            img = watermark(render(doc[page_no]))
            out = OUT_DIR / f"{slug}-{n}.webp"
            img.save(out, "WEBP", quality=72, method=6)
            # small thumbnail for the grid
            thumb = img.copy()
            thumb.thumbnail((360, 520))
            thumb.save(OUT_DIR / f"{slug}-{n}-thumb.webp", "WEBP", quality=70, method=6)
            print(f"{out.name}: {img.size[0]}x{img.size[1]}")


if __name__ == "__main__":
    main()
