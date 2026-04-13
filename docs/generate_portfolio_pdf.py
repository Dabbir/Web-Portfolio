#!/usr/bin/env python3
"""
Apple Developer Academy Indonesia – Portfolio PDF Generator
Matches the official NamaLengkap_Portofolio_Academy.pdf template.
Output: docs/AhmadMudabbir_Portfolio_Academy.pdf
"""

import os
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas as pdf_canvas
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

# ── Paths ────────────────────────────────────────────────────────────────────
BASE   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(BASE, "assets")
OUT    = os.path.join(BASE, "docs", "AhmadMudabbir_Portfolio_Academy.pdf")

PW, PH = landscape(A4)   # 841.89 × 595.28 pt

# ── Colours ───────────────────────────────────────────────────────────────────
BLACK      = colors.black
DARK_GRAY  = colors.HexColor("#333333")
MID_GRAY   = colors.HexColor("#666666")
LIGHT_GRAY = colors.HexColor("#999999")
RULE_GRAY  = colors.HexColor("#cccccc")
IMG_BG     = colors.HexColor("#e8e8e8")

# ── Layout constants ──────────────────────────────────────────────────────────
M          = 32          # outer margin
FOOTER_H   = 72          # footer zone height (from bottom)
SIDEBAR_W  = 178         # left sidebar width
GAP        = 12          # gap between sidebar and right area
DIV_X      = M + SIDEBAR_W + GAP // 2   # vertical divider x
RIGHT_X    = M + SIDEBAR_W + GAP        # right content start x
RIGHT_W    = PW - RIGHT_X - M           # right content width
CONTENT_T  = PH - M                     # top of content area
CONTENT_B  = M + FOOTER_H + 10         # bottom of content area (above footer rule)

# ── Personal info ─────────────────────────────────────────────────────────────
PERSON = {
    "name":       "Ahmad Mudabbir Arif",
    "university": "Institut Teknologi Bandung\n(Informatics Engineering, Student)",
    "contact":    "ahmadmudabbir03@gmail.com\n+62 821-8702-6140\nlinkedin.com/in/ahmad-mudabbir-1261731a7",
}

# ── Project data ──────────────────────────────────────────────────────────────
PROJECTS = [
    {
        "title":  "ShowOnAI",
        "year":   "2025",
        "role":   "FE & BE Developer",
        "link":   "Not publicly available",
        "image":  "portfolio-4.png",
        "description": (
            "ShowOnAI is a self-initiated full-stack SaaS platform designed to help brands "
            "monitor and optimize their visibility on AI-powered search engines such as ChatGPT, "
            "Perplexity, and Gemini. It features an analytics dashboard tracking Share of Voice, "
            "Brand Mentions, and SEO reporting, alongside a blog CMS with structured JSON-LD support.\n\n"
            "This is an individual, self-initiated project, built entirely from scratch with no "
            "external team.\n\n"
            "Impact: Delivered a working SaaS MVP capable of tracking AI search engine presence, "
            "a capability that most existing SEO tools do not yet offer.\n\n"
            "What I learned: I deepened my understanding of full-stack architecture (Next.js + Go "
            "microservices), containerised deployment with Docker, and how modern AI search engines "
            "surface web content differently from traditional search."
        ),
    },
    {
        "title":  "Wellborne",
        "year":   "2025",
        "role":   "Full Stack Developer",
        "link":   "Not publicly available",
        "image":  "portfolio-5.png",
        "description": (
            "Wellborne is a desktop application for automated oil and gas well risk assessment, "
            "developed during my internship at PT Paragon Technology and Innovation. It automates "
            "density, leakage, and scoring calculations, supports bulk data import via Excel, "
            "and exports professional reports to both Excel and PDF. Interactive data visualisations "
            "are powered by Plotly, and the app is packaged as a standalone .exe for field use.\n\n"
            "This is a work assignment, developed individually as part of my internship scope.\n\n"
            "Impact: Reduced manual calculation time significantly for well engineers, replacing "
            "error-prone spreadsheet workflows with a validated, auditable desktop tool.\n\n"
            "What I learned: I gained hands-on experience in desktop GUI development with Python/Flet, "
            "domain knowledge in oil and gas engineering risk scoring, and the discipline of building "
            "software for non-technical end-users in a regulated industry."
        ),
    },
    {
        "title":  "Official Website FKUB Makassar",
        "year":   "2024",
        "role":   "Full Stack Developer",
        "link":   "fkub-makassar.or.id",
        "image":  "portfolio-1-new.png",
        "description": (
            "The official website for FKUB (Forum Kerukunan Umat Beragama) Kota Makassar, a "
            "city-level interfaith council, providing a public digital presence for a government-recognised "
            "institution. The site features a landing page, news and articles, a photo gallery, and a "
            "digital registration system for houses of worship.\n\n"
            "This is a work assignment (contract). I was the sole developer, responsible for design, "
            "development, and deployment.\n\n"
            "Impact: Gave FKUB Makassar its first professional online presence, enabling the public "
            "to access institutional news and submit worship registrations digitally, reducing "
            "administrative overhead for the council.\n\n"
            "What I learned: I experienced the full software delivery lifecycle end-to-end, from "
            "client requirements gathering and UI design in Figma, through Next.js + MySQL development, "
            "to production deployment and DNS configuration."
        ),
    },
    {
        "title":  "Venture",
        "year":   "2024",
        "role":   "Full Stack Developer",
        "link":   "github.com/zultopia/Venture",
        "image":  "portfolio-3.png",
        "description": (
            "Venture is a digital platform built to help small vendors (warung) in Jakarta transition "
            "into the digital economy, offering integrated payments, inventory management, and sales "
            "tracking. It was built during HackJakarta 2024 (AngelHack & RISTEK CS UI) and reached "
            "the finals as one of the Top 5 teams out of 20+ in the Financial Inclusion track.\n\n"
            "GROUP PROJECT (Team of 4 developers). My role: Full Stack Developer responsible for the "
            "Next.js backend API, database schema, and payment gateway integration.\n\n"
            "Impact: Demonstrated a viable product for financial inclusion, impressing judges at "
            "Grab Office, Jakarta South Quarter. The solution targeted an underserved segment of "
            "micro-entrepreneurs with limited access to digital financial tools.\n\n"
            "What I learned: Building under hackathon pressure taught me rapid prototyping, product "
            "prioritisation, and pitching to a non-technical audience. I also learned how to integrate "
            "third-party payment APIs securely within a tight deadline."
        ),
    },
    {
        "title":  "PhyloGeoVis",
        "year":   "2025",
        "role":   "Full Stack Developer",
        "link":   "github.com/zultopia/phylogeovis",
        "image":  "portfolio-6.png",
        "description": (
            "PhyloGeoVis is an interactive web application that merges phylogenomic analysis with "
            "geospatial visualisation to support conservation prioritisation of three endangered "
            "orangutan species across Indonesia. It features an interactive phylogenetic tree "
            "(Neighbor-Joining & Maximum Likelihood methods), genetic diversity indices, "
            "Population Viability Analysis with Monte Carlo simulation, and an interactive "
            "distribution map sourced from GBIF and NCBI GenBank.\n\n"
            "GROUP PROJECT (Team of 5). My role: Full Stack Developer responsible for the React "
            "frontend, interactive map (Leaflet.js), phylogenetic tree rendering, and bioinformatics "
            "data pipeline integration.\n\n"
            "Impact: Produced a research-quality tool that makes complex biodiversity data accessible "
            "to conservation practitioners without bioinformatics expertise, bridging the gap between "
            "genomic data and field decision-making.\n\n"
            "What I learned: I explored an entirely new domain (bioinformatics and conservation "
            "science), learning to translate scientific algorithms into interactive visualisations. "
            "This project reinforced my belief in technology's power to serve environmental and "
            "social good."
        ),
    },
]

TOTAL = len(PROJECTS)

# ── Helpers ───────────────────────────────────────────────────────────────────
def draw_sidebar_entry(c, label, value, x, y, max_y):
    """Draw a labelled entry in the left sidebar. Returns new y position."""
    if y < max_y:
        return y
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(DARK_GRAY)
    c.drawString(x, y, label)
    y -= 12

    c.setFont("Helvetica-Oblique", 8.5)
    c.setFillColor(LIGHT_GRAY)

    # Wrap value manually (sidebar is narrow)
    words = value.split()
    line  = ""
    for word in words:
        test = (line + " " + word).strip()
        if c.stringWidth(test, "Helvetica-Oblique", 8.5) < SIDEBAR_W - 10:
            line = test
        else:
            if y < max_y:
                break
            c.drawString(x, y, line)
            y -= 11
            line = word
    if line and y >= max_y:
        c.drawString(x, y, line)
        y -= 11

    return y - 8   # gap after entry

def wrap_text_to_box(c, text, x, y, width, line_height, font, size, color):
    """Draw wrapped text into a box. Returns final y."""
    c.setFont(font, size)
    c.setFillColor(color)
    paragraphs = text.split("\n\n")
    for i, para in enumerate(paragraphs):
        words  = para.replace("\n", " ").split()
        line   = ""
        for word in words:
            test = (line + " " + word).strip()
            if c.stringWidth(test, font, size) < width:
                line = test
            else:
                c.drawString(x, y, line)
                y -= line_height
                line = word
        if line:
            c.drawString(x, y, line)
            y -= line_height
        if i < len(paragraphs) - 1:
            y -= line_height * 0.5   # paragraph gap
    return y

def draw_project_page(c, project, index):
    """Render one full project page onto the canvas."""
    c.setPageSize(landscape(A4))

    # ── Background ──
    c.setFillColor(colors.white)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)

    # ── Top-right: Project counter ──
    counter = f"Project {index + 1} of {TOTAL}"
    c.setFont("Helvetica", 7.5)
    c.setFillColor(LIGHT_GRAY)
    cw = c.stringWidth(counter, "Helvetica", 7.5)
    c.drawString(PW - M - cw, PH - M, counter)

    # ── Left sidebar ──
    sy = CONTENT_T - 2
    sx = M

    # Title label + value
    sy = draw_sidebar_entry(c, "Artwork/Project Title", project["title"], sx, sy, CONTENT_B)
    # Year
    sy = draw_sidebar_entry(c, "Year Accomplished",    project["year"],  sx, sy, CONTENT_B)
    # Role
    sy = draw_sidebar_entry(c, "Role/Position",        project["role"],  sx, sy, CONTENT_B)
    # Link
    sy = draw_sidebar_entry(c, "Publication Link",     project["link"],  sx, sy, CONTENT_B)

    # ── Vertical divider ──
    c.setStrokeColor(RULE_GRAY)
    c.setLineWidth(0.5)
    c.line(DIV_X, CONTENT_B, DIV_X, CONTENT_T)

    # ── Right area ──
    rx = RIGHT_X
    ry = CONTENT_T

    # Description label
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(DARK_GRAY)
    c.drawString(rx, ry, "Artwork/Project Description")
    ry -= 14

    # Description text
    desc_y = wrap_text_to_box(
        c, project["description"],
        rx, ry, RIGHT_W,
        line_height=11,
        font="Helvetica", size=8.5,
        color=DARK_GRAY,
    )
    desc_y -= 10   # gap before image

    # ── Project image ──
    img_path = os.path.join(ASSETS, project["image"])
    img_x    = rx
    img_y    = CONTENT_B   # bottom of image (above footer rule)
    img_h    = max(desc_y - img_y - 4, 10)
    img_w    = RIGHT_W

    # Grey placeholder background
    c.setFillColor(IMG_BG)
    c.setStrokeColor(RULE_GRAY)
    c.setLineWidth(0.4)
    c.rect(img_x, img_y, img_w, img_h, fill=1, stroke=1)

    if os.path.exists(img_path):
        try:
            ir   = ImageReader(img_path)
            iw, ih = ir.getSize()
            ratio  = min(img_w / iw, img_h / ih)
            dw, dh = iw * ratio, ih * ratio
            ox = img_x + (img_w - dw) / 2
            oy = img_y + (img_h - dh) / 2
            c.drawImage(img_path, ox, oy, dw, dh, mask="auto")
        except Exception as e:
            print(f"  [warn] could not load {img_path}: {e}")

    # ── Footer rule ──
    rule_y = M + FOOTER_H
    c.setStrokeColor(RULE_GRAY)
    c.setLineWidth(0.5)
    c.line(M, rule_y, PW - M, rule_y)

    # ── Footer — 4 columns ──
    fy = M + FOOTER_H - 14
    col_w = (PW - 2 * M) / 4

    def footer_col(col_idx, bold_line, *rest_lines):
        cx = M + col_idx * col_w
        cy = fy
        c.setFont("Helvetica-Bold", 7.5)
        c.setFillColor(DARK_GRAY)
        c.drawString(cx, cy, bold_line)
        cy -= 11
        c.setFont("Helvetica", 7.5)
        c.setFillColor(LIGHT_GRAY)
        for line in rest_lines:
            c.drawString(cx, cy, line)
            cy -= 10

    footer_col(0, PERSON["name"])
    footer_col(1,
               "Institut Teknologi Bandung",
               "(Informatics Engineering, Student)")
    footer_col(2,
               "ahmadmudabbir03@gmail.com",
               "+62 821-8702-6140",
               "linkedin.com/in/ahmad-mudabbir-1261731a7")
    footer_col(3,
               "Portfolio Submission for",
               "Apple Developer Academy",
               "Indonesia")

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    c = pdf_canvas.Canvas(OUT, pagesize=landscape(A4))
    c.setTitle("Ahmad Mudabbir Arif – Portfolio – Apple Developer Academy Indonesia")
    c.setAuthor("Ahmad Mudabbir Arif")

    for i, project in enumerate(PROJECTS):
        print(f"  Rendering page {i+1}/{TOTAL}: {project['title']} …")
        draw_project_page(c, project, i)
        c.showPage()

    c.save()
    print(f"\n✓ Saved → {OUT}")

if __name__ == "__main__":
    main()
