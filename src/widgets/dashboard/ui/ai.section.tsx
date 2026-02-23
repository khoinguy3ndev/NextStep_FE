import { Upload, CheckCircle, Zap } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function AIResumeSection() {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate({ to: "/jobs", search: { analyze: true } });
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Công Nghệ AI Tiên Tiến
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Trình Kiểm Tra CV Thông Minh
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Tải lên CV của bạn và nhận điểm phù hợp ngay lập tức. Công nghệ AI
              của chúng tôi sẽ phân tích CV của bạn so với các công việc và cung
              cấp gợi ý cải thiện.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Phân Tích Tức Thì
                  </h3>
                  <p className="text-muted-foreground">
                    Nhận phản hồi chi tiết trong vài giây
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    So Sánh Với Công Việc
                  </h3>
                  <p className="text-muted-foreground">
                    Biết điểm phù hợp của bạn với mỗi vị trí
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Gợi Ý Cải Thiện
                  </h3>
                  <p className="text-muted-foreground">
                    Nhận hướng dẫn để nâng cao hồ sơ của bạn
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleUploadClick}
              className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-semibold flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <Upload className="w-5 h-5" />
              Tải Lên CV Ngay
            </button>
          </div>

          {/* Right Side - Visual */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8 md:p-12 flex flex-col items-center justify-center min-h-96">
            <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-6">
              <Upload className="w-16 h-16 text-primary" />
            </div>
            <p className="text-center text-foreground font-semibold mb-2">
              Kéo và Thả CV Của Bạn
            </p>
            <p className="text-center text-muted-foreground text-sm">
              hoặc nhấp để chọn tệp từ máy tính
            </p>
            <div className="text-xs text-muted-foreground mt-4">
              Hỗ trợ: PDF, DOC, DOCX (Tối đa 5MB)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
