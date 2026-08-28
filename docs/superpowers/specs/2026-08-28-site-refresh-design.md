# Site Refresh Design

## Scope

This release refreshes the public Art of War 3 Community Wiki interface, removes obsolete Wiki content and metadata, improves Russian Wiki list copy, and imports selected permanent official materials.

## Interface

- Remove the home-page `Открыть Wiki` action.
- Replace the header brand on every public page with `Art of War 3 Global Conflict` and the `Community Wiki` subtitle.
- Keep the existing icon mark.
- Remove the Squares font face and every Squares font-family reference. Refrigerator Deluxe becomes the interface and heading font.
- Preserve the current colour, panel, and navigation system.

## Article Metadata And Content

- Remove publication dates from list cards and article metadata in Wiki, news, and lore. Category labels remain visible.
- Delete the Russian Wiki item `wiki-ru-c059` (`Добро пожаловать в Тренировочное Лобби!`).
- Rename `wiki-ru-c061` to `Как разработчики балансируют игру?`.
- Rewrite that article's first-person editorial references so it consistently refers to `разработчики`, without changing factual claims.
- Review every Russian Wiki Markdown list. Standardise short declarative entries with grammatically correct forms such as `увеличен`, `снижена`, and `доступно`; retain values, conditions, and meaning.

## Mobile Behaviour

- Audit all public pages at narrow viewport widths.
- Prevent arbitrary word splitting in headings, cards, buttons, and article copy. Normal word wrapping is preferred; long URLs and unbroken technical tokens may wrap only when necessary.
- Ensure all button labels remain inside their visible boundaries.
- Rework video card sizing for narrow screens so thumbnail and title have reliable available width, titles wrap at word boundaries, and no text is clipped or overflows.
- Keep horizontal category scrollers readable and touch-accessible.

## Content Import

- Add the Telegram dossier `Досье: командующий Рауль Кортес` from https://t.me/aow3ru/2042 as a Russian lore dossier.
- Include the transcribed dossier body, title, lead, category, and publication date. Do not invent an image when no reusable source image URL is available.
- Add permanent, relevant official videos discovered through Telegram announcements after validating their unique YouTube IDs against the catalog.
- Exclude time-bound livestreams and individual tournament broadcasts from this release.
- Defer the historical Telegram search for Enrico Machiavelli and other pilot dossiers until source links or a search period are supplied.

## Data And Rendering

- Keep publication dates in JSON as source metadata; only remove their presentation.
- Continue using existing category mappings and the established `published-content.json` schema.
- Extend video categories only when a selected permanent video cannot render under an existing category; otherwise use an existing appropriate category.

## Verification

- Validate `published-content.json` parses and contains no duplicate video IDs.
- Confirm removed Wiki content is absent and the renamed balancing article has no first-person editorial voice.
- Search source to confirm Squares references and date formatting in public content renderers are removed.
- Check responsive pages at desktop, 680px, and 360px widths, including home, Wiki, a Wiki article, videos, lore, news, community, and menu states.
- Run available repository checks and `git diff --check` before publication.
