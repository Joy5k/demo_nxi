"use client";

import { ArrowLeft, ArrowRight, Briefcase, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import Loader from "@/src/components/Loader";
import {
  IJobPost,
  useGetJobPostByIdQuery,
} from "@/src/lib/redux/features/careers/jobApplicationApi";

const surfaceStyle = {
  background: "rgba(255,255,255,0.58)",
  border: "1px solid rgba(255,255,255,0.72)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 18px 60px rgba(26, 47, 74, 0.10)",
};

const pillStyle = {
  background: "rgba(255,255,255,0.55)",
  border: "1px solid rgba(255,255,255,0.78)",
  backdropFilter: "blur(12px)",
};

function RichText({ html }: { html: string }) {
  return (
    <div
      className="prose prose-sm max-w-none sm:prose-base prose-p:leading-7 prose-li:leading-7 prose-headings:mb-4 prose-p:my-3 prose-ul:my-4"
      style={{ color: "#3a5a7a" }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const { data, isLoading } = useGetJobPostByIdQuery(slug || "");
  const job = (data?.data as IJobPost) || null;

   if (isLoading) {
     return (
       <section
         className="min-h-screen px-4 py-28 sm:px-6"
         style={{
           background:
             "linear-gradient(135deg, #c8e8f8 0%, #d4ecfa 40%, #cce5f7 70%, #c4e0f5 100%)",
         }}
       >
         <div className="mx-auto max-w-4xl rounded-[28px] px-8 py-16 text-center" style={surfaceStyle}>
           <div className="space-y-4">
             <Loader size="60px" />
             <p className="text-lg font-medium" style={{ color: "#31506d" }}>
               Loading job details...
             </p>
           </div>
         </div>
       </section>
     );
   }

  if (!job) {
    return (
      <section
        className="min-h-screen px-4 py-28 sm:px-6"
        style={{
          background:
            "linear-gradient(135deg, #c8e8f8 0%, #d4ecfa 40%, #cce5f7 70%, #c4e0f5 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl rounded-[28px] px-8 py-16 text-center" style={surfaceStyle}>
          <h1 className="text-3xl font-semibold" style={{ color: "#1a2f4a" }}>
            This role could not be found.
          </h1>
          <p className="mt-3 text-base" style={{ color: "#4f7a9d" }}>
            It may have been removed or is no longer available.
          </p>
          <button
            onClick={() => router.push("/careers")}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(to right, #1193d2, #3e236a)",
              boxShadow: "0 12px 30px rgba(17,147,210,0.28)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to careers
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(135deg, #c8e8f8 0%, #d4ecfa 40%, #cce5f7 70%, #c4e0f5 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 18% 16%, rgba(153,200,255,0.7) 0%, transparent 38%),
              radial-gradient(ellipse at 84% 18%, rgba(148,219,254,0.66) 0%, transparent 36%),
              radial-gradient(ellipse at 52% 60%, rgba(212,206,246,0.58) 0%, transparent 40%),
              radial-gradient(ellipse at 15% 82%, rgba(179,232,252,0.68) 0%, transparent 34%)
            `,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <button
          onClick={() => router.push("/careers")}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition"
          style={{ ...pillStyle, color: "#31506d" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to careers
        </button>

        <div className="rounded-[32px] p-7 sm:p-10" style={surfaceStyle}>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ ...pillStyle, color: "#0f7db2" }}
            >
              {job.status}
            </span>
            {job.jobType && (
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  background: "rgba(62,35,106,0.08)",
                  border: "1px solid rgba(62,35,106,0.12)",
                  color: "#4d3b82",
                }}
              >
                {job.jobType}
              </span>
            )}
          </div>

          <h1
            className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
            style={{ color: "#1a2f4a" }}
          >
            {job.title}
          </h1>

          <div
            className="mt-6 flex flex-wrap items-center gap-4 text-sm"
            style={{ color: "#4f7a9d" }}
          >
            {job.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
            )}
            {job.salaryRange && (
              <span className="inline-flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {job.salaryRange}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-3xl text-base leading-7" style={{ color: "#3a5a7a" }}>
            We&apos;re looking for someone who can contribute thoughtfully,
            collaborate closely, and help us build meaningful work with care.
          </p>
        </div>

        <div className="mt-6 grid gap-6">
          <article className="rounded-[28px] p-7 sm:p-8" style={surfaceStyle}>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #1193d2, #7c5cbf)",
                }}
              />
              <h2 className="text-2xl font-semibold" style={{ color: "#1a2f4a" }}>
                Position overview
              </h2>
            </div>
            <RichText html={job.description} />
          </article>

          {job.requirements && (
            <article className="rounded-[28px] p-7 sm:p-8" style={surfaceStyle}>
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #7c5cbf, #1193d2)",
                  }}
                />
                <h2 className="text-2xl font-semibold" style={{ color: "#1a2f4a" }}>
                  Requirements
                </h2>
              </div>
              <RichText html={job.requirements} />
            </article>
          )}

          <article
            className="overflow-hidden rounded-[30px] p-8 text-center sm:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.58), rgba(255,255,255,0.42))",
              border: "1px solid rgba(255,255,255,0.72)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 18px 60px rgba(26, 47, 74, 0.10)",
            }}
          >
            <div
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ ...pillStyle, color: "#1a3a5c" }}
            >
              Join our journey
            </div>

            <h2 className="text-3xl font-semibold tracking-tight" style={{ color: "#1a2f4a" }}>
              Ready to apply?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7" style={{ color: "#3a5a7a" }}>
              If this role feels like the right fit, send us your application
              and tell us how you&apos;d like to contribute.
            </p>

            <button
              onClick={() => router.push(`/careers/apply/${job.id}`)}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(to right, #1193d2, #3e236a)",
                boxShadow: "0 12px 30px rgba(17,147,210,0.30)",
              }}
            >
              Start application
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
