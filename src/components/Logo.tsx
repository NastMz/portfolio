import * as React from "react"

const Logo = ({isDark}: any) => (
    <svg
        viewBox="0 0 140 140"
        xmlns="http://www.w3.org/2000/svg"
        height={50}
    >
        <g transform="translate(-41.16 -48.915)">
            <circle
                style={{
                    fill: isDark ? "#111827" : "#fff",
                    fillOpacity: 1,
                    strokeWidth: 1.5,
                    strokeLinecap: "square",
                    strokeMiterlimit: 79.4,
                }}
                cx={111.16}
                cy={118.915}
                r={70}
            />
            <text
                xmlSpace="preserve"
                style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 700,
                    fontStretch: "normal",
                    fontSize: "109.88px",
                    fontFamily: "Roboto",
                    fontVariantLigatures: "normal",
                    fontVariantCaps: "normal",
                    fontVariantNumeric: "normal",
                    fontVariantEastAsian: "normal",
                    fill: "#d70000",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 9.01327,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 79.4,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                    paintOrder: "normal",
                }}
                x={53.613}
                y={155.697}
                transform="scale(1.00303 .99698)"
            >
                <tspan
                    style={{
                        fontStyle: "normal",
                        fontVariant: "normal",
                        fontWeight: 400,
                        fontStretch: "normal",
                        fontSize: "109.88px",
                        fontFamily: "Mistral",
                        fontVariantLigatures: "normal",
                        fontVariantCaps: "normal",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        fill: isDark ? "#fff" : "#000",
                        fillOpacity: 1,
                        strokeWidth: 9.01327,
                    }}
                    x={53.613}
                    y={155.697}
                >
                    {"KM"}
                </tspan>
            </text>
        </g>
    </svg>
)

export default Logo
