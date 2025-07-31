"use client"

import { useState } from "react"
import { ref, set } from "firebase/database"
import { database, auth } from "./App"
import { User, BookOpen, Target, Star, Award } from "lucide-react"

export default function UserSetup({ setUserSetupComplete }) {
  const [formData, setFormData] = useState({
    username: "",
    url: "",
    img_url: auth.currentUser?.photoURL || "",
    completed_courses: [],
    completed_exos: [],
    completed_quizes: [],
    badges: [],
    stars: 0,
    premium: false,
    streak: 0,
    ai_history: [],
    TODOLIST: [],
  })
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userId = auth.currentUser.uid
      const userRef = ref(database, `users/${userId}`)

      const userData = {
        ...formData,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }

      await set(userRef, userData)
      localStorage.setItem(`setup_${userId}`, "true")
      setUserSetupComplete(true)
    } catch (error) {
      console.error("Error saving user data:", error)
      alert("حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-12 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-3xl flex items-center justify-center shadow-2xl">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">إعداد ملفك الشخصي</h1>
          <p className="text-gray-600 text-lg">دعنا نتعرف عليك أكثر لتخصيص تجربتك التعليمية</p>

          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-purple-600">الخطوة {step} من 3</span>
              <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">المعلومات الأساسية</h2>
                  <p className="text-gray-600">أخبرنا عن نفسك</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المستخدم *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="اختر اسم مستخدم فريد"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الرابط الشخصي (اختياري)</label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    رابط الصورة الشخصية (اختياري)
                  </label>
                  <input
                    type="url"
                    name="img_url"
                    value={formData.img_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="رابط صورتك الشخصية"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Preferences */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">أهدافك التعليمية</h2>
                  <p className="text-gray-600">ما الذي تريد تحقيقه؟</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-all cursor-pointer">
                    <div className="flex items-center">
                      <BookOpen className="w-6 h-6 text-purple-600 ml-3" />
                      <div>
                        <h3 className="font-semibold text-gray-800">تحسين الدرجات</h3>
                        <p className="text-sm text-gray-600">الحصول على درجات أفضل في الامتحانات</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-all cursor-pointer">
                    <div className="flex items-center">
                      <Award className="w-6 h-6 text-purple-600 ml-3" />
                      <div>
                        <h3 className="font-semibold text-gray-800">النجاح في البكالوريا</h3>
                        <p className="text-sm text-gray-600">التحضير الشامل لامتحان البكالوريا</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="premium"
                      checked={formData.premium}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="mr-3 text-gray-700 font-medium">
                      أريد الاشتراك في الخطة المميزة (يمكنك تغيير هذا لاحقاً)
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">مراجعة البيانات</h2>
                  <p className="text-gray-600">تأكد من صحة المعلومات قبل المتابعة</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">اسم المستخدم:</span>
                    <span className="text-gray-900">{formData.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">البريد الإلكتروني:</span>
                    <span className="text-gray-900">{auth.currentUser?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">الخطة:</span>
                    <span className={`font-semibold ${formData.premium ? "text-purple-600" : "text-green-600"}`}>
                      {formData.premium ? "مميزة" : "مجانية"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                السابق
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={step === 1 && !formData.username}
                  className="px-6 py-3 bg-gradient-to-l from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-l from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      جاري الحفظ...
                    </>
                  ) : (
                    "🎉 إنهاء الإعداد"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
