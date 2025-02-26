// server.js
const express = require('express');
const WebSocket = require('ws');
const app = express();
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // 模拟消息的逐步发送
    const messages = [
        'Hello!',
        'How can I help you today?',
        'I can assist you with various tasks.',
        'Feel free to ask anything.',
        '😊'
    ];

    let i = 0;
    const intervalId = setInterval(() => {
        if (i < messages.length) {
            ws.send(JSON.stringify({ content: messages[i] }));
            i++;
        } else {
            clearInterval(intervalId);
            ws.send(JSON.stringify({ content: '[DONE]' })); // 结束消息流
        }
    }, 1000); // 每秒发送一条消息

    // 处理客户端消息
    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
    });

    // 客户端断开连接时处理
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('WebSocket server running on ws://localhost:3000');
});
