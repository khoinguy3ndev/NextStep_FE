import { Tag } from "lucide-react";

const categories = [
  { id: 1, name: "Java", count: 1245 },
  { id: 2, name: "React", count: 2087 },
  { id: 3, name: "Python", count: 1856 },
  { id: 4, name: "Node.js", count: 1643 },
  { id: 5, name: "Tester QA", count: 892 },
  { id: 6, name: "Manager", count: 756 },
  { id: 7, name: "DevOps", count: 567 },
  { id: 8, name: "Golang", count: 489 },
  { id: 9, name: "TypeScript", count: 1234 },
  { id: 10, name: "UI/UX Designer", count: 654 },
  { id: 11, name: "Data Scientist", count: 445 },
  { id: 12, name: "Product Owner", count: 321 },
];

export function JobCategories() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Danh Mục Việc Làm
            </h2>
          </div>
          <p className="text-muted-foreground">
            Khám phá các chuyên ngành và kỹ năng được tìm kiếm nhiều nhất
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              className="px-4 py-3 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground rounded-lg font-medium transition-colors duration-200 border border-transparent hover:border-primary flex flex-col items-center gap-1"
            >
              <span className="text-sm font-semibold">{category.name}</span>
              <span className="text-xs text-muted-foreground hover:text-primary-foreground">
                {category.count}+
              </span>
            </button>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg font-semibold">
            Xem Tất Cả Danh Mục
          </button>
        </div>
      </div>
    </section>
  );
}
