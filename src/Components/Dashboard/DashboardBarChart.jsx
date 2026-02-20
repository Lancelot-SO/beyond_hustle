import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList,
} from 'recharts';
import { Loader2, BarChart2, ArrowUpRight } from 'lucide-react';

/* ─── Palette ───────────────────────────────────────────────────────────── */
const PALETTE = [
    '#F97316', // orange
    '#6366F1', // indigo
    '#14B8A6', // teal
    '#F59E0B', // amber
    '#8B5CF6', // violet
    '#EC4899', // pink
    '#22C55E', // green
];

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const cleanName = (raw) => {
    if (!raw) return 'Home';
    const s = raw.replace(/^\//, '').replace(/[-_]/g, ' ').trim();
    return s || 'Home';
};

const abbrev = (raw, max = 9) => {
    const n = cleanName(raw);
    return n.length > max ? n.slice(0, max - 1) + '…' : n;
};

const fmtY = (v) => {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(1)}k`;
    return v;
};

/* ─── Custom Tooltip ────────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label, total, valueLabel }) => {
    if (!active || !payload?.length) return null;
    const val = payload[0].value;
    const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';
    const color = payload[0].fill || '#F97316';
    return (
        <div style={{
            background: 'rgba(15,15,30,0.92)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${color}55`,
            borderRadius: '14px',
            padding: '14px 18px',
            boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${color}22`,
            minWidth: '160px',
        }}>
            <p style={{ margin: '0 0 8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#94A3B8', textTransform: 'uppercase' }}>
                {label || 'Home'}
            </p>
            <p style={{ margin: 0, fontSize: '26px', fontWeight: 900, color, lineHeight: 1 }}>
                {val.toLocaleString()}
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '10px', fontWeight: 600, color: '#64748B' }}>
                {valueLabel} · <span style={{ color }}>{pct}%</span> of total
            </p>
        </div>
    );
};

/* ─── Gradient Bar Shape ─────────────────────────────────────────────────── */
const GradientBar = (props) => {
    const { x, y, width, height, index, fill } = props;
    if (!height || height <= 0) return null;
    const r = Math.min(8, width / 2);
    const id = `gb-${index}`;
    return (
        <g>
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={fill} stopOpacity={1} />
                    <stop offset="100%" stopColor={fill} stopOpacity={0.55} />
                </linearGradient>
            </defs>
            {/* glow */}
            <rect x={x} y={y + height * 0.3} width={width} height={height * 0.7 + 6}
                rx={r} ry={r} fill={fill} opacity={0.18}
                style={{ filter: 'blur(6px)' }} />
            {/* bar */}
            <path
                d={`M${x + r},${y} h${width - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${height - r} h${-width} v${-(height - r)} a${r},${r} 0 0 1 ${r},${-r}z`}
                fill={`url(#${id})`}
            />
        </g>
    );
};

/* ─── Main Component ────────────────────────────────────────────────────── */
const DashboardBarChart = ({ title = 'Page Distribution Analysis', data = [], loading = false, valueLabel = 'Visits' }) => {
    const total = data.reduce((s, d) => s + (d.value || 0), 0);
    const maxVal = Math.max(...data.map(d => d.value || 0), 1);
    const sorted = [...data].sort((a, b) => (b.value || 0) - (a.value || 0));

    return (
        <div style={{
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            background: '#fff',
            borderRadius: '24px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 20px 60px -10px rgba(0,0,0,0.08)',
            border: '1px solid #E2E8F0',
            padding: '32px 28px 24px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
        }}>

            {/* ── Header ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, #FFF0E6 0%, #FFE4CC 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(249,115,22,0.2)',
                        }}>
                            <BarChart2 size={18} color="#F97316" />
                        </div>
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em' }}>
                            {title}
                        </h3>
                    </div>
                    <p style={{ margin: '6px 0 0 46px', fontSize: '12px', fontWeight: 500, color: '#94A3B8' }}>
                        {total.toLocaleString()} total {valueLabel.toLowerCase()} across {data.length} pages
                    </p>
                </div>
                <div style={{
                    background: '#F8FAFC', border: '1px solid #E2E8F0',
                    borderRadius: '10px', padding: '6px 12px',
                    fontSize: '11px', fontWeight: 700, color: '#64748B',
                    textTransform: 'uppercase', letterSpacing: '0.07em',
                    display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                    <ArrowUpRight size={12} /> Live
                </div>
            </div>

            {/* ── Chart ── */}
            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                    <Loader2 size={36} color="#F97316" style={{ animation: 'spin 1s linear infinite' }} />
                </div>
            ) : (
                <>
                    {/* Y-axis label */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', marginLeft: '48px' }}>
                        <div style={{ width: '10px', height: '2px', background: '#CBD5E1', borderRadius: '2px' }} />
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Number of {valueLabel}
                        </span>
                    </div>

                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
                                barCategoryGap="30%"
                            >
                                <CartesianGrid
                                    vertical={false}
                                    stroke="#F1F5F9"
                                    strokeDasharray="0"
                                    strokeWidth={1}
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    interval={0}
                                    tick={({ x, y, payload }) => (
                                        <text x={x} y={y} dy={14} textAnchor="middle"
                                            fill="#64748B" fontSize={10} fontWeight={600}
                                            style={{ textTransform: 'capitalize' }}>
                                            {abbrev(payload.value)}
                                        </text>
                                    )}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }}
                                    tickFormatter={fmtY}
                                    width={44}
                                />
                                <Tooltip
                                    content={<CustomTooltip total={total} valueLabel={valueLabel} />}
                                    cursor={{ fill: '#F8FAFC', radius: 8 }}
                                />
                                <Bar
                                    dataKey="value"
                                    shape={(props) => <GradientBar {...props} fill={PALETTE[props.index % PALETTE.length]} />}
                                    animationBegin={100}
                                    animationDuration={900}
                                    animationEasing="ease-out"
                                    isAnimationActive={true}
                                >
                                    <LabelList
                                        dataKey="value"
                                        position="top"
                                        formatter={fmtY}
                                        style={{ fontSize: '10px', fontWeight: 800, fill: '#475569' }}
                                    />
                                    {data.map((_, i) => (
                                        <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* X-axis label */}
                    <p style={{ textAlign: 'center', margin: '-8px 0 20px', fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Page Names
                    </p>

                    {/* ── Color Legend ── */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: '8px 14px',
                        justifyContent: 'center', marginBottom: '24px',
                    }}>
                        {data.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{
                                    width: '8px', height: '8px', borderRadius: '3px',
                                    background: PALETTE[i % PALETTE.length],
                                    boxShadow: `0 0 5px ${PALETTE[i % PALETTE.length]}88`,
                                }} />
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'capitalize' }}>
                                    {cleanName(item.name)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* ── Summary Table ── */}
                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px' }}>
                        <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Performance Breakdown
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {sorted.map((item, rank) => {
                                const origIdx = data.findIndex(d => d.name === item.name);
                                const color = PALETTE[origIdx % PALETTE.length];
                                const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0';
                                const fillW = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
                                return (
                                    <div key={rank} style={{
                                        position: 'relative', overflow: 'hidden',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '10px 14px',
                                        background: '#FAFBFC',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '12px',
                                        transition: 'border-color 0.2s, background 0.2s',
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = `${color}66`;
                                            e.currentTarget.style.background = `${color}08`;
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = '#E2E8F0';
                                            e.currentTarget.style.background = '#FAFBFC';
                                        }}
                                    >
                                        {/* fill bar bg */}
                                        <div style={{
                                            position: 'absolute', left: 0, top: 0, bottom: 0,
                                            width: `${fillW}%`,
                                            background: `${color}0C`,
                                            pointerEvents: 'none',
                                            transition: 'width 0.8s cubic-bezier(.4,0,.2,1)',
                                        }} />

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                                            <div style={{
                                                width: '24px', height: '24px', borderRadius: '50%',
                                                background: `${color}18`, border: `1.5px solid ${color}55`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '10px', fontWeight: 900, color,
                                                flexShrink: 0,
                                            }}>{rank + 1}</div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1E293B', textTransform: 'capitalize' }}>
                                                    {cleanName(item.name)}
                                                </p>
                                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 600, color: '#94A3B8' }}>
                                                    {pct}% <span style={{ color: '#CBD5E1' }}>share</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ textAlign: 'right', position: 'relative', flexShrink: 0 }}>
                                            <p style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: '#0F172A' }}>
                                                {(item.value || 0).toLocaleString()}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '9px', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                {valueLabel}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardBarChart;
