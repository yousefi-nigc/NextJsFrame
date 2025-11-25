"use client";

import { CalculationResults } from "@/types";

interface ReportSectionProps {
  results: CalculationResults;
}

export default function ReportSection({ results }: ReportSectionProps) {
  return (
    <section id="report" className="section">
      <div className="card">
        {/* HEADER */}
        <div className="card-header">
          <h2 className="card-title flex items-center gap-2">
            <div className="h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xl">
              📄
            </div>
            گزارش نهایی ارزیابی ریسک
          </h2>
        </div>

        {/* بخش اطلاعات پروژه */}
        <div
          className="
              bg-[#f0f7ff]
              p-1 sm:p-5 
              rounded-lg 
              m-5 
              border 
              border-[#4C84C6]
            "
        >
          <h3
            className="
                text-primary-dark 
                mb-4 
                flex 
                items-center 
                gap-2
                font-bold
              "
          >
            <span className="text-[1.3em]">📋</span>
            اطلاعات پروژه و ذخیره‌سازی
          </h3>

          {/* GRID */}
          <div
            className="
                grid 
                gap-4 
                mb-5
                [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]
              "
          >
            {/* نام پروژه */}
            <div className="form-group">
              <label
                htmlFor="project-name"
                className="block mb-1 font-bold text-[#333]"
              >
                نام پروژه: <span className="text-red-500">*</span>
              </label>
              <input
                id="project-name"
                type="text"
                placeholder="مثال: ساختمان اداری شرکت گاز"
                className="
                    w-full 
                    px-3 
                    py-2 
                    border 
                    border-[#ddd] 
                    rounded 
                    font-vazir
                  "
              />
            </div>

            {/* آدرس */}
            <div className="form-group">
              <label
                htmlFor="project-address"
                className="block mb-1 font-bold text-[#333]"
              >
                آدرس محل:
              </label>
              <input
                id="project-address"
                type="text"
                placeholder="آدرس کامل پروژه"
                className="
                    w-full 
                    px-3 
                    py-2 
                    border 
                    border-[#ddd] 
                    rounded 
                    font-vazir
                  "
              />
            </div>

            {/* کارشناس */}
            <div className="form-group">
              <label
                htmlFor="expert-name"
                className="block mb-1 font-bold text-[#333]"
              >
                نام کارشناس:
              </label>
              <input
                id="expert-name"
                type="text"
                placeholder="نام و نام خانوادگی کارشناس"
                className="
                    w-full 
                    px-3 
                    py-2 
                    border 
                    border-[#ddd] 
                    rounded 
                    font-vazir
                  "
              />
            </div>

            {/* طبقه */}
            <div className="form-group">
              <label
                htmlFor="floor-name"
                className="block mb-1 font-bold text-[#333]"
              >
                طبقه/بخش ارزیابی شده:
              </label>
              <input
                id="floor-name"
                type="text"
                placeholder="مثال: طبقه دوم - بخش اداری"
                className="
                    w-full 
                    px-3 
                    py-2 
                    border 
                    border-[#ddd] 
                    rounded 
                    font-vazir
                  "
              />
            </div>
          </div>

          {/* دکمه‌های ذخیره‌سازی */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="
                bg-[#107C41] text-white py-2.5 px-5 cursor-pointer font-semibold flex items-center gap-2 rounded-lg text-nowrap
              "
            >
              <span>📊</span> دانلود گزارش Excel
            </button>

            {/* Button group */}
            <div className="button-group mt-5 flex gap-2 flex-wrap justify-center">
              <button className="py-2 px-3 md:py-3.5 md:px-7 bg-success font-semibold rounded-lg cursor-pointer text-nowrap text-white">
                💾 ذخیره در Excel تجمیعی
              </button>

              <button className="py-2 px-3 md:py-3.5 md:px-7 bg-primary rounded-lg cursor-pointer font-semibold hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200 text-nowrap text-white">
                📊 مشاهده همه رکوردها (<span id="record-count">0</span>)
              </button>

              <button className="py-2 px-3 md:py-3.5 md:px-7 text-black font-semibold bg-neutral-200 rounded-lg cursor-pointer">
                📥 دانلود Excel کامل
              </button>
            </div>
          </div>
        </div>

        {/* بخش نتایج */}
        <div className="report-section mt-6">
          <h3 className="text-xl font-bold mb-3">خلاصه نتایج</h3>
          <div id="report-summary" className="report-content"></div>
        </div>

        <div className="report-section mt-6">
          <h3 className="text-xl font-bold mb-3">توصیه‌های بهبود</h3>
          <div id="report-recommendations" className="report-content"></div>
        </div>

        {/* BUTTON GROUP */}
        <div className="text-center mt-8 p-5 flex flex-wrap justify-center gap-3">
          <button className="btn bg-primary hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200 text-white">
            تولید گزارش
          </button>
          <button className="btn bg-secondary text-white">چاپ گزارش</button>
          <button className="btn bg-neutral-200 text-black">دانلود PDF</button>
        </div>
        {/* </div> */}
      </div>

      {/* <div className="loading" id="loading">
        <div>
          <div className="loading-spinner"></div>
          <div className="loading-text">در حال محاسبه...</div>
        </div>
      </div> */}
    </section>
  );
}
