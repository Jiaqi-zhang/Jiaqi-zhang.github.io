# 安装指导

## 安装前提

install Node.js & git & hexo https://hexo.io/docs/

## 搭建网站

https://phower.me/2020/03/Hexo-theme-academia-%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3/#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C%E5%8F%8A%E5%AE%89%E8%A3%85


- 新建文件夹：my_hexo
- npx hexo init ./my_hexo/
- cd ./my_hexo/
- git clone https://github.com/PhosphorW/hexo-theme-academia.git themes/Academia
- npm install hexo-renderer-pug hexo-renderer-stylus

- 最后在 _config.yml 中设置 theme: Academia
- npx hexo server
- 查看：http://localhost:4000/
- 生成最后Public页面：npx hexo g

*Note: 每次生成新的静态页面时，最好删除 public 文件夹*

## More details

参考网址：https://www.jianshu.com/p/51cc016a1933

- 仅仅在使用post创建的Markdown文件，设置academia: true，该部分内容才会包含在index页面；
- /#About-me：定位当前页面；/Publications：对应着创建的页面（npx hexo new page "..."）； 
- 仅支持：hexo n post "any title" or hexo n page "any title"

## Some Problem

- 生成结果为空项目：Nodejs14的问题，建议用12版本
- 如果没有加载样式，通过浏览器查看CSS、JS等路径
