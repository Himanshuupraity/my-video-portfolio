# Portfolio Assets

Drop-zone for every raw asset the portfolio site uses.

```
Portfolio Assets/
├── CV_Himanshu_Upraity.pdf   # source resume  → public/Himanshu_Upraity_CV.pdf
├── Hero Image.png            # source photo   → src/assets/about/himanshu-avatar.jpg (3:4 crop)
├── Hero Talking Video.mp4    # source clip    → src/assets/hero video/himanshu-hero.mp4
├── Certificates/             # scans     → public/certificates/*
└── Other Assets/             # logos, icons, anything else
```

## Notes

- Files here are the **originals**. The copies the site actually builds from live
  in `public/` and `src/assets/` — update both if you replace one.
- The Projects section is text-only by design; it has no screenshot slot.
- Suggested limits so the site stays fast: hero image under 500 KB, talking
  video under 10 MB.
- To add another certificate: drop the file in `public/certificates/`, then add
  an entry with a matching `file:` path to `certificates.featured` in
  `src/data/portfolioData.js`. Cards with a `file` become clickable automatically.
