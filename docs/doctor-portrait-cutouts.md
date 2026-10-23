# Doctor portrait background removal

Created with the built-in image generation/editing tool on 2026-10-23, with `transparent_background: true`, using each original photograph as its edit target. The original JPEGs are retained. Only the two portrait imports changed; cards and profile dialogs continue using the shared, contained portrait layout and faint hospital-logo backdrop.

| Doctor | Source | Website asset |
| --- | --- | --- |
| Dr. Pikkalla Naveena | `public/images/doctors/dr-pikkalla-naveena.jpeg` | `public/images/doctors/dr-pikkalla-naveena-cutout.png` |
| Dr. Seshu Mohan | `public/images/doctors/dr-seshu-mohan.jpeg` | `public/images/doctors/dr-seshu-mohan-cutout.png` |

Both outputs were visually inspected alongside the supplied portraits before integration.

## Final prompts

### Dr. Pikkalla Naveena

Use case: background-extraction. Asset type: transparent PNG cutout of a real doctor for an existing hospital website. Edit target: the supplied photograph of Dr. Pikkalla Naveena. Remove only the entire gray room background, black office chair including the headrest, desk, furniture and all surroundings. Retain only the actual woman, including her hair, ears and earrings, face, white medical coat, blue scrubs, stethoscope, and all visible parts of her hands/body. Preserve the exact facial identity, expression, skin texture, proportions, pose, lighting and original clothing. This is precise background removal, not a new portrait: do not retouch, beautify or redraw the woman. Preserve all embroidered lettering and Prathamaa Hospital logo on the coat exactly as photographed. Output with real alpha transparency, no solid white/gray/colored background, no shadow, halo, border or added watermark. Keep the complete visible person with no new cropping. Trim only empty background so there is a modest clear margin above her hair and on either side. Do not invent missing anatomy or change any details on her coat.

### Dr. Seshu Mohan

Use case: background-extraction. Asset type: transparent PNG cutout of a real doctor for an existing hospital website. Edit target: the supplied photograph of Dr. Seshu Mohan. Remove only the solid light cyan/blue backdrop around the doctor, creating true alpha transparency. Preserve the exact actual man: facial identity, face and skin texture, hair, ears, expression, white coat, dark purple scrubs, the blue surgical cap with its white urology illustrations, and the light blue mask around his neck. This is precise background removal only; do not retouch, beautify, redraw or change the person. Keep the cap and mask colors, do not remove them as background. Preserve all original embroidered text and the Prathamaa Hospital logo on his coat exactly as photographed. Keep the entire visible head, cap, shoulders, torso and coat as in the original, without inventing missing parts or cropping further. Output a clean transparent PNG cutout, no solid background, no shadow, no halo, border or added watermark. Preserve the original pose, lighting, colors and framing, with a modest clear margin above the cap.
