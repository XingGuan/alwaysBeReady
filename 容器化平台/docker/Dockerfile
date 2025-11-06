# ====构建阶段====
FROM node:22.19.0-alpine AS build-stage
# 使用 Node.js 22.19.0 的Alpine Linux 版本作为基础镜像
# FROM your-private-registry.com/node:22.19.0-alpine as build-stage
# 私有镜像仓库或者使用带端口和命名空间的格式：  
# FROM your-private-registry.com:5000/company/node:22.19.0-alpine
# as build-stage 给这个阶段命名为"build-stage"
# Alpine 版本更轻量，适合生产环境
WORKDIR /root/app  
# 设置工作目录为`/root/app`,后续命令都在此目录执行  
COPY . .
# 将宿主机的所有文件复制到镜像的工作目录  
RUN npm config set registry https://registry.npmmirror.com/
# 配置 npm 使用国内镜像源(淘宝镜像)，加速依赖下载   
RUN npm i -g pnpm && pnpm i && pnpm build  
# 安装 pnpm 包管理器  
# 使用 pnpm 安装项目依赖  
# 执行构建命令，生成生产环境的静态文件  

# ====生产阶段====  
FROM nginx:alpine AS production-stage  
# 使用 Ngnix 的 alpine 版本作为新的基础镜像   
# FROM your-private-registry.com/nginx:alpine as production-stage
# 私有镜像仓库或者使用带端口和命名空间的格式
# 这是最终的生产环境镜像  
COPY --from=build-stage /root/app/dist /usr/share/nginx/html  
# 关键步骤：从构建阶段复制构建好的文件  
# 将构建阶段生成的 dist 目录复制到 Nginx 的默认静态文件目录  
# 复制自定义的 nginx 配置文件  
COPY --from=build-stage /root/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80  
# 声明容器监听 80 端口（HTTP）  
CMD ["nginx","-g","daemon off;"]
# 启动 Nginx 服务  
# -g "daemon off;"让Nginx 在前台运行，这是 Docker 容器的最佳实践  

# 这个Dockerfile 采用了多阶段构建，最终镜像只包含运行APP所需的Nginx 和 静态文件，更加轻量安全。
