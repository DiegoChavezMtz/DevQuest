import { itemImagePaths, itemIcons } from './dungeonConfig';

// Genera un SVG data URI con el emoji como placeholder visual
const toPlaceholder = (emoji) =>
    `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="72">${emoji}</text></svg>`
    )}`;

// Por cada item: usa la ruta real si está definida, si no genera un placeholder con el emoji
export const itemsList = Object.fromEntries(
    Object.entries(itemImagePaths).map(([id, path]) => [
        id,
        path || toPlaceholder(itemIcons[id] || '❓'),
    ])
);
