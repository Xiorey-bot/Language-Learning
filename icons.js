// === Ikon (pengganti lucide-react, SVG inline supaya tidak bergantung CDN pihak ketiga) ===
// Dimuat paling awal (sebelum data & app.js) karena TABS di data-misc.js mereferensikan komponen ini langsung.
function makeIcon(paths) {
  return function IconComp({ size = 20, color = "currentColor", strokeWidth = 2, style, ...rest }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
        strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style} {...rest}>
        {paths}
      </svg>
    );
  };
}
const Check = makeIcon(<polyline points="20 6 9 17 4 12" />);
const ChevronRight = makeIcon(<polyline points="9 18 15 12 9 6" />);
const Circle = makeIcon(<circle cx="12" cy="12" r="9" />);
const Flame = makeIcon(<path d="M12 2c1 4-4 5-4 9a4 4 0 0 0 8 0c0-2-1-3-1-3s2 1 2 4a6 6 0 0 1-12 0c0-5 4-6 5-10z" />);
const BookOpen = makeIcon(<>
  <path d="M2 5c2-1 5-1.5 8 0v14c-3-1.5-6-1-8 0V5z" />
  <path d="M22 5c-2-1-5-1.5-8 0v14c3-1.5 6-1 8 0V5z" />
</>);
const BarChart3 = makeIcon(<>
  <path d="M4 20V10" /><path d="M12 20V4" /><path d="M20 20v-7" /><path d="M2 20h20" />
</>);
const Sparkles = makeIcon(<>
  <path d="M12 3l1.6 4.8L18 9.4l-4.4 1.6L12 16l-1.6-5L6 9.4l4.4-1.6L12 3z" />
  <path d="M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9L19 15z" />
</>);
const PenLine = makeIcon(<>
  <path d="M12 20h9" />
  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
</>);
const Volume2 = makeIcon(<>
  <polygon points="4 9 8 9 12 5 12 19 8 15 4 15 4 9" />
  <path d="M17 8a5 5 0 0 1 0 8" />
  <path d="M19.5 5.5a9 9 0 0 1 0 13" />
</>);
const Home = makeIcon(<>
  <path d="M3 11l9-8 9 8" />
  <path d="M5 10v10h14V10" />
</>);
const Book = makeIcon(<>
  <path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4z" />
  <path d="M18 4v16" />
</>);
const Sun = makeIcon(<>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
</>);
const Moon = makeIcon(<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />);
const Lock = makeIcon(<>
  <rect x="4" y="11" width="16" height="9" rx="2" />
  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
</>);
// === Ikon tambahan untuk peningkatan UI/UX (audio player, timer, navigasi soal) ===
const Play = makeIcon(<polygon points="6 3 20 12 6 21 6 3" />);
const Pause = makeIcon(<>
  <rect x="6" y="4" width="4" height="16" rx="1" />
  <rect x="14" y="4" width="4" height="16" rx="1" />
</>);
const SkipBack = makeIcon(<>
  <polygon points="19 20 9 12 19 4 19 20" />
  <line x1="5" y1="19" x2="5" y2="5" />
</>);
const SkipForward = makeIcon(<>
  <polygon points="5 4 15 12 5 20 5 4" />
  <line x1="19" y1="5" x2="19" y2="19" />
</>);
const ClockIcon = makeIcon(<>
  <circle cx="12" cy="12" r="9" />
  <polyline points="12 7 12 12 15 14" />
</>);
const AlertTriangle = makeIcon(<>
  <path d="M10.29 3.86L1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0z" />
  <line x1="12" y1="9" x2="12" y2="13" />
  <line x1="12" y1="17" x2="12.01" y2="17" />
</>);
const XIcon = makeIcon(<>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</>);
const ListChecks = makeIcon(<>
  <path d="M3 6l2 2 4-4" /><path d="M3 14l2 2 4-4" />
  <line x1="12" y1="6" x2="21" y2="6" /><line x1="12" y1="16" x2="21" y2="16" />
</>);
const FileText = makeIcon(<>
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
  <polyline points="14 2 14 8 20 8" />
  <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
</>);
const Link2 = makeIcon(<>
  <path d="M9 17H7A5 5 0 0 1 7 7h2" />
  <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
  <line x1="8" y1="12" x2="16" y2="12" />
</>);
