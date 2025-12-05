"use client";

import { Floor } from "@/lib/APIResponseInterfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FloorPage() {
  const { projectId, floorId } = useParams();

  const router = useRouter();
  const [isFloorSaving, setIsFloorSaving] = useState(false);
  const queryClient = useQueryClient();

  const { data: floors } = useQuery({
    queryKey: ["floors", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const res = await fetch(`/api/user/projects/${projectId}/floors`);
      const data = await res.json();
      return data.floors;
    },
  });

  const { data: floor, isLoading } = useQuery<Floor>({
    queryKey: ["floor", floorId],
    enabled: !!floorId,
    queryFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch the floor");

      return data.floor;
    },
  });

  const [floorData, setFloorData] = useState<Floor>({
    name: floor?.name || "",
    level: floor?.level || 0,
    description: floor?.description || "",
  });

  useEffect(() => {
    if (floor) {
      setFloorData({
        name: floor.name || "",
        level: floor.level || 0,
        description: floor.description || "",
      });
    }
  }, [floor]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFloorData((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  const updateFloor = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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
      return; // ❌ Stop creating
    }

    setIsFloorSaving(true);

    try {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(floorData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // queryClient.invalidateQueries({ queryKey: ["project", projectId] });
        toast.success("طبقه با موفقیت به‌روزرسانی شد");
        router.back();
      } else {
        const errorMessage = data.message || "خطا در به‌روزرسانی طبقه";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("خطای شبکه، دوباره تلاش کنید");
      console.error(error);
    } finally {
      setIsFloorSaving(false);
    }
  };

  const projectIdStr = String(projectId);

  const deleteMutation = useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete floor");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floors", projectId] });

      toast.success("طبقه با موفقیت حذف شد");

      router.push(`/dashboard/projects/${projectId}`);
    },
  });

  const handleDelete = async () => {
    const yes = window.confirm(
      "حذف کردن این طبقه به منزله حذف کردن تمامی اطلاعات طبقه است. آیا مایل به حذف هستید؟"
    );

    if (!yes) return;

    deleteMutation.mutate({ projectId: projectIdStr });
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="card-title">
          <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-xl">
            📲
          </div>
          {floor?.name}
        </h1>
      </div>

      {/* فرم ویرایش طبقه */}
      <form className="flex flex-col">
        <input
          name="name"
          placeholder="نام طبقه"
          value={floorData.name}
          onChange={handleInputChange}
          className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:text-gray-400"
        />
        <input
          name="level"
          placeholder="نام لول"
          value={floorData.level}
          onChange={handleInputChange}
          className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:text-gray-400"
        />
        <input
          name="description"
          placeholder="توضیحات"
          value={floorData.description}
          onChange={handleInputChange}
          className="border-2 border-border-color bg-gray-50 dark:bg-(--input-bg) p-2 rounded mb-2 w-full placeholder:text-sm placeholder:text-gray-400"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isFloorSaving}
            onClick={updateFloor}
            className="bg-green-500 text-white p-2 rounded cursor-pointer"
          >
            {isFloorSaving ? "در حال ذخیره..." : "ذخیره طبقه"}
          </button>
          <button
            type="button"
            onClick={() => handleDelete()}
            className="bg-red-500 text-white p-2 rounded cursor-pointer"
          >
            حذف طبقه
          </button>
        </div>
      </form>
    </div>
  );
}
