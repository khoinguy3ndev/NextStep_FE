"use client";

import { Search, MapPin } from "lucide-react";
import { useState } from "react";

export function HeroSection() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Search:", { keyword, location });
  };

  return (
    <section className="bg-background py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Tìm Công Việc Mơ Ước & Phân Tích CV Bằng AI
          </h1>
          <p className="text-lg text-muted-foreground">
            Khám phá hàng ngàn cơ hội việc làm và nâng cao CV của bạn với công
            nghệ AI tiên tiến
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 p-4 md:p-6">
            {/* Keyword Input */}
            <div className="flex items-center gap-3 md:border-r border-border md:pr-6">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Kỹ năng / Chuyên ngành"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-3 md:px-6 md:border-r border-border">
              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Địa điểm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-semibold py-3 px-8 h-full flex items-center justify-center"
            >
              Tìm Kiếm
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <span className="text-sm text-muted-foreground">Phổ biến:</span>
          <a
            href="#"
            className="text-sm text-primary hover:underline font-medium"
          >
            React
          </a>
          <a
            href="#"
            className="text-sm text-primary hover:underline font-medium"
          >
            Node.js
          </a>
          <a
            href="#"
            className="text-sm text-primary hover:underline font-medium"
          >
            Python
          </a>
        </div>
      </div>
    </section>
  );
}
