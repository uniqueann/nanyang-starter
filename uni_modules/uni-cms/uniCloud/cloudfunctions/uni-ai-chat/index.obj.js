// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const {safeRequire, checkContentSecurityEnable} = require('./utils')
const createConfig = safeRequire('uni-config-center')
const config = createConfig({
	pluginId: 'uni-ai-chat'
}).config()

module.exports = {
	_before:async function() {
		// 这里是云函数的前置方法，你可以在这里加入你需要逻辑，比如：拦截用户必须登录才能访问等
		/*
			例如：使用uni-id-pages（链接地址：https://ext.dcloud.net.cn/plugin?id=8577）搭建账户体系。
			然后再使用uni-id-common的uniIdCommon.checkToken判断用户端身份，验证不通过你可以直接`throw new Error(“token无效”)`抛出异常拦截访问。
			如果验证通过了可以获得用户id，可以记录每一个用户id的调用次数来限制，调用多少次后必须充值（推荐用uni-pay，下载地址：https://ext.dcloud.net.cn/plugin?id=1835）
			或者看一个激励视频广告（详情：https://uniapp.dcloud.net.cn/uni-ad/ad-rewarded-video.html）后才能继续使用
			*** 激励视频是造富神器。行业经常出现几个人的团队，月收入百万的奇迹。 ***
		*/

		// 从配置中心获取内容安全配置
		if (this.getMethodName() == 'send' && config.contentSecurity) {
			const UniSecCheck = safeRequire('uni-sec-check')
			const uniSecCheck = new UniSecCheck({
				provider: 'mp-weixin',
				requestId: this.getUniCloudRequestId()
			})
			this.textSecCheck = async (content)=>{
				let {SSEChannel} = this.getParams()[0]||{}
				if(SSEChannel){
					return console.log('提示：流式响应模式，内容安全识别功能无效');
				}
				// 检测文本
				const checkRes = await uniSecCheck.textSecCheck({
					content,
					// openid,
					scene:4,
					version:1 //后续：支持微信登录后，微信小程序端 改用模式2 详情：https://uniapp.dcloud.net.cn/uniCloud/uni-sec-check.html#%E4%BD%BF%E7%94%A8%E5%89%8D%E5%BF%85%E7%9C%8B
				})
				console.log('checkRes检测文本',checkRes);
				if (checkRes.errCode === uniSecCheck.ErrorCode.RISK_CONTENT) {
					throw {
						isSecCheck:true,
						errCode: checkRes.errCode,
						errMsg: '文字存在风险',
						result: checkRes.result
					}
				} else if (checkRes.errCode) {
					console.log(`其他原因导致此文件未完成自动审核（错误码：${checkRes.errCode}，错误信息：${checkRes.errMsg}），需要人工审核`);
					throw {
						isSecCheck:true,
						errCode: checkRes.errCode,
						errMsg: checkRes.errMsg,
						result: checkRes.result
					}
				}
			}
			
			let {messages} = this.getParams()[0]||{"messages":[]}
			let contentString = messages.map(i=>i.content).join(' ')
			console.log('contentString',contentString);
			await this.textSecCheck(contentString)
		}
	},
	async _after(error, result) {
		if(error){
			if(error.isSecCheck ) {
				return {
					"data": {
						"reply": "内容涉及敏感"
					},
					"errCode": 0
				}
			}else{
				throw error // 直接抛出异常
			}
		}
		
		if (this.getMethodName() == 'send' && config.contentSecurity) {
			try{
				await this.textSecCheck(result.data.reply)
			}catch(e){
				return {
					"data": {
						"reply": "内容涉及敏感"
					},
					"errCode": 0
				}
			}
		}
		return result
	},
	async send({
		messages,
		SSEChannel
	}) {
		// 初次调试时，可不从客户端获取数据，直接使用下面写死在云函数里的数据
		// messages =  [{
		// 	role: 'user',
		// 	content: 'uni-app是什么，20个字以内进行说明'
		// }]

		// 校验客户端提交的参数
		let res = checkMessages(messages)
		if (res.errCode) {
			throw new Error(res.errMsg)
		}

		// 向uni-ai发送消息
		return await chatCompletion({
			messages, //消息内容
			SSEChannel, //sse渠道对象

			// 以下参数参考：https://uniapp.dcloud.net.cn/uniCloud/uni-ai.html#get-llm-manager

			// provider:"minimax",//llm服务商，目前支持openai、baidu、minimax。不指定时由uni-ai自动分配
			// apiKey:"",//llm服务商的apiKey，如不填则使用uni-ai的key。如指定openai和baidu则必填
			// accessToken:"",//llm服务商的accessToken。目前百度文心一言是必填
			// proxy:""//可有效连接openai服务器的、可被uniCloud云函数连接的代理服务器地址。格式为IP或域名，域名不包含http前缀，协议层面仅支持https。配置为openai时必填
		})

		async function chatCompletion({
			messages,
			summarize = false,
			SSEChannel = false,
			provider,
			apiKey,
			accessToken,
			proxy
		}) {
			const llmManager = uniCloud.ai.getLLMManager({
				provider,
				apiKey,
				accessToken,
				proxy
			})

			let res = await llmManager.chatCompletion({
				messages,
				tokensToGenerate: 512,
				stream: SSEChannel !== false
			})

			if (SSEChannel) {
				let reply = ""
				return new Promise((resolve, reject) => {
					const channel = uniCloud.deserializeSSEChannel(SSEChannel)
					res.on('message', async (message) => {
						// await channel.write(message)
						// console.log('---message----', message)
					})
					res.on('line', async (line) => {
						reply += line
						await channel.write(line)
						// console.log('---line----', line)
					})
					res.on('end', async () => {
						// console.log('---end----',reply)

						messages.push({
							"content": reply,
							"role": "assistant"
						})

						let totalTokens = messages.map(i => i.content).join('').length;
						// console.log('totalTokens',totalTokens);
						if (!summarize && totalTokens > 500) {
							let replySummarize = await getSummarize(messages)
							// console.log('replySummarize',replySummarize)
							await channel.end({
								summarize: replySummarize
							})
						} else {
							await channel.end()
						}
						resolve({
							errCode: 0
						})
					})
					res.on('error', (err) => {
						console.error('---error----', err)
						reject(err)
					})
				})
			} else {
				if (summarize == false) {
					messages.push({
						"content": res.reply,
						"role": "assistant"
					})
					let totalTokens = messages.map(i => i.content).join('').length;
					if (totalTokens > 500) {
						let replySummarize = await getSummarize(messages)
						res.summarize = replySummarize
					}
				}
				if(res.errCode){
					throw res
				}
				return {
					data:res,
					errCode: 0
				}
			}
		}

		//获总结
		async function getSummarize(messages) {
			messages.push({
				"content": "请简要总结上述全部对话",
				"role": "user"
			})
			// 获取总结不需要再总结summarize和stream
			let res = await chatCompletion({
				messages,
				summarize: true,
				stream: false,
				SSEChannel: false
			})
			return res.reply
		}

		function checkMessages(messages) {
			try {
				if (messages === undefined) {
					throw "messages为必传参数"
				} else if (!Array.isArray(messages)) {
					throw "参数messages的值类型必须是[object,object...]"
				} else {
					messages.forEach(item => {
						if (typeof item != 'object') {
							throw "参数messages的值类型必须是[object,object...]"
						}
						let itemRoleArr = ["assistant", "user", "system"]
						if (!itemRoleArr.includes(item.role)) {
							throw "参数messages[{role}]的值只能是：" + itemRoleArr.join('或')
						}
						if (typeof item.content != 'string') {
							throw "参数messages[{content}]的值类型必须是字符串"
						}
					})
				}
				return {
					errCode: 0,
				}
			} catch (errMsg) {
				return {
					errSubject: 'ai-demo',
					errCode: 'param-error',
					errMsg
				}
			}
		}
	}
}