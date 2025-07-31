"use client"

import { useState, useEffect } from "react"
import { ref, onValue, update } from "firebase/database"
import { signOut } from "firebase/auth"
import { database, auth } from "./App"
import { useNavigate } from "react-router-dom"
import {
  User,
  Mail,
  BookOpen,
  Target,
  Crown,
  Calendar,
  Settings,
  Edit3,
  Save,
  X,
  Camera,
  Link,
  Star,
  Trophy,
  Zap,
  CheckCircle,
  Plus,
  Trash2,
} from "lucide-react"

export default function Profile() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [newTodo, setNewTodo] = useState("")
  const [showAddTodo, setShowAddTodo] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = ref(database, `users/${auth.currentUser.uid}`)
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setUserData(data)
          setEditData({
            username: data.username || "",
            url: data.url || "",
            img_url: data.img_url || "",
          })
        }
        setLoading(false)
      })

      return () => unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleSaveEdit = async () => {
    try {
      const userRef = ref(database, `users/${auth.currentUser.uid}`)
      await update(userRef, editData)
      setEditing(false)
    } catch (error) {
      console.error("Update error:", error)
      alert("حدث خطأ أثناء حفظ التغييرات")
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        const userRef = ref(database, `users/${auth.currentUser.uid}`)
        const updatedTodos = [...(userData.TODOLIST || []), newTodo.trim()]
        await update(userRef, { TODOLIST: updatedTodos })
        setNewTodo("")
        setShowAddTodo(false)
      } catch (error) {
        console.error("Error adding todo:", error)
      }
    }
  }

  const handleRemoveTodo = async (index) => {
    try {
      const userRef = ref(database, `users/${auth.currentUser.uid}`)
      const updatedTodos = userData.TODOLIST.filter((_, i) => i !== index)
      await update(userRef, { TODOLIST: updatedTodos })
    } catch (error) {
      console.error("Error removing todo:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">جاري تحميل الملف الشخصي...</h2>
          <p className="text-gray-600">يرجى الانتظار بينما نحضر بياناتك</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">لم يتم العثور على بيانات المستخدم</h2>
          <p className="text-gray-600 mb-8">يبدو أنك بحاجة لإعداد ملفك الشخصي أولاً</p>
          <button
            onClick={() => navigate("/setup")}
            className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            إعداد الملف الشخصي
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">الملف الشخصي</h1>
            <p className="text-gray-600 text-lg">إدارة معلوماتك الشخصية وتتبع تقدمك</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 mb-12 relative">
          {/* Cover with Pattern - Behind everything */}
          <div className="h-48 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 to-transparent"></div>

            {/* Premium Badge - On cover */}
            <div className="absolute top-6 left-6 z-10">
              {userData.premium && (
                <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                  <Crown className="w-4 h-4 ml-1" />
                  عضو مميز
                </div>
              )}
            </div>

            {/* Edit Buttons - On cover */}
            <div className="absolute top-6 right-6 z-10">
              <div className="flex space-x-reverse space-x-3">
                {editing ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info - Above cover with proper z-index */}
          <div className="px-8 pb-8 relative z-20">
            <div className="flex flex-col lg:flex-row items-start lg:items-end -mt-20 mb-8">
              <div className="relative mb-6 lg:mb-0 z-30">
                <div className="w-40 h-40 bg-white rounded-3xl border-4 border-white shadow-2xl overflow-hidden">
                  {userData.img_url ? (
                    <img
                      src={userData.img_url || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                      <User className="w-20 h-20 text-white" />
                    </div>
                  )}
                </div>
                {editing && (
                  <button className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-all z-40">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="lg:mr-8 flex-1 relative z-30">
                <div className="mb-4">
                  {editing ? (
                    <input
                      type="text"
                      name="username"
                      value={editData.username}
                      onChange={handleEditChange}
                      className="text-4xl font-bold text-gray-900 bg-white border-2 border-gray-200 rounded-2xl px-4 py-2 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                      placeholder="اسم المستخدم"
                    />
                  ) : (
                    <h1 className="text-4xl font-bold text-gray-900 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block shadow-sm">
                      {userData.username}
                    </h1>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center text-gray-600 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
                    <Mail className="w-5 h-5 ml-2" />
                    <span className="font-medium">{userData.email}</span>
                  </div>
                  <div className="flex items-center text-purple-600 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
                    <Calendar className="w-5 h-5 ml-2" />
                    <span className="font-medium">
                      انضم في {new Date(userData.createdAt).toLocaleDateString("ar-DZ")}
                    </span>
                  </div>
                  {userData.stars > 0 && (
                    <div className="flex items-center text-yellow-600 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
                      <Star className="w-5 h-5 ml-2" />
                      <span className="font-medium">{userData.stars} نجمة</span>
                    </div>
                  )}
                </div>

                {userData.url && (
                  <div className="mb-4">
                    {editing ? (
                      <input
                        type="url"
                        name="url"
                        value={editData.url}
                        onChange={handleEditChange}
                        className="text-purple-600 bg-white border-2 border-gray-200 rounded-2xl px-4 py-2 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                        placeholder="الرابط الشخصي"
                      />
                    ) : (
                      <a
                        href={userData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium hover:underline bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl transition-all shadow-sm"
                      >
                        <Link className="w-4 h-4 ml-2" />
                        {userData.url}
                      </a>
                    )}
                  </div>
                )}

                {editing && (
                  <div className="mb-4">
                    <input
                      type="url"
                      name="img_url"
                      value={editData.img_url}
                      onChange={handleEditChange}
                      className="text-gray-600 bg-white border-2 border-gray-200 rounded-2xl px-4 py-2 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                      placeholder="رابط الصورة الشخصية"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 card-hover">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl font-black gradient-text">{userData.completed_courses?.length || 0}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">الدورات المكتملة</h3>
            <p className="text-gray-600">دورة تم إنجازها بنجاح</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 card-hover">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl font-black text-green-600">{userData.completed_exos?.length || 0}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">التمارين المحلولة</h3>
            <p className="text-gray-600">تمرين تم حله بنجاح</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 card-hover">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl font-black text-purple-600">{userData.badges?.length || 0}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">الشارات المحققة</h3>
            <p className="text-gray-600">إنجاز تم تحقيقه</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 card-hover">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl font-black text-orange-600">{userData.streak || 0}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">أيام متتالية</h3>
            <p className="text-gray-600">يوم من التعلم المستمر</p>
          </div>
        </div>

        {/* Additional Info Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center ml-3">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              النشاط الأخير
            </h3>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-green-50 rounded-2xl">
                <div className="w-3 h-3 bg-green-500 rounded-full ml-4"></div>
                <div>
                  <div className="font-semibold text-gray-800">تم إنشاء الحساب</div>
                  <div className="text-gray-600 text-sm">
                    {new Date(userData.createdAt).toLocaleDateString("ar-DZ")}
                  </div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-2xl">
                <div className="w-3 h-3 bg-blue-500 rounded-full ml-4"></div>
                <div>
                  <div className="font-semibold text-gray-800">آخر تسجيل دخول</div>
                  <div className="text-gray-600 text-sm">
                    {new Date(userData.lastLogin).toLocaleDateString("ar-DZ")}
                  </div>
                </div>
              </div>
              {userData.completed_courses?.length > 0 && (
                <div className="flex items-center p-4 bg-purple-50 rounded-2xl">
                  <div className="w-3 h-3 bg-purple-500 rounded-full ml-4"></div>
                  <div>
                    <div className="font-semibold text-gray-800">آخر دورة مكتملة</div>
                    <div className="text-gray-600 text-sm">منذ أسبوع</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Todo List */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center ml-3">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                قائمة المهام
              </h3>
              <button
                onClick={() => setShowAddTodo(!showAddTodo)}
                className="bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition-all transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {showAddTodo && (
              <div className="mb-6 p-4 bg-purple-50 rounded-2xl">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="أضف مهمة جديدة..."
                    className="flex-1 px-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
                  />
                  <button
                    onClick={handleAddTodo}
                    className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-all"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {userData.TODOLIST && userData.TODOLIST.length > 0 ? (
                userData.TODOLIST.map((todo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full ml-4"></div>
                      <span className="text-gray-800 font-medium">{todo}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveTodo(index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">لا توجد مهام حالياً</p>
                  <p className="text-gray-400 text-sm mt-1">أضف مهمة جديدة لتبدأ التنظيم</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Premium Upgrade CTA - Only show to non-premium users */}
        {!userData.premium && (
          <div className="mt-12 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 to-transparent"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
              <h3 className="text-3xl font-bold mb-4">ارتقِ لحساب مميز</h3>
              <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                احصل على وصول كامل لجميع الدورات، محتوى حصري، ودعم مباشر من الأساتذة
              </p>
              <button className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl">
                ترقية الحساب الآن
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
