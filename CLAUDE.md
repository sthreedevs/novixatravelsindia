@AGENTS.md
@CHAT_CONTEXT_HANDOVER.md

# Novixa Travels India — Claude Development Guidelines

Refer to `CHAT_CONTEXT_HANDOVER.md` for complete architecture, component APIs, and page states.

## Key Rules:
1. **Never use browser subagents or automated browsers.** The user inspects and tests visually in their own browser.
2. **Never scrape or generate images.** The user will provide all asset images in `public/backgrounds/`.
3. **Use Luxury Design System Tokens:**
   - Background: Obsidian Dark `#07080c`
   - Accent Gold: `#deb06c` (hover `#d49e52`)
   - Fonts: `font-serif` ("Playfair Display"), `font-handwriting` ("Caveat"), `font-sans` (Inter)
   - Form buttons: Rounded full `rounded-full`
4. **Reuse Shared Compound Components:**
   - `ServiceHeroShell`, `ServiceDestinationGrid`, `ServiceStepsSection`, `ServiceFaqSupportSection`, `ServicePartnersBar`, `ServiceTestimonialsAndFaq`, `ServiceCtaBanner`, `ServicePanoramicBanner`.
5. **Styling Gotchas:**
   - Always use inline `style={{ fontFamily: '"Caveat", cursive, sans-serif' }}` for Caveat cursive text.
   - Icons on gold badges must be `text-zinc-950` or `text-black` with bold stroke (`stroke-[2.4]`) for contrast.
6. **Section Alignment with Navbar:**
   - Every section must align horizontally with Navbar's left Logo and right Contact Us button using `w-full px-4 sm:px-6 lg:px-10 xl:px-14`. Never artificially pinch content into narrow containers like `max-w-6xl mx-auto`.

