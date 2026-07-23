"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

const CodeReviewHero = () => {
  const [code, setCode] = useState<string>("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReview = async () => {
    if (!code.trim()) {
      setError("Please enter some code first!");
      return;
    }

    setError("");
    setIsLoading(true);
    setReview("");

    // Simulate API call
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/code-review`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      },
    );
    const result = await res.json();
    console.log(result);

    const mockReview = `✅ **Code Review Complete**

**Overall Score:** 8.7/10

### Strengths:
- Clean code structure and formatting
- Good variable naming conventions
- Helpful comments included

### Areas for Improvement:
- Consider using early returns for better readability
- Add more robust error handling
- Some functions could be broken into smaller, focused ones

**Suggestions:**
\`\`\`typescript
// Improved example
if (!user) return null;

const handleSubmit = async () => {
  try {
    // ...
  } catch (error) {
    console.error('Submission failed:', error);
  }
};
\`\`\``;

    setReview(result);
    setIsLoading(false);
  };

  return (
    <div className="   hero min-h-[90vh] bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="hero-content w-full max-w-7xl px-4 py-5">
        <div className="w-full">
          {/* Header */}
          <div className="text-center lg:block hidden  mb-5">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6  rounded-full mb-4">
              <span className="text-md ">✦</span>
              <span className="font-semibold text-sm tracking-widest">
                POWERED BY AI
              </span>
            </div>
            <h1 className="lg:text-4xl text-xs   font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Smart Code Reviewer
            </h1>
            <p className="lg:text-sm text-xs text-base-content/70 max-w-2xl mx-auto">
              Paste your code, get instant professional feedback from AI.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Premium Code Input */}
            <div className="flex-[4] min-w-0">
              <div className="card bg-gradient-to-br from-base-100 to-base-200 border border-base-300 shadow-2xl  min-h-[820px] overflow-hidden">
                {/* Premium Header */}
                <div className="lg:px-8 lg:pt-8 lg:pb-6 border-b border-base-300 bg-base-100/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white text-2xl shadow-inner">
                      💻
                    </div>
                    <div>
                      <h2 className="lg:text-2xl text-md  font-bold">
                        Submit Your Code
                      </h2>
                      <p className="text-base-content/60 lg:text-sm text-xs ">
                        Support for JavaScript, TypeScript, Python, Java, and
                        more
                      </p>
                    </div>
                  </div>
                </div>

                <div className="  flex-1 flex flex-col">
                  <textarea
                    className="textarea w-full font-mono text-sm flex-1 bg-base-100 border-2  border-blue-400 focus:border-primary resize-none min-h-[340px]  rounded-2xl shadow-inner"
                    placeholder="// Paste your code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />

                  {error && (
                    <p className="text-error text-sm mt-3 flex items-center gap-2">
                      ⚠️ {error}
                    </p>
                  )}

                  <button
                    onClick={handleReview}
                    disabled={isLoading || !code.trim()}
                    className="mt-8 btn btn-primary btn-lg text-lg font-semibold h-16 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-md"></span>
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        Review My Code
                        <span className="group-hover:translate-x-1 transition">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Review Output */}
            <div className="flex-[6] min-w-0">
              <div className="card bg-base-100 shadow-2xl h-[820px] border border-base-200 overflow-hidden">

                <div className="card-body p-6 flex flex-col h-full">
                  
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl">
                        📋
                      </div>
                      <h2 className="card-title text-2xl">AI Code Review</h2>
                    </div>

                    {review && (
                      <button
                        onClick={() => setReview("")}
                        className="btn btn-ghost btn-sm text-base-content/60 hover:text-error"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  
                  {/* Scrollable Review */}
                   <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    {!review && !isLoading && (
                      <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-75">
                        <div className="text-[120px] mb-6">🤖</div>
                        <h3 className="text-2xl font-semibold mb-3">
                          Review will appear here
                        </h3>
                        <p className="max-w-xs text-base-content/60">
                          Submit code from the left panel to get detailed
                          AI-powered analysis
                        </p>
                      </div>
                    )}

                    {isLoading && (
                      <div className="h-full flex flex-col items-center justify-center py-20">
                        <div className="loading loading-spinner loading-lg mb-8 text-primary"></div>
                        <p className="text-xl font-medium">
                          AI is analyzing your code...
                        </p>
                        <p className="text-sm text-base-content/60 mt-2">
                          This usually takes 2-3 seconds
                        </p>
                      </div>
                    )}

                    {review && (
                      <div className="w-full h-full rounded-2xl border border-base-300 bg-base-200/40 p-6 overflow-auto">
                        <article
                          className="
                          prose
                          dark:prose-invert
                          max-w-none
                          w-full

                          prose-headings:font-bold
                          prose-headings:text-primary

                          prose-p:text-base-content

                          prose-strong:text-success

                          prose-pre:!max-w-full
                          prose-pre:overflow-x-auto
                          prose-pre:bg-[#0d1117]
                          prose-pre:rounded-xl
                          prose-pre:p-5

                          prose-code:before:content-none
                          prose-code:after:content-none

                          prose-table:block
                          prose-table:overflow-x-auto
                        "
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                          >
                            {review}
                          </ReactMarkdown>
                        </article>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewHero;
