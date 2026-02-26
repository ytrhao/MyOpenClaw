const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>待办事项应用测试</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
        .container { max-width: 600px; margin: 0 auto; }
        h1 { color: #333; }
        .status { padding: 20px; background: #f0f0f0; border-radius: 8px; margin: 20px 0; }
        .success { background: #d4edda; color: #155724; }
        .info { background: #d1ecf1; color: #0c5460; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 待办事项应用</h1>
        <div class="status success">
          <h2>✅ 应用运行正常！</h2>
          <p>服务器时间: ${new Date().toLocaleString('zh-CN')}</p>
          <p>端口: 3000</p>
        </div>
        <div class="status info">
          <h2>📱 移动端访问</h2>
          <p>请在手机浏览器中访问此链接</p>
          <p>支持功能：添加、删除、完成待办事项</p>
        </div>
        <div class="status">
          <h2>🎨 设计特色</h2>
          <ul style="text-align: left; display: inline-block;">
            <li>黑白极简设计风格</li>
            <li>响应式布局</li>
            <li>实时任务统计</li>
            <li>简洁的用户界面</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

const PORT = 3002;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在端口 ${PORT}`);
});