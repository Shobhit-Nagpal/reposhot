export const canvasUi = {
  backgroundColor: '#0D1117',
  borderColor: '#e1e4e8',
  primaryTextColor: '#ffffff',
  secondaryTextColor: '#f9fafb',
  padding: 60,
};

export const canvas = { width: 1200, height: 630 };
export const quadrant = {
  width: canvas.width / 2,
  height: canvas.height / 2,
};

// Each quadrant's top-left corner
export const Q1 = { x: 0, y: 0 };
export const Q2 = { x: quadrant.width, y: 0 };
export const Q3 = { x: 0, y: quadrant.height };
export const Q4 = { x: quadrant.width, y: quadrant.height };

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  bgColor: string,
  canvasWidth: number,
  canvasHeight: number,
) {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

export function drawAvatar(
  ctx: CanvasRenderingContext2D,
  imageUrl: string,
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
) {
  // 1. Calculate center position within quadrant
  const centerX = quadrantX + canvasUi.padding + quadrantW / 2;
  const centerY = quadrantY + quadrantH / 1.5;
  const radius = 100; // avatar size

  // 2. Load image (async!)
  const img = new Image();
  img.crossOrigin = 'anonymous'; // important for GitHub URLs

  img.onload = () => {
    ctx.save();

    // 3. Create circular clipping path
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip(); // everything drawn now is clipped to this circle

    // 4. Draw the image
    ctx.drawImage(img, centerX - radius, centerY - radius, radius * 2, radius * 2);

    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = canvasUi.borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  img.src = imageUrl;
}

export function drawRepoInfo(
  ctx: CanvasRenderingContext2D,
  username: string,
  repoName: string,
  description: string = '',
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
) {
  const padding = canvasUi.padding;
  const maxWidth = quadrantW - padding * 2;

  const usernameFont = '62px sans-serif';
  const repoFont = 'bold 62px sans-serif';
  const descFont = '24px sans-serif';

  const usernameFontSize = 62;
  const repoFontSize = 62;
  const descFontSize = 24;
  const descLineHeight = 1.4;
  const gapBetweenRepoAndDesc = 40;

  // Wrap description
  ctx.font = descFont;
  const descLines = wrapText(ctx, description, maxWidth);

  // Calculate available space for description
  const fixedContentHeight = usernameFontSize + repoFontSize + gapBetweenRepoAndDesc;
  const availableDescHeight = quadrantH - fixedContentHeight;
  const lineHeightPx = descFontSize * descLineHeight;
  const maxLines = Math.floor(availableDescHeight / lineHeightPx);

  // Truncate if needed
  const visibleDescLines = descLines.slice(0, Math.max(0, maxLines));

  // Calculate total content height with actual visible lines
  const totalHeight = usernameFontSize + repoFontSize + gapBetweenRepoAndDesc + lineHeightPx;

  let currentY = quadrantY + (quadrantH - totalHeight);
  const startX = quadrantX + padding;

  // Line 1: Username + separator
  ctx.font = usernameFont;
  ctx.fillStyle = canvasUi.secondaryTextColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(username + ' / ', startX, currentY);
  currentY += usernameFontSize;

  // Line 2: Repo name
  ctx.font = repoFont;
  ctx.fillStyle = canvasUi.primaryTextColor;
  ctx.fillText(repoName, startX, currentY);
  currentY += repoFontSize + gapBetweenRepoAndDesc;

  // Description block (truncated)
  ctx.font = descFont;
  ctx.fillStyle = canvasUi.secondaryTextColor;
  visibleDescLines.forEach((line) => {
    ctx.fillText(line, startX, currentY);
    currentY += lineHeightPx;
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  if (!text) return [];

  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

export function drawStats(
  ctx: CanvasRenderingContext2D,
  stats: { stars: number; forks: number; issues: number },
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
) {
  const { stars, forks, issues } = stats;

  const statItems = [
    { icon: statIcons.star, value: stars, label: 'Stars' },
    { icon: statIcons.fork, value: forks, label: 'Forks' },
    { icon: statIcons.issues, value: issues, label: 'Issues' },
  ];

  // Layout config
  const itemWidth = quadrantW / statItems.length;
  const centerY = quadrantY + quadrantH / 2;

  // Draw each stat
  statItems.forEach((stat, index) => {
    const itemX = quadrantX + index * itemWidth;
    const itemCenterX = itemX + itemWidth / 2;

    drawStatItem(ctx, stat, itemCenterX, centerY);
  });
}

function drawStatItem(
  ctx: CanvasRenderingContext2D,
  stat: { icon: HTMLImageElement; value: number; label: string },
  centerX: number,
  centerY: number,
) {
  const iconSize = 24;
  const numberFont = 'bold 24px sans-serif';
  const labelFont = '18px sans-serif';
  const iconNumberGap = 8;
  const numberLabelGap = 10;

  // Measure text widths for centering
  ctx.font = numberFont;
  const numberText = formatNumber(stat.value);
  const numberWidth = ctx.measureText(numberText).width;

  ctx.font = labelFont;

  // Calculate total width of the item (icon + gap + number)
  const topRowWidth = iconSize + iconNumberGap + numberWidth;

  // Calculate starting positions for horizontal centering
  const topRowStartX = centerX - topRowWidth / 2;
  const labelStartX = topRowStartX + iconSize + iconNumberGap;

  // Calculate vertical positions (icon+number on top, label below)
  const topRowHeight = Math.max(iconSize, 24); // max of icon height and number height
  const totalHeight = topRowHeight + numberLabelGap + 16; // 16 is label font size
  const startY = centerY - totalHeight / 2;

  // Draw icon
  ctx.drawImage(stat.icon, topRowStartX, startY, iconSize, iconSize);

  // Draw number (aligned to icon baseline)
  ctx.font = numberFont;
  ctx.fillStyle = canvasUi.primaryTextColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(numberText, topRowStartX + iconSize + iconNumberGap, startY);

  // Draw label (centered below)
  ctx.font = labelFont;
  ctx.fillStyle = canvasUi.secondaryTextColor;
  ctx.textAlign = 'left';
  ctx.fillText(stat.label, labelStartX, startY + topRowHeight + numberLabelGap);
}

export function drawLogo(
  ctx: CanvasRenderingContext2D,
  quadrantX: number,
  quadrantY: number,
  quadrantW: number,
  quadrantH: number,
) {
  const img = new Image();

  img.onload = () => {
    // Calculate logo dimensions
    const logoWidth = 64;
    const logoHeight = (img.height / img.width) * logoWidth;

    // Position in bottom-right of quadrant
    const x = quadrantX + quadrantW - logoWidth - canvasUi.padding;
    const y = quadrantY + quadrantH - logoHeight - canvasUi.padding;

    ctx.globalAlpha = 0.3;
    ctx.drawImage(img, x, y, logoWidth, logoHeight);
    ctx.globalAlpha = 1.0;
  };

  img.src = 'reposhot-logo.svg';
}

function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

const iconPaths = {
  star: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN0YXItaWNvbiBsdWNpZGUtc3RhciI+PHBhdGggZD0iTTExLjUyNSAyLjI5NWEuNTMuNTMgMCAwIDEgLjk1IDBsMi4zMSA0LjY3OWEyLjEyMyAyLjEyMyAwIDAgMCAxLjU5NSAxLjE2bDUuMTY2Ljc1NmEuNTMuNTMgMCAwIDEgLjI5NC45MDRsLTMuNzM2IDMuNjM4YTIuMTIzIDIuMTIzIDAgMCAwLS42MTEgMS44NzhsLjg4MiA1LjE0YS41My41MyAwIDAgMS0uNzcxLjU2bC00LjYxOC0yLjQyOGEyLjEyMiAyLjEyMiAwIDAgMC0xLjk3MyAwTDYuMzk2IDIxLjAxYS41My41MyAwIDAgMS0uNzctLjU2bC44ODEtNS4xMzlhMi4xMjIgMi4xMjIgMCAwIDAtLjYxMS0xLjg3OUwyLjE2IDkuNzk1YS41My41MyAwIDAgMSAuMjk0LS45MDZsNS4xNjUtLjc1NWEyLjEyMiAyLjEyMiAwIDAgMCAxLjU5Ny0xLjE2eiIvPjwvc3ZnPg==',
  fork: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdpdC1mb3JrLWljb24gbHVjaWRlLWdpdC1mb3JrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjE4IiByPSIzIi8+PGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjMiLz48Y2lyY2xlIGN4PSIxOCIgY3k9IjYiIHI9IjMiLz48cGF0aCBkPSJNMTggOXYyYzAgLjYtLjQgMS0xIDFIN2MtLjYgMC0xLS40LTEtMVY5Ii8+PHBhdGggZD0iTTEyIDEydjMiLz48L3N2Zz4=',
  issues:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1kb3QtaWNvbiBsdWNpZGUtY2lyY2xlLWRvdCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxIi8+PC9zdmc+',
};

const statIcons = {
  star: createIconImage(iconPaths.star),
  fork: createIconImage(iconPaths.fork),
  issues: createIconImage(iconPaths.issues),
};

function createIconImage(dataUrl: string): HTMLImageElement {
  // Decode base64
  const base64 = dataUrl.split(',')[1];
  const svgString = atob(base64);

  // Replace currentColor with white
  const whiteSvg = svgString.replace(/stroke="currentColor"/g, 'stroke="#ffffff"');

  // Re-encode
  const newDataUrl = 'data:image/svg+xml;base64,' + btoa(whiteSvg);

  const img = new Image();
  img.src = newDataUrl;
  return img;
}
