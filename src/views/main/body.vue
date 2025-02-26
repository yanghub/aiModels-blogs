<!--<template>-->
<!--    <div class="t-center">-->
<!--&lt;!&ndash;        内容居中&ndash;&gt;-->
<!--        <img alt="今日诗词" src="https://v2.jinrishici.com/one.svg" style="max-width:100%; display: block; margin: 0 auto;">-->
<!--    </div>-->

<!--</template>-->

<!--<script >-->
<!--    import Mainlay from "../pages/mainIndex/mainlay";-->
<!--    export default {-->
<!--        name: "body",-->
<!--        components: {Mainlay},-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--    .t-center{-->
<!--        padding: 320px 0;-->
<!--        border: 3px solid #f3f4f6;-->
<!--        text-align:center-->
<!--    }-->
<!--</style>-->

<template>
  <el-container class="chat-container">
    <el-main>
      <!-- 顶部固定部分：问题提示和模型选择 -->
      <div class="top-bar">
        <div style="display: flex; justify-content: center; align-items: center;">
          <h5 style="color: gray; margin-right: 10px;">您可以咨询我任何问题~</h5>
          <el-select v-model="selectedModel" placeholder="请选择模型" class="model-select">
            <el-option v-for="model in modelOptions" :key="model.value" :label="model.label" :value="model.value"></el-option>
          </el-select>
          <h5>&nbsp;&nbsp;&nbsp;TestUrl:</h5><el-input
            v-model="apiUrl"
            placeholder="请输入后端URL"
            class="api-url-input"
            :clearable="true"
            style="width: 30%;"
        ></el-input>
        </div>

      </div>

      <div class="chat-window">
        <!-- 显示消息 -->
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.role === 'assistant' ? 'left' : 'right']">
          <el-card :body-style="{ padding: '10px' }" class="message-card">
            <div ref="messageContent" v-html="renderMath(message.content)"></div>
            <p v-if="message.isThinking" class="thinking-text">思考中... 耗时: {{ message.thinkingTime }}s</p>
          </el-card>
        </div>
      </div>
    </el-main>

    <el-footer class="chat-footer">
      <el-input v-model="userMessage" placeholder="请输入消息..." @keyup.enter="sendMessage" class="input-message" type="text" clearable :disabled="isLoading"></el-input>
      <el-button class="send-button" type="primary" @click="sendMessage" :loading="isLoading">发送</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import Element from "element-ui";

export default {
  data() {
    return {
      userMessage: '',
      messages: [],
      isLoading: false,
      md: new MarkdownIt(),
      thinkingInterval: null,
      selectedModel: 'deepseek-r1-distill-qwen-1.5b', // 默认选择 deepseek-1.5b
      modelOptions: [
        { label: 'deepseek-1.5b', value: 'deepseek-r1-distill-qwen-1.5b' },
        { label: 'deepseek-8b', value: 'deepseek-r1-distill-llama-8b' },
      ],
      apiUrl: 'http://127.0.0.1:1234', // 本地后端URL
    };
  },
  methods: {
    sendMessage() {
      if (!this.userMessage.trim()) return;

      const userMsg = { role: 'user', content: this.userMessage };
      this.messages.push(userMsg);
      this.userMessage = '';
      this.isLoading = true;

      const thinkingMessage = { role: 'assistant', content: '思考中...', isThinking: true, thinkingTime: 0 };
      this.messages.push(thinkingMessage);

      this.thinkingInterval = setInterval(() => {
        // 获取当前正在显示的思考中的消息
        const lastMessage = this.messages[this.messages.length - 1];
        if (lastMessage.isThinking) {
          lastMessage.thinkingTime++; // 增加思考时间
          // 确保 Vue 能重新渲染
          this.$set(this.messages, this.messages.length - 1, lastMessage);
        }

        // 如果思考时间超过xx秒，停止计算并更新消息内容
        if (lastMessage.thinkingTime >= 300) {
          clearInterval(this.thinkingInterval);
          this.messages[this.messages.length - 1] = {
            role: 'assistant',
            content: '服务器过载，请使用1.5b模型完成需求~',
            isThinking: false,
            thinkingTime: lastMessage.thinkingTime
          };
          Element.Message.error('思考时间过长，切换到1.5b模型');
          this.isLoading = false;
        }
      }, 1000);

      this.getResponse(userMsg);
    },
    getResponse(message) {
      const requestData = {
        model: this.selectedModel, // 使用下拉框选择的模型
        messages: [{ role: message.role, content: message.content }],
        temperature: 0.7,
        max_tokens: -1,
        stream: false,
      };

      axios.post(`${this.apiUrl}/v1/chat/completions`, requestData, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      }).then(response => {
        const responseMessage = response.data.choices[0].message.content.replace(/<think>[\s\S]*?<\/think>/, '').trim();
        clearInterval(this.thinkingInterval);  // 请求成功后停止计时
        const thinkingTime = this.messages[this.messages.length - 1].thinkingTime;

        this.messages[this.messages.length - 1] = { role: 'assistant', content: responseMessage, isThinking: false, thinkingTime: thinkingTime };
        this.isLoading = false;
      }).catch(error => {
        console.error('请求失败:', error);
        // 停止思考计时，并将消息修改为"服务器繁忙，请稍后再试！"
        clearInterval(this.thinkingInterval);
        const thinkingTime = this.messages[this.messages.length - 1].thinkingTime;
        this.messages[this.messages.length - 1] = {
          role: 'assistant',
          content: '服务器繁忙，请稍后再试！',
          isThinking: false,
          thinkingTime: thinkingTime
        };
        this.isLoading = false;
      });
    },
    renderMath(content) {
      let markdownContent = this.md.render(content);
      return markdownContent;
    },
  },
};
</script>

<style scoped>
.chat-container {
  height: 90vh;
  display: flex;
  flex-direction: column;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.model-select {
  margin-left: 10px;
}

.api-url-input {
  margin-top: 10px;
  width: 80%;
  margin-left: 10px;
}

.chat-window {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f4f4f4;
}

.message {
  margin-bottom: 10px;
}

.message-card {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message.left {
  text-align: left;
  background-color: #f1f1f1;
  margin-right: auto;
  border-radius: 10px;
}

.message.right {
  text-align: right;
  background-color: #d1f7d1;
  margin-left: auto;
  border-radius: 10px;
}

.chat-footer {
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.input-message {
  flex-grow: 1;
  margin-right: 10px;
}

.send-button {
  width: 100px;
}

.thinking-text {
  font-size: 12px;
  color: gray;
  text-align: center;
  margin-top: 5px;
}
</style>




















