"use client";

import Link from "next/link";
import {
  // QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Project } from "@/lib/APIResponseInterfaces";
import { toast } from "sonner";
// import { useState } from "react";

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  // const [isDeleting, setIsDeleting] = useState(false);

  // Fetch projects
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/user/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();

      return data.projects;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (projectId: string) => {
      const res = await fetch(`/api/user/projects/${projectId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete project");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      toast.success("پروژه با موفقیت حذف شد");
    },
  });

  const handleDelete = async (projectId: string) => {
    const yes = window.confirm(
      "حذف کردن این پروژه به منزله حذف کردن تمامی اطلاعات پروژه است. آیا مایل به حذف هستید؟"
    );

    if (!yes) return;

    deleteMutation.mutate(projectId);
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="card-title">
          <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-xl">
            🏦
          </div>
          تمام پروژه‌ها
        </h1>
        <Link
          href={"/dashboard/projects/add-project"}
          className="px-4 py-2 md:px-7 md:py-3.5 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer btn-primary text-nowrap text-sm"
        >
          ساخت پروژه جدید +
        </Link>
      </div>

      <ul className="">
        {projects?.map((project) => (
          <li
            key={project.id}
            className="dark:border-primary border-gray-200 bg-gray-50 dark:bg-(--input-bg) p-3 mb-2 flex justify-between w-full px-4 py-3.5 border-2 rounded-lg text-gray-900 dark:text-white text-base font-vazir transition-all duration-200"
          >
            <Link
              href={`/dashboard/projects/${project.id}`}
              className="font-semibold"
            >
              {project.name}
            </Link>
            <div className="flex gap-3 cursor-pointer md:gap-6">
              <button
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(project.id)}
              >
                حذف
              </button>
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="text-blue-500"
              >
                ویرایش
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
