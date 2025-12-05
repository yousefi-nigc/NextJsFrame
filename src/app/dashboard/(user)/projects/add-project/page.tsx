"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewProject() {
  const router = useRouter();
  const [projectData, setProjectData] = useState({
    name: "",
    address: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !projectData.name.trim() ||
      !projectData.address.trim() ||
      !projectData.description.trim()
    ) {
      toast.error("لطفا فیلدهای ضروری را پر کنید");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/user/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("پروژه با موفقیت ایجاد شد");

        // console.log("dataaa:", data.project.id);

        if (data.project.id) {
          router.push(`/dashboard/projects/${data.project.id}`);
        }
      } else {
        toast.error("خطا در ایجاد پروژه");
        console.log("Error", res.statusText);
      }
    } catch (error) {
      toast.error("خطای شبکه، دوباره تلاش کنید");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="card-title">
          <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-xl">
            🏛️
          </div>
          ساخت پروژه جدید
        </h1>
      </div>

      <form className="mb-6" onSubmit={createProject}>
        <input
          className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:text-gray-400"
          placeholder="نام پروژه"
          value={projectData.name}
          onChange={(e) =>
            setProjectData({ ...projectData, name: e.target.value })
          }
        />
        <input
          className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:text-gray-400"
          placeholder="آدرس پروژه"
          value={projectData.address}
          onChange={(e) =>
            setProjectData({ ...projectData, address: e.target.value })
          }
        />
        <input
          className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:text-gray-400"
          placeholder="نام کارشناس"
          value={projectData.description}
          onChange={(e) =>
            setProjectData({ ...projectData, description: e.target.value })
          }
        />
        <button
          type="submit"
          className={`btn bg-success text-white ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ذخیره" : "ذخیره پروژه"}{" "}
        </button>
      </form>
    </div>
  );
}
