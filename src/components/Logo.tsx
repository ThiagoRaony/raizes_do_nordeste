import type { SVGProps } from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  style?: 'icon-text' | 'icon-only' | 'badge';
  className?: string;
}

/* ===== CORES ===== */
const C = {
  solTop: '#E9C46A',
  sol: '#F4A261',
  terra: '#8B5A2B',
  terraDark: '#6B3E1F',
  folha: '#2D6A4F',
  folhaClara: '#4A9E78',
  texto: '#4A3728',
  textoClaro: '#FFF9F0',
  bg: '#FFF9F0',
  terraAccent: '#C75B3A',
};

/* ===== VIEWBOXES ===== */
const VB = {
  sm: { w: 220, h: 48, icon: 40, t1: 14, t2: 26 },
  md: { w: 300, h: 60, icon: 52, t1: 18, t2: 34 },
  lg: { w: 400, h: 80, icon: 68, t1: 24, t2: 44 },
};

/* ===== ICONE CIRCULAR DESENHADO DIRETAMENTE ===== */
function IconPaths({ r, ox, oy }: { r: number; ox: number; oy: number }) {
  const cx = ox;
  const cy = oy;
  return (
    <g>
      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r - 0.5} fill={C.bg} />
      {/* Clip para manter dentro */}
      <g clipPath={`url(#icoClip${Math.round(r)})`}>
        <defs>
          <clipPath id={`icoClip${Math.round(r)}`}>
            <circle cx={cx} cy={cy} r={r - 0.5} />
          </clipPath>
        </defs>

        {/* Sol no topo */}
        <ellipse cx={cx} cy={cy - r * 0.12} rx={r * 0.72} ry={r * 0.42} fill={C.solTop} />
        <ellipse cx={cx} cy={cy - r * 0.05} rx={r * 0.65} ry={r * 0.35} fill={C.sol} />

        {/* Raios de sol sutis */}
        <path d={`M${cx - r * 0.55} ${cy - r * 0.28}L${cx - r * 0.45} ${cy - r * 0.33}`} stroke={C.solTop} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d={`M${cx + r * 0.55} ${cy - r * 0.28}L${cx + r * 0.45} ${cy - r * 0.33}`} stroke={C.solTop} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d={`M${cx} ${cy - r * 0.42}L${cx} ${cy - r * 0.35}`} stroke={C.solTop} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* Montes/terra no meio */}
        <path d={`M${cx - r * 0.95} ${cy + r * 0.18}Q${cx - r * 0.55} ${cy - r * 0.08} ${cx - r * 0.15} ${cy + r * 0.05}Q${cx + r * 0.15} ${cy + r * 0.12} ${cx + r * 0.55} ${cy - r * 0.02}Q${cx + r * 0.82} ${cy - r * 0.12} ${cx + r * 0.95} ${cy + r * 0.12}L${cx + r} ${cy + r * 0.45}L${cx - r} ${cy + r * 0.45}Z`} fill={C.terra} />
        <path d={`M${cx - r * 0.75} ${cy + r * 0.28}Q${cx - r * 0.35} ${cy + r * 0.08} ${cx + r * 0.05} ${cy + r * 0.15}Q${cx + r * 0.25} ${cy + r * 0.22} ${cx + r * 0.65} ${cy + r * 0.08}L${cx + r} ${cy + r * 0.45}L${cx - r} ${cy + r * 0.45}Z`} fill={C.terraDark} />

        {/* Folhas na base */}
        <path d={`M${cx} ${cy + r * 0.38}Q${cx - r * 0.38} ${cy + r * 0.02} ${cx - r * 0.45} ${cy - r * 0.18}Q${cx - r * 0.28} ${cy - r * 0.05} ${cx} ${cy + r * 0.22}`} fill={C.folha} opacity="0.9" />
        <path d={`M${cx} ${cy + r * 0.38}Q${cx + r * 0.38} ${cy + r * 0.02} ${cx + r * 0.45} ${cy - r * 0.18}Q${cx + r * 0.28} ${cy - r * 0.05} ${cx} ${cy + r * 0.22}`} fill={C.folhaClara} opacity="0.9" />
        <path d={`M${cx} ${cy + r * 0.42}Q${cx - r * 0.25} ${cy + r * 0.15} ${cx - r * 0.32} ${cy - r * 0.02}Q${cx - r * 0.12} ${cy + r * 0.08} ${cx} ${cy + r * 0.28}`} fill={C.folha} opacity="0.85" />
        <path d={`M${cx} ${cy + r * 0.42}Q${cx + r * 0.25} ${cy + r * 0.15} ${cx + r * 0.32} ${cy - r * 0.02}Q${cx + r * 0.12} ${cy + r * 0.08} ${cx} ${cy + r * 0.28}`} fill={C.folhaClara} opacity="0.85" />

        {/* Caule central */}
        <path d={`M${cx} ${cy + r * 0.38}L${cx} ${cy + r * 0.22}`} stroke={C.folha} strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ===== OPCAO 1: Icon + Texto Script ===== */
function LogoIconText({ size, light }: { size: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const d = VB[size];
  const r = d.icon / 2;
  const ix = r;
  const iy = d.h / 2;
  const tx = d.icon + 14;
  const textColor = light ? C.textoClaro : C.texto;

  return (
    <svg viewBox={`0 0 ${d.w} ${d.h}`} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Raízes do Nordeste">
      <IconPaths r={r} ox={ix} oy={iy} />
      <text x={tx} y={iy + d.t1 * 0.35} fontFamily="'Great Vibes', cursive" fontSize={d.t2} fill={textColor} fontWeight="400">
        Raízes do Nordeste
      </text>
    </svg>
  );
}

/* ===== OPCAO 2: Icon + Texto em duas linhas ===== */
function LogoIconTwoLines({ size, light }: { size: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const d = VB[size];
  const r = d.icon / 2;
  const ix = r;
  const iy = d.h / 2;
  const tx = d.icon + 14;
  const mainColor = light ? C.textoClaro : C.texto;
  const accentColor = light ? '#E8A87C' : C.terraAccent;

  return (
    <svg viewBox={`0 0 ${d.w} ${d.h}`} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Raízes do Nordeste">
      <IconPaths r={r} ox={ix} oy={iy} />
      <text x={tx} y={iy - 2} fontFamily="'DM Sans', sans-serif" fontSize={d.t1} fontWeight="600" fill={mainColor} letterSpacing="0.06em">
        RAÍZES DO
      </text>
      <text x={tx} y={iy + d.t1 + 4} fontFamily="'DM Sans', sans-serif" fontSize={d.t1 + 4} fontWeight="800" fill={accentColor} letterSpacing="0.02em">
        NORDESTE
      </text>
    </svg>
  );
}

/* ===== OPCAO 3: Badge Circular ===== */
function LogoBadge({ size, light }: { size: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const d = VB[size];
  const r = d.h / 2 - 2;
  const cx = r + 2;
  const cy = d.h / 2;
  const textColor = light ? C.textoClaro : C.texto;
  const iconR = r * 0.55;

  return (
    <svg viewBox={`0 0 ${d.w} ${d.h}`} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Raízes do Nordeste">
      <circle cx={cx} cy={cy} r={r} fill={light ? 'rgba(255,249,240,0.1)' : C.bg} stroke={light ? 'rgba(255,249,240,0.3)' : 'rgba(74,55,40,0.15)'} strokeWidth="1" />
      <IconPaths r={iconR} ox={cx} oy={cy - r * 0.1} />
      <text x={cx} y={cy + r * 0.72} textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize={r * 0.3} fill={textColor}>
        Raízes
      </text>
      <text x={cx} y={cy + r * 0.98} textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize={r * 0.24} fill={light ? '#E8A87C' : C.terraAccent}>
        do Nordeste
      </text>
    </svg>
  );
}

/* ===== ICONE APENAS (para hero, favicon, etc) ===== */
function LogoIconOnly({ size, light }: { size: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const px = size === 'sm' ? 40 : size === 'md' ? 56 : 72;
  const r = px / 2;
  return (
    <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Raízes do Nordeste">
      <IconPaths r={r} ox={r} oy={r} />
    </svg>
  );
}

/* ===== COMPONENTE PRINCIPAL ===== */
export default function Logo({ variant = 'dark', size = 'md', style = 'icon-text', className = '' }: LogoProps) {
  const svgProps: SVGProps<SVGSVGElement> = {
    className,
    role: 'img',
    'aria-label': 'Raízes do Nordeste',
  };

  if (style === 'icon-only') {
    return <LogoIconOnly size={size} light={variant === 'light'} />;
  }

  if (style === 'badge') {
    return <LogoBadge size={size} light={variant === 'light'} />;
  }

  if (style === 'icon-text') {
    return <LogoIconText size={size} light={variant === 'light'} />;
  }

  return <LogoIconTwoLines size={size} light={variant === 'light'} />;
}