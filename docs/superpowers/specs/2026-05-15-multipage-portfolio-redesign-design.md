# Multi-page Portfolio Redesign Design

## Goal
Transform the current long-scroll portfolio into a cleaner multi-page website that feels more professional, remains visually distinctive, and still showcases interactive engineering work.

## Chosen Approach
Use a multi-page architecture with a shared interaction layer.

Pages:
- Home
- Projects
- Resume / About
- Games
- Contact

This keeps the strongest interactions from the current site while giving each content type a clearer home.

## Information Architecture

### Home
Purpose: make the first impression sharper and reduce cognitive load.

Content:
- Hero statement
- Short proof strip / capabilities summary
- Featured project previews
- Clear calls to action into Projects and Resume
- Lightweight interactive elements that communicate technical personality without overwhelming the page

### Projects
Purpose: become the main portfolio destination.

Content:
- Full project grid
- Existing flagship projects plus Bakery Delivery
- GitHub links for every repo-backed project
- Architecture / build breakdown cards
- Visual galleries and interactive code snippet viewer

Project GitHub links:
- Jumpshot Trainer → `https://github.com/tadester/Jumpshot-Trainer-v2`
- Tadester Ops / TadesterFlow → `https://github.com/tadester/Tadester-Flow`
- Bakery Delivery → `https://github.com/tadester/bakery-del`
- Portfolio Website → `https://github.com/tadester/Portfolio-websitev2`

### Resume / About
Purpose: separate professional narrative from project browsing.

Content:
- Guided resume walkthrough
- Experience, education, stack, and links
- Resume PDF download
- Short personal positioning copy

### Games
Purpose: preserve the playful engineering surface.

Content:
- Grab Spoon game
- Packet Runner
- Game systems commentary
- Visual controls / terminal feed

### Contact
Purpose: end with clarity.

Content:
- Concise availability statement
- Email, phone, GitHub, LinkedIn, resume PDF
- Optional project CTA back into Projects

## Visual Direction
- Retain the dark, technical atmosphere and animated background.
- Increase whitespace, visual hierarchy, and typographic restraint.
- Use stronger page-level composition so the site feels editorial rather than stacked.
- Make cards more consistent and premium: tighter alignment, clearer labels, refined shadows, disciplined accent usage.
- Preserve personality through controlled motion, hover states, animated indicators, and code-inspired details.

## Interaction Design
Shared across pages:
- Sticky global navigation
- Animated background canvas
- Reveal-on-scroll transitions
- Hover states on cards and buttons
- Active-page navigation state
- Smooth page-level visual continuity

Page-specific:
- Projects: gallery carousels, code snippet viewer, expandable project/system details
- Resume / About: tabbed walkthrough
- Games: playable mini-games and live controls

## Content Rules
- Keep language concise and product-oriented.
- Every major project should expose a GitHub link where one exists.
- The homepage should preview, not exhaustively explain.
- Long-form technical detail belongs on the Projects page.

## Implementation Boundaries
Likely additions:
- New HTML files for each page
- Shared CSS and JavaScript retained where sensible
- Small refactor of navigation behavior for multi-page links instead of section anchors
- Existing interactions reused where they fit; split only when page-specific logic demands it

Out of scope for this pass:
- Dedicated case-study page per project
- Framework migration
- CMS integration
- Major copy rewrite beyond what is needed for the new structure

## Testing
- Smoke tests for presence of each new page and required navigation links
- Tests for GitHub links on project cards
- Existing interaction tests preserved
- Manual browser verification across desktop and mobile widths

## Success Criteria
- The site no longer feels like one overlong page.
- Navigation is clearer within seconds of landing.
- The visual system feels more polished and intentional.
- Interactivity remains a visible strength rather than being removed.
- Every repo-backed project exposes an accurate GitHub link.
