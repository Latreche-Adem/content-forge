"use client";
import { useState, useEffect, useRef } from "react";

const CONTENT_TYPES = [
    { id: "social", label: "📱 Social Post" },
    { id: "email", label: "✉️ Marketing Email" },
    { id: "ad", label: "📢 Ad Copy" },
    { id: "product", label: "🛍️ Product Description" },
    { id: "blog", label: "📝 Blog Intro" },
    { id: "pitch", label: "🎯 Sales Pitch" },
];

const TONES = ["Professional", "Friendly", "Bold & Urgent", "Luxury", "Witty", "Inspirational"];

const PLATFORMS = {
    social: ["Instagram", "LinkedIn", "Twitter/X", "Facebook", "TikTok"],
    email: ["Cold Outreach", "Newsletter", "Promotional"],
    ad: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
    product: ["E-commerce", "Marketplace", "Landing Page"],
    blog: ["SEO Blog", "Medium", "Company Blog"],
    pitch: ["Investor", "Client", "Partnership"],
};

const LANGUAGES = ["English", "Arabic (MSA)", "French", "Darija"];

export default function ContentForge() {
    const [businessName, setBusinessName] = useState("");
    const [product, setProduct] = useState("");
    const [audience, setAudience] = useState("");
    const [contentType, setContentType] = useState("social");
    const [tone, setTone] = useState("Professional");
    const [platform, setPlatform] = useState("Instagram");
    const [language, setLanguage] = useState("English");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [remaining, setRemaining] = useState(null);
    const [streaming, setStreaming] = useState(false);
    const outputRef = useRef(null);

    useEffect(() => {
        setPlatform(PLATFORMS[contentType][0]);
    }, [contentType]);

    useEffect(() => {
        if (outputRef.current && streaming) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output, streaming]);

    const buildPrompt = () => `You are an expert marketing copywriter.
Generate a high-converting ${contentType} for this business:

- Business Name: ${businessName || "Not specified"}
- Product/Service: ${product}
- Target Audience: ${audience || "General audience"}
- Platform: ${platform}
- Tone: ${tone}
- Language: ${language}

Rules:
- Write ONLY the final content, no commentary
- For social posts: include emojis and hashtags
- For emails: first line must be "Subject: ..."
- For ad copy: write Headline, Body, CTA separately
- For product descriptions: use bullet points for features
- Make it sound human, not AI-generated
- Be concise but impactful

Generate now:`;

    const generate = async () => {
        if (!product.trim()) {
            setError("Please describe your product or service.");
            return;
        }
        setLoading(true);
        setStreaming(true);
        setOutput("");
        setError("");
        setCopied(false);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: buildPrompt() }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Request failed");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                if (chunk.includes("__REMAINING__:")) {
                    const parts = chunk.split("\n__REMAINING__:");
                    fullText += parts[0];
                    setRemaining(parseInt(parts[1]));
                } else {
                    fullText += chunk;
                }
                setOutput(fullText);
            }

        } catch (e) {
            setError(e.message || "Something went wrong.");
        } finally {
            setLoading(false);
            setStreaming(false);
        }
    };

    const copyOutput = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const wordCount = output ? output.trim().split(/\s+/).filter(Boolean).length : 0;

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0A0A0A",
            color: "#F0EDE8",
            fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
            {/* HEADER */}
            <header style={{
                padding: "24px 40px",
                borderBottom: "1px solid #2A2A2A",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(10,10,10,0.9)",
                position: "sticky",
                top: 0,
                zIndex: 10,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 36, height: 36,
                        background: "linear-gradient(135deg, #D4A853, #C8973A)",
                        borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, boxShadow: "0 0 20px rgba(212,168,83,0.3)",
                    }}>✦</div>
                    <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: 0.5 }}>
                        Content<span style={{ color: "#D4A853" }}>Forge</span>
                    </span>
                </div>
                <div style={{
                    fontSize: 11, padding: "4px 12px", borderRadius: 20,
                    background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.3)",
                    color: "#D4A853", letterSpacing: 1, textTransform: "uppercase",
                }}>
                    {remaining !== null ? `${remaining} credits left today` : "AI-Powered"}
                </div>
            </header>

            {/* MAIN */}
            <main style={{
                maxWidth: 1100, margin: "0 auto", padding: "48px 40px",
                display: "grid", gridTemplateColumns: "420px 1fr", gap: 32,
            }}>

                {/* HERO */}
                <div style={{ gridColumn: "1 / -1", marginBottom: 8 }}>
                    <h1 style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.15, marginBottom: 10 }}>
                        Generate{" "}
                        <span style={{ color: "#D4A853", fontStyle: "italic" }}>marketing content</span>
                        <br />that actually converts.
                    </h1>
                    <p style={{ color: "#7A7370", fontSize: 15 }}>
                        Describe your business, pick your format — get polished copy in seconds.
                    </p>
                </div>

                {/* LEFT — INPUT */}
                <div style={{
                    background: "#1C1C1C", border: "1px solid #2A2A2A",
                    borderRadius: 16, padding: 28,
                }}>
                    <div style={{
                        fontSize: 18, fontWeight: 600, marginBottom: 22,
                        display: "flex", alignItems: "center", gap: 8
                    }}>
                        <span style={{
                            display: "block", width: 3, height: 18,
                            background: "#D4A853", borderRadius: 2
                        }} />
                        Business Details
                    </div>

                    {/* Business Name */}
                    <Field label="Business / Brand Name">
                        <input
                            style={inputStyle}
                            placeholder="e.g. NovaTech Solutions"
                            value={businessName}
                            onChange={e => setBusinessName(e.target.value)}
                        />
                    </Field>

                    {/* Product */}
                    <Field label="Product / Service *">
                        <textarea
                            style={{ ...inputStyle, minHeight: 80, resize: "none", lineHeight: 1.5 }}
                            placeholder="e.g. An AI-powered invoicing app for freelancers..."
                            value={product}
                            onChange={e => setProduct(e.target.value)}
                        />
                    </Field>

                    {/* Audience */}
                    <Field label="Target Audience">
                        <input
                            style={inputStyle}
                            placeholder="e.g. Freelancers aged 25-40 in North Africa"
                            value={audience}
                            onChange={e => setAudience(e.target.value)}
                        />
                    </Field>

                    {/* Content Type */}
                    <Field label="Content Type">
                        <PillGroup
                            options={CONTENT_TYPES.map(c => ({ id: c.id, label: c.label }))}
                            selected={contentType}
                            onSelect={setContentType}
                        />
                    </Field>

                    {/* Platform */}
                    <Field label="Platform">
                        <PillGroup
                            options={PLATFORMS[contentType].map(p => ({ id: p, label: p }))}
                            selected={platform}
                            onSelect={setPlatform}
                        />
                    </Field>

                    {/* Tone */}
                    <Field label="Tone of Voice">
                        <PillGroup
                            options={TONES.map(t => ({ id: t, label: t }))}
                            selected={tone}
                            onSelect={setTone}
                        />
                    </Field>

                    {/* Language */}
                    <Field label="Output Language">
                        <PillGroup
                            options={LANGUAGES.map(l => ({ id: l, label: l }))}
                            selected={language}
                            onSelect={setLanguage}
                        />
                    </Field>

                    {/* Button */}
                    <button
                        onClick={generate}
                        disabled={loading || !product.trim()}
                        style={{
                            width: "100%", padding: "14px",
                            background: loading || !product.trim()
                                ? "#444"
                                : "linear-gradient(135deg, #D4A853, #C8973A)",
                            border: "none", borderRadius: 10,
                            color: loading || !product.trim() ? "#888" : "#0A0A0A",
                            fontSize: 14, fontWeight: 700, letterSpacing: 0.5,
                            cursor: loading || !product.trim() ? "not-allowed" : "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            boxShadow: "0 4px 20px rgba(212,168,83,0.25)",
                            marginTop: 6, transition: "all 0.2s",
                        }}
                    >
                        {loading ? "⏳ Generating..." : "✦ Generate Content"}
                    </button>

                    {error && (
                        <div style={{
                            marginTop: 12, padding: 14, borderRadius: 10,
                            background: "rgba(224,92,92,0.08)",
                            border: "1px solid rgba(224,92,92,0.3)",
                            color: "#E05C5C", fontSize: 13,
                        }}>
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                {/* RIGHT — OUTPUT */}
                <div style={{
                    background: "#1C1C1C", border: "1px solid #2A2A2A",
                    borderRadius: 16, padding: 28,
                }}>
                    <div style={{
                        fontSize: 18, fontWeight: 600, marginBottom: 22,
                        display: "flex", alignItems: "center", justifyContent: "space-between"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{
                                display: "block", width: 3, height: 18,
                                background: "#D4A853", borderRadius: 2
                            }} />
                            Generated Content
                        </div>
                        {output && !streaming && (
                            <span style={{
                                fontSize: 11, padding: "3px 10px", borderRadius: 20,
                                background: "rgba(76,175,130,0.1)",
                                border: "1px solid rgba(76,175,130,0.25)",
                                color: "#4CAF82", fontWeight: 500,
                            }}>
                                ✓ {wordCount} words
                            </span>
                        )}
                    </div>

                    {!output && !loading ? (
                        <div style={{
                            minHeight: 280, display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", gap: 14,
                            color: "#7A7370", fontSize: 14,
                            border: "1px dashed #2A2A2A", borderRadius: 12, textAlign: "center",
                        }}>
                            <span style={{ fontSize: 40, opacity: 0.4 }}>✦</span>
                            <span>Fill in your details and hit<br />
                                <strong style={{ color: "#F0EDE8" }}>Generate Content</strong>
                            </span>
                        </div>
                    ) : (
                        <div
                            ref={outputRef}
                            style={{
                                background: "#131313", border: "1px solid #2A2A2A",
                                borderRadius: 12, padding: 20,
                                fontSize: 14, lineHeight: 1.8,
                                whiteSpace: "pre-wrap", minHeight: 280,
                                maxHeight: 500, overflowY: "auto",
                                color: "#F0EDE8",
                            }}
                        >
                            {output}
                            {streaming && (
                                <span style={{
                                    display: "inline-block", width: 2, height: 14,
                                    background: "#D4A853", marginLeft: 2,
                                    animation: "blink 0.8s step-end infinite",
                                    verticalAlign: "middle",
                                }} />
                            )}
                        </div>
                    )}

                    {output && !streaming && (
                        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                            <button onClick={copyOutput} style={actionBtnStyle}>
                                {copied ? "✓ Copied!" : "⎘ Copy"}
                            </button>
                            <button onClick={generate} style={actionBtnStyle}>
                                ↻ Regenerate
                            </button>
                        </div>
                    )}
                </div>

            </main>

            <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        * { box-sizing: border-box; }
        input:focus, textarea:focus {
          outline: none;
          border-color: #D4A853 !important;
          box-shadow: 0 0 0 3px rgba(212,168,83,0.12);
        }
      `}</style>
        </div>
    );
}

// ── Helper Components ──

function Field({ label, children }) {
    return (
        <div style={{ marginBottom: 18 }}>
            <label style={{
                display: "block", fontSize: 11, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: 1.2,
                color: "#7A7370", marginBottom: 7,
            }}>{label}</label>
            {children}
        </div>
    );
}

function PillGroup({ options, selected, onSelect }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {options.map(opt => (
                <button
                    key={opt.id}
                    onClick={() => onSelect(opt.id)}
                    style={{
                        padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                        cursor: "pointer", transition: "all 0.18s", letterSpacing: 0.3,
                        border: selected === opt.id ? "1px solid #D4A853" : "1px solid #2A2A2A",
                        background: selected === opt.id ? "rgba(212,168,83,0.12)" : "transparent",
                        color: selected === opt.id ? "#D4A853" : "#7A7370",
                    }}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

const inputStyle = {
    width: "100%", background: "#131313",
    border: "1px solid #2A2A2A", borderRadius: 10,
    padding: "11px 14px", color: "#F0EDE8",
    fontFamily: "inherit", fontSize: 14,
    transition: "border-color 0.2s, box-shadow 0.2s",
};

const actionBtnStyle = {
    padding: "8px 18px", borderRadius: 8,
    border: "1px solid #2A2A2A", background: "transparent",
    color: "#F0EDE8", fontFamily: "inherit",
    fontSize: 13, fontWeight: 500, cursor: "pointer",
};