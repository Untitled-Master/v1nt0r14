"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Trash2, Download, Copy, RefreshCw, Sparkles } from "lucide-react"

export default function AI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "مرحباً! أنا مساعد ساينتي الذكي. يمكنني مساعدتك في فهم مواضيع علوم الأحياء، شرح المفاهيم المعقدة، وحل التمارين. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (userInput) => {
    const responses = [
      "هذا سؤال ممتاز في علوم الأحياء! دعني أشرح لك المفهوم بطريقة مبسطة...",
      "بناءً على سؤالك، يمكنني أن أوضح لك أن هذا الموضوع يتعلق بـ...",
      "لفهم هذا المفهوم بشكل أفضل، دعنا نبدأ بالأساسيات...",
      "هذا موضوع مهم في منهاج البكالوريا. إليك الشرح التفصيلي...",
      "يمكنني مساعدتك في حل هذا التمرين خطوة بخطوة...",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content:
          "مرحباً! أنا مساعد ساينتي الذكي. يمكنني مساعدتك في فهم مواضيع علوم الأحياء، شرح المفاهيم المعقدة، وحل التمارين. كيف يمكنني مساعدتك اليوم؟",
        timestamp: new Date(),
      },
    ])
  }

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content)
  }

  const quickQuestions = [
    "ما هو الفرق بين الخلية النباتية والحيوانية؟",
    "شرح عملية التنفس الخلوي",
    "ما هي مراحل الانقسام الخلوي؟",
    "شرح قوانين مندل في الوراثة",
    "ما هو دور الإنزيمات في الجسم؟",
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white shadow-lg border-2 border-purple-200 mb-8">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center border-2 border-purple-800">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black gradient-text">مساعد ساينتي الذكي</h1>
                  <p className="text-gray-600 font-medium">مساعدك الشخصي في علوم الأحياء</p>
                </div>
              </div>
              <div className="flex items-center space-x-reverse space-x-4">
                <button
                  onClick={clearChat}
                  className="flex items-center px-4 py-2 bg-red-500 text-white font-medium hover:bg-red-600 transition-all border border-red-600"
                >
                  <Trash2 className="w-4 h-4 ml-2" />
                  مسح المحادثة
                </button>
                <div className="flex items-center px-4 py-2 bg-green-100 text-green-700 border border-green-300">
                  <div className="w-3 h-3 bg-green-500 ml-2"></div>
                  متصل
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg border-2 border-purple-100 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 ml-2 text-purple-600" />
                أسئلة سريعة
              </h3>
              <div className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="w-full text-right p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-medium transition-all border border-purple-200 hover:border-purple-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-lg border-2 border-purple-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">إحصائيات المحادثة</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">عدد الرسائل:</span>
                  <span className="font-bold text-purple-600">{messages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">أسئلتك:</span>
                  <span className="font-bold text-blue-600">{messages.filter((m) => m.type === "user").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">إجابات الذكي:</span>
                  <span className="font-bold text-green-600">{messages.filter((m) => m.type === "bot").length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow-lg border-2 border-purple-100 flex flex-col h-[600px]">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-start" : "justify-end"} items-start space-x-reverse space-x-3`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center border-2 ${
                        message.type === "user" ? "bg-blue-500 border-blue-600" : "bg-purple-600 border-purple-700"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-2xl p-4 border-2 ${
                        message.type === "user"
                          ? "bg-blue-50 border-blue-200 text-blue-900"
                          : "bg-purple-50 border-purple-200 text-purple-900"
                      }`}
                    >
                      <p className="text-lg leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString("ar-DZ", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <button
                          onClick={() => copyMessage(message.content)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-end items-start space-x-reverse space-x-3">
                    <div className="w-10 h-10 bg-purple-600 border-2 border-purple-700 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-purple-50 border-2 border-purple-200 p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-purple-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                      <span className="text-sm text-purple-600 mt-2 block">المساعد يكتب...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t-2 border-purple-100 p-6">
                <div className="flex space-x-reverse space-x-4">
                  <div className="flex-1">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="اكتب سؤالك هنا... (اضغط Enter للإرسال)"
                      className="w-full p-4 border-2 border-gray-200 focus:border-purple-500 focus:outline-none resize-none text-lg"
                      rows="3"
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-6 py-4 bg-gradient-to-l from-purple-600 via-purple-700 to-purple-800 text-white font-bold hover:from-purple-700 hover:to-purple-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-purple-800 flex items-center"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5 ml-2" />
                        إرسال
                      </>
                    )}
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    💡 نصيحة: يمكنك استخدام الأسئلة السريعة من الشريط الجانبي لبدء المحادثة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 shadow-lg border-2 border-purple-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 border-2 border-blue-700">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">ذكاء اصطناعي متقدم</h3>
            <p className="text-gray-600 leading-relaxed">
              مدرب على منهاج البكالوريا الجزائرية في علوم الأحياء مع قدرة على فهم الأسئلة المعقدة وتقديم إجابات دقيقة
            </p>
          </div>

          <div className="bg-white p-8 shadow-lg border-2 border-purple-100">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 border-2 border-green-700">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">شرح تفاعلي</h3>
            <p className="text-gray-600 leading-relaxed">
              يقدم شروحات مبسطة ومفصلة للمفاهيم الصعبة مع أمثلة عملية وطرق حفظ مبتكرة
            </p>
          </div>

          <div className="bg-white p-8 shadow-lg border-2 border-purple-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 border-2 border-purple-700">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">حفظ المحادثات</h3>
            <p className="text-gray-600 leading-relaxed">
              إمكانية حفظ وتصدير المحادثات المهمة للمراجعة لاحقاً أو مشاركتها مع الزملاء
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  )
}
