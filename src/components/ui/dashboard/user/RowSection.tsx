import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RowSection({
  className,
  floor,
  projectId,
}: {
  className?: string;
  floor: { id?: string; name?: string; level?: number };
  projectId: string;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: async ({
      projectId,
    }: // floorId,
    {
      projectId: string;
      // floorId: string;
    }) => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floor.id}`,
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
    },
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    const yes = window.confirm(
      "حذف کردن این طبقه به منزله حذف کردن تمامی اطلاعات طبقه است. آیا مایل به حذف هستید؟"
    );

    if (!yes) return;

    deleteMutation.mutate({ projectId });
  };

  const handleRowClick = () => {
    router.push(`/dashboard/projects/${projectId}/${floor.id}/potential-risk`);
  };

  return (
    <tr
      onClick={handleRowClick}
      className={`p-3 border-b border-gray-300 dark:border-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:shadow-md active:scale-[0.98] ${className}`}
    >
      <td className="p-3 text-sm md:text-base whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span>📲</span>
          <span className="font-medium">{floor.name}</span>
        </div>
      </td>
      <td className="p-3 text-sm md:text-base whitespace-nowrap flex items-center gap-2 md:gap-5">
        <button
          onClick={handleDelete}
          className="disabled:opacity-50 text-red-500 hover:text-red-700 dark:hover:text-red-400 text-xs cursor-pointer md:text-base px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          حذف
        </button>
        <Link
          href={`/dashboard/projects/${projectId}/${floor.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-xs md:text-base px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          ویرایش
        </Link>
      </td>
    </tr>
  );
}
