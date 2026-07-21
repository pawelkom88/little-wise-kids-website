# Hours & Nutrition setup

## Business details

The session times displayed by `hours-nutrition.astro` come from the shared `businessDetails` singleton. Confirm these values in Sanity:

- Opening days: `Monday to Friday`
- Opening time: `07:30`
- Closing time: `17:30`
- Morning session end: `12:30`
- Weeks open: `51`
- Minimum attendance days: `2`

The development seed has been corrected to use these values.

## Page content

The first three sections are seeded from the approved website content brief. The existing scroll-driven Typical Day structure and animation are preserved. Its entries remain editable through the existing Sanity fields because the brief does not define a Typical Day timetable.

To replace the `hoursNutritionPage` singleton in a development dataset:

```bash
npx sanity datasets import \
  -d production \
  docs/sanity/hours-nutrition-page-content.ndjson \
  --replace
```

Change the dataset name when necessary. Review the existing Typical Day entries before importing into production.
