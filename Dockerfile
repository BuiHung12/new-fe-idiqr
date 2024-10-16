# Sử dụng Node.js phiên bản LTS
FROM node:18.17.1

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Chạy build để tạo bản dựng ứng dụng
RUN npm run build

# Mở cổng mà ứng dụng sẽ chạy (thay đổi nếu cần)
EXPOSE 5173

# Lệnh để khởi động ứng dụng (thay đổi nếu cần)
CMD ["npm",  "run",  "preview"]
