import { Briefcase, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl font-bold">Next Step</span>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Nền tảng tuyển dụng hàng đầu với công nghệ AI phân tích CV
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Cho Ứng Viên</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Tìm Việc
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Phân Tích CV
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Hồ Sơ & CV
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Lời Khuyên Phỏng Vấn
                </a>
              </li>
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h4 className="font-bold mb-4">Cho Công Ty</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Đăng Tuyển
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Tìm Ứng Viên
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Gói Thanh Toán
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Liên Hệ Sales
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                contact@nextstep.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                +84 28 1234 5678
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                TP. Hồ Chí Minh, Việt Nam
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 py-8 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-sm text-primary-foreground/70">
            © 2024 Next Step. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Chính Sách Bảo Mật
            </a>
            <a
              href="#"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Điều Khoản Dịch Vụ
            </a>
            <a
              href="#"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Liên Hệ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
