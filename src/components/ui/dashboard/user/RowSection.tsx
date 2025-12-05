import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
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

  const handleDelete = async () => {
    const yes = window.confirm(
      "حذف کردن این طبقه به منزله حذف کردن تمامی اطلاعات طبقه است. آیا مایل به حذف هستید؟"
    );

    if (!yes) return;

    deleteMutation.mutate({ projectId });
  };

  return (
    <tr
      className={`p-3 border-b border-gray-300 dark:border-gray-700 ${className}`}
    >
      <td className="p-3 text-sm md:text-base whitespace-nowrap">
        📲
        {floor.name}
      </td>
      <td className="p-3 text-sm md:text-base whitespace-nowrap flex items-center gap-2 md:gap-5">
        <button
          // disabled={isDeleting}
          onClick={() => handleDelete()}
          className="disabled:opacity-50 text-red-500 text-xs cursor-pointer md:text-base"
        >
          حذف
        </button>
        <Link
          href={`/dashboard/projects/${projectId}/${floor.id}`}
          className="text-blue-500 text-xs md:text-base"
        >
          ویرایش
        </Link>
      </td>
    </tr>
  );
}
