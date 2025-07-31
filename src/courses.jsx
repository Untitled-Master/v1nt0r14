"use client"

import { useState, useEffect } from "react"
import { ref, onValue } from "firebase/database"
import { database } from "./App"
import { Book, Crown, Search, Clock, Users, Star, Phone, Mail, MapPin } from "lucide-react"

export default function Courses({ userData }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all") // all, free, premium

  useEffect(() => {
    // Fetch courses from Firebase
    const coursesRef = ref(database, "courses")
    const unsubscribe = onValue(
      coursesRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          // Convert object to array and add keys as ids
          const coursesArray = Object.keys(data).map((key) => ({
            ...data[key],
            id: key,
          }))
          setCourses(coursesArray)
        } else {
          setCourses([])
        }
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching courses:", error)
        setError("حدث خطأ أثناء تحميل الدورات")
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  // Filter courses based on search, filter type, and user premium status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterType === "all" || (filterType === "free" && !course.premium) || (filterType === "premium" && course.premium)

    // Hide premium courses from non-premium users
    const canAccess = !course.premium || userData?.premium

    return matchesSearch && matchesFilter && canAccess
  })

  const handleCourseClick = (course) => {
    if (course.premium && !userData?.premium) {
      alert("هذه الدورة متاحة للأعضاء المميزين فقط. يرجى الترقية لحسابك للوصول إليها.")
      return
    }

    if (course.url) {
      window.open(course.url, "_blank")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-12 px-4" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Book className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">جاري تحميل الدورات...</h2>
              <p className="text-gray-600">يرجى الانتظار بينما نحضر لك أفضل المحتوى التعليمي</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-12 px-4" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Book className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-3xl font-semibold text-red-800 mb-4">خطأ في التحميل</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-all"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">الدورات</h1>
              <p className="text-gray-600 mt-2">اختر من بين {courses.length} دورة متاحة</p>
            </div>
            {userData?.premium && (
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <Crown className="w-4 h-4 ml-2" />
                عضو مميز
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">تصفية النتائج</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                <div className="relative">
                  <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن دورة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filter by Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الدورة</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">جميع الدورات</option>
                  <option value="free">مجانية</option>
                  {userData?.premium && <option value="premium">مميزة</option>}
                </select>
              </div>

              {/* Stats */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">إجمالي الدورات</span>
                    <span className="font-medium">{courses.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">دورات مجانية</span>
                    <span className="font-medium text-green-600">{courses.filter((c) => !c.premium).length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">دورات مميزة</span>
                    <span className="font-medium text-yellow-600">{courses.filter((c) => c.premium).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                عرض <span className="font-medium">{filteredCourses.length}</span> من أصل{" "}
                <span className="font-medium">{courses.length}</span> دورة
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد دورات</h3>
                <p className="text-gray-600">
                  {searchTerm || filterType !== "all"
                    ? "لم يتم العثور على دورات تطابق البحث أو الفلتر المحدد"
                    : "لا توجد دورات متاحة حالياً"}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                    onClick={() => handleCourseClick(course)}
                  >
                    {/* Course Image */}
                    <div className="relative h-48 bg-gray-200">
                      {course.img_url ? (
                        <img
                          src={course.img_url || "/placeholder.svg"}
                          alt={course.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=192&width=400&text=Course+Image"
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                          <Book className="w-12 h-12 text-purple-600" />
                        </div>
                      )}

                      {/* Premium Badge */}
                      {course.premium && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium flex items-center">
                            <Crown className="w-3 h-3 ml-1" />
                            مميز
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {course.name || "اسم الدورة غير متوفر"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {course.description || "وصف الدورة غير متوفر"}
                      </p>

                      {/* Course Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 ml-1" />
                          <span>دورة كاملة</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 ml-1" />
                          <span>متاح للجميع</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 ml-1 text-yellow-400 fill-current" />
                          <span>4.9</span>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-gray-900">
                          {course.premium ? (
                            userData?.premium ? (
                              <span className="text-green-600">متاح</span>
                            ) : (
                              <span className="text-yellow-600">مميز</span>
                            )
                          ) : (
                            <span className="text-green-600">مجاني</span>
                          )}
                        </div>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors">
                          ابدأ الآن
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Premium Upgrade CTA */}
            {!userData?.premium && (
              <div className="mt-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-8 text-white text-center">
                <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-2xl font-bold mb-2">ارتقِ لحساب مميز</h3>
                <p className="text-purple-100 mb-6">احصل على وصول كامل لجميع الدورات المميزة والمحتوى الحصري</p>
                <button className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                  ترقية الحساب - 2,500 دج/شهر
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <Book className="w-7 h-7 text-white" />
                </div>
                <div className="mr-4">
                  <span className="text-3xl font-black gradient-text">ساينتي</span>
                  <div className="text-sm text-purple-400 font-semibold -mt-1">أكاديمية العلوم</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                منصة تعليمية رائدة في تدريس علوم الأحياء لطلاب البكالوريا في الجزائر مع أحدث التقنيات التعليمية
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">روابط سريعة</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg hover:underline">
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg hover:underline">
                    الدورات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg hover:underline">
                    حولنا
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg hover:underline">
                    اتصل بنا
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">الدعم</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg hover:underline">
                    مركز المساعدة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg hover:underline">
                    الأسئلة الشائعة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg hover:underline">
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg hover:underline">
                    شروط الاستخدام
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">تواصل معنا</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 ml-3 text-purple-400" />
                  <span className="text-lg">info@scienty.dz</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 ml-3 text-purple-400" />
                  <span className="text-lg">+213 123 456 789</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 ml-3 text-purple-400" />
                  <span className="text-lg">الجزائر، الجزائر العاصمة</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-lg">&copy; 2025 ساينتي أكاديمية العلوم. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
