"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RowSection from "@/components/ui/dashboard/user/RowSection";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Floor, Project } from "@/lib/APIResponseInterfaces";
import { toast } from "sonner";

export default function ProjectEditPage() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const [isProjectSaving, setIsProjectSaving] = useState(false);
  const [isFloorSaving, setIsFloorSaving] = useState(false);
  const [floorData, setFloorData] = useState<Floor>({
    name: "",
    level: 0,
    description: "",
  });

  // FETCH existing project data
  const { data: project, isLoading: isProjectLoading } = useQuery<Project>({
    queryKey: ["project", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const res = await fetch(`/api/user/projects/${projectId}`);
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch the project");

      return data.project;
    },
  });

  const [projectData, setProjectData] = useState({
    name: project?.name || "",
    address: project?.address || "",
    description: project?.description || "",
  });

  //  POPULATE form when data loads
  useEffect(() => {
    if (project) {
      setProjectData({
        name: project.name || "",
        address: project.address || "",
        description: project.description || "",
      });
    }
  }, [project]);

  // HANDLE input changes
  const handleProjectInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFloorInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFloorData((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  // SUBMIT form (UPDATE only)
  const handleProjectDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !projectData.name.trim() ||
      !projectData.address.trim() ||
      !projectData.description.trim()
    ) {
      toast.error("لطفا فیلدهای ضروری را پر کنید");
      return;
    }

    setIsProjectSaving(true);

    try {
      const res = await fetch(`/api/user/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      const data = await res.json();

      if (res.ok) {
        // Invalidate cache to refetch fresh data
        queryClient.invalidateQueries({ queryKey: ["project", projectId] });

        toast.success("پروژه با موفقیت به‌روزرسانی شد");
      } else {
        const errorMessage = data.message || "خطا در به‌روزرسانی پروژه";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("خطای شبکه، دوباره تلاش کنید");
      console.error(error);
    } finally {
      setIsProjectSaving(false);
    }
  };

  const createFloor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !floorData.name.trim() ||
      !floorData.level ||
      !floorData.description.trim()
    ) {
      toast.error("لطفا فیلدهای ضروری را پر کنید");
      return;
    }

    const levelExists = floors?.some(
      (f: Floor) => f.level === Number(floorData.level)
    );

    if (levelExists) {
      toast.error("شماره طبقه وارد شده قبلاً برای یک طبقه دیگر ثبت شده است");
      return;
    }

    setIsFloorSaving(true);

    try {
      const res = await fetch(`/api/user/projects/${project?.id}/floors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(floorData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("dataaa:", data);
        toast.success("طبقه با موفقیت ایجاد شد");
        setFloorData({ name: "", level: 0, description: "" });

        queryClient.invalidateQueries({ queryKey: ["floors", project?.id] });
      } else {
        toast.error("خطا در ایجاد طبقه");
        console.log("Error", res.statusText);
      }
    } finally {
      setIsFloorSaving(false);
    }
  };

  const { data: floors } = useQuery<Floor[]>({
    queryKey: ["floors", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const res = await fetch(`/api/user/projects/${projectId}/floors`);
      const data = await res.json();
      // console.log("floors", data.floors);

      return data.floors;
    },
  });

  if (isProjectLoading) return <p>در حال بارگذاری...</p>;

  if (!project) {
    return <p>پروژه پیدا نشد</p>;
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="card-title">
          <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-xl">
            🏢
          </div>
          {project?.name}
        </h1>
      </div>
      <form className="mb-6">
        <h2 className="text-xl font-semibold mb-2">اطلاعات پروژه</h2>
        <input
          name="name"
          placeholder="نام پروژه"
          value={projectData.name}
          onChange={handleProjectInputChange}
          className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:dark:text-gray-400"
        />
        <input
          name="address"
          placeholder="آدرس پروژه"
          value={projectData.address}
          onChange={handleProjectInputChange}
          className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:dark:text-gray-400"
        />
        <input
          name="description"
          placeholder="نام کارشناس"
          value={projectData.description}
          onChange={handleProjectInputChange}
          className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:dark:text-gray-400"
        />
        <button
          type="submit"
          onClick={handleProjectDataSubmit}
          disabled={isProjectSaving}
          className={`bg-success text-white p-2 rounded cursor-pointer mb-8 ${
            isProjectSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isProjectSaving ? "در حال به روز رسانی ..." : "به روز رسانی پروژه"}
        </button>
      </form>

      <form className="w-full">
        <h2 className="text-xl font-semibold mb-2">طبقات</h2>
        <div className="flex flex-col">
          <input
            name="name"
            value={floorData.name}
            onChange={handleFloorInputChange}
            placeholder="نام طبقه جدید"
            className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:text-gray-400"
          />
          <input
            name="level"
            value={floorData.level}
            placeholder="نام لول جدید"
            onChange={handleFloorInputChange}
            className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:text-gray-400"
          />
          <input
            name="description"
            value={floorData.description}
            placeholder="توضیحات جدید"
            onChange={handleFloorInputChange}
            className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:text-gray-400"
          />
          <button
            type="submit"
            onClick={createFloor}
            disabled={isFloorSaving}
            className={`bg-primary w-fit text-white p-2 rounded cursor-pointer mb-8 ${
              isFloorSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isProjectSaving ? "در حال اضافه کردن ..." : "اضافه کردن طبقه"}
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">تمامی طبقات</h3>

        <div className="rounded-lg shadow-md border border-gray-300 dark:border-gray-600 mt-4">
          <table className="w-full text-sm text-right table-fixed">
            <thead className="bg-gray-100 dark:bg-[#ffffff11] font-semibold">
              <tr>
                <th className="w-2/3 md:w-[80%] xl:w-5/7 font-semibold p-3 border-b border-gray-300 dark:border-gray-700 whitespace-nowrap md:text-lg">
                  طبقات
                </th>
                <th className="w-1/3 md:w-[20%] xl:w-2/7 font-semibold p-3 border-b border-gray-300 dark:border-gray-700 whitespace-nowrap md:text-lg">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="p-3 border-b border-gray-300 dark:border-gray-700">
              {floors?.map((floor) => (
                <RowSection
                  key={floor.id}
                  floor={floor}
                  projectId={project.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
