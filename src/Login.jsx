"use client"

import { useState } from "react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "./App"
import { Book, Mail, Shield, Users } from "lucide-react"

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if user setup is complete
      const setupComplete = localStorage.getItem(`setup_${user.uid}`)

      if (setupComplete) {
        // Existing user - redirect to courses
        window.location.href = "/courses"
      } else {
        // New user - redirect to setup
        window.location.href = "/setup"
      }
    } catch (error) {
      setError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.")
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-3xl flex items-center justify-center shadow-2xl pulse-glow">
              <Book className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">مرحباً بك في ساينتي</h1>
          <p className="text-gray-600 text-lg">سجل دخولك لبدء رحلتك التعليمية</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
          <div className="space-y-6">
            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-700">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center ml-3">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium">انضم لأكثر من 2,450 طالب</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center ml-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium">حساب آمن ومحمي</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center ml-3">
                  <Book className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium">وصول لجميع الدورات</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">{error}</div>
            )}

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-reverse space-x-3"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin ml-3"></div>
                  <span>جاري تسجيل الدخول...</span>
                </div>
              ) : (
                <>
                  <Mail className="w-6 h-6 text-red-500" />
                  <span>تسجيل الدخول بـ Gmail</span>
                </>
              )}
            </button>

            {/* Terms */}
            <p className="text-center text-sm text-gray-500 leading-relaxed">
              بتسجيل الدخول، أنت توافق على
              <a href="#" className="text-purple-600 hover:underline mx-1">
                شروط الاستخدام
              </a>
              و
              <a href="#" className="text-purple-600 hover:underline mx-1">
                سياسة الخصوصية
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
            <h3 className="font-semibold text-gray-800 mb-2">لماذا تحتاج حساب؟</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              لحفظ تقدمك، الوصول للدورات المتقدمة، والحصول على شهادات إتمام معتمدة
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
