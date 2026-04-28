"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  IJobPost,
  useGetJobPostByIdQuery,
} from "@/src/lib/redux/features/careers/jobApplicationApi";
import DOMPurify from "isomorphic-dompurify";

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const { data, isLoading } = useGetJobPostByIdQuery(slug || "");

  const job = (data?.data as IJobPost) || null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-gray-500">
          Loading job details...
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#1A1A40]">Job not found</h1>
          <button
            onClick={() => router.push("/careers")}
            className="mt-4 inline-flex items-center gap-2 text-[#5D5FEF] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/careers")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#5D5FEF] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all jobs
        </button>

        {/* Job Description */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <div
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
          />
        </div>

        {/* Requirements */}
        {job.requirements && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-bold text-[#1A1A40] mb-4">
              What we&apos;re looking for
            </h2>
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.requirements) }}
            />
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#5D5FEF] to-[#7AB8FF] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to make an impact?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            If this role feels like a strong fit, send in your application and let&apos;s talk.
          </p>
          <button
            onClick={() => router.push(`/careers/apply/${job.id}`)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#5D5FEF] rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Apply for this role
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}