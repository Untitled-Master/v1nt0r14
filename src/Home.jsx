
"use client"

import { useState } from "react"
import {
  Book,
  Play,
  Users,
  Award,
  Star,
  CheckCircle,
  Menu,
  X,
  Clock,
  Crown,
  Zap,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const courses = [
    {
      id: 1,
      title: "علم الأحياء الجزيئي",
      description: "دراسة شاملة للجزيئات الحيوية والعمليات الخلوية مع تطبيقات عملية ومحاكاة تفاعلية",
      duration: "12 أسبوع",
      students: 245,
      rating: 4.9,
      price: "15,000 دج",
      image: "🧬",
      lessons: 24,
      level: "متقدم",
    },
    {
      id: 2,
      title: "علم وظائف الأعضاء",
      description: "فهم عميق لوظائف أجهزة الجسم المختلفة مع دراسة حالات طبية واقعية",
      duration: "10 أسابيع",
      students: 189,
      rating: 4.8,
      price: "12,000 دج",
      image: "❤️",
      lessons: 20,
      level: "متوسط",
    },
    {
      id: 3,
      title: "علم الوراثة والتطور",
      description: "استكشاف قوانين الوراثة ونظريات التطور مع أمثلة من الطبيعة",
      duration: "8 أسابيع",
      students: 156,
      rating: 4.9,
      price: "10,000 دج",
      image: "🧪",
      lessons: 16,
      level: "أساسي",
    },
  ]

  const features = [
    {
      icon: <Play className="w-7 h-7" />,
      title: "تجارب فيديو تفاعلية",
      description: "محتوى مرئي عالي الجودة 4K مع أمثلة عملية وتجارب محاكاة ثلاثية الأبعاد",
    },
    {
      icon: <Book className="w-7 h-7" />,
      title: "مناهج محدثة",
      description: "مطابقة تماماً لمنهاج البكالوريا الجزائرية الجديد مع آخر التحديثات",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "دعم مباشر",
      description: "تواصل مع المدرسين المختصين والطلاب المتفوقين على مدار الساعة",
    }
  ]

  const stats = [
    { number: "2,450+", label: "طالب نجح", icon: "🎓" },
    { number: "98%", label: "معدل النجاح", icon: "📈" },
    { number: "120+", label: "درس تفاعلي", icon: "📚" },
    { number: "24/7", label: "دعم فني", icon: "🛠️" },
  ]

  const testimonials = [
    {
      name: "أحمد بن علي",
      grade: "بكالوريا 2024",
      score: "18.5/20",
      text: "بفضل ساينتي حصلت على معدل ممتاز في علوم الطبيعة والحياة. الدروس واضحة والأساتذة محترفون.",
      avatar: "👨‍🎓",
    },
    {
      name: "فاطمة الزهراء",
      grade: "بكالوريا 2024",
      score: "19/20",
      text: "المنصة ساعدتني كثيراً في فهم المفاهيم الصعبة. أنصح كل طالب بالانضمام لساينتي.",
      avatar: "👩‍🎓",
    },
    {
      name: "محمد الأمين",
      grade: "بكالوريا 2024",
      score: "17.8/20",
      text: "التطبيق سهل الاستخدام والمحتوى غني ومفيد. شكراً لفريق ساينتي على الجهود المبذولة.",
      avatar: "👨‍🎓",
    },
  ]

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Google Fonts for Arabic */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&display=swap"
        rel="stylesheet"
      />

      <style jsx>{`
        * {
          font-family: 'Cairo', 'Tajawal', 'Noto Sans Arabic', system-ui, -apple-system, sans-serif;
        }
        
        .font-arabic {
          font-family: 'Cairo', 'Tajawal', 'Noto Sans Arabic', system-ui, -apple-system, sans-serif;
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.3); }
          50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.6); }
        }
      `}</style>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-br from-purple-50 via-white to-purple-100 py-24 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-right space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-black text-gray-900 leading-tight text-shadow">
                  أتقن علوم
                  <span className="gradient-text block">الأحياء</span>
                  <span className="text-5xl lg:text-6xl">واضمن نجاحك</span>
                </h1>
                <p className="text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                  منصة تعليمية متخصصة في علوم الأحياء لطلاب البكالوريا في الجزائر.
                  <span className="text-purple-700 font-bold"> دروس تفاعلية، أساتذة محترفون، ونتائج مضمونة.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button className="bg-gradient-to-l from-purple-600 via-purple-700 to-purple-800 text-white px-10 py-5 rounded-full text-xl font-bold hover:from-purple-700 hover:to-purple-900 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25">
                  🚀 ابدأ رحلتك الآن
                </button>
                <button className="border-3 border-purple-300 text-purple-700 px-10 py-5 rounded-full text-xl font-bold hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-lg">
                  📺 شاهد عرض تجريبي
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-reverse space-x-8 pt-4">
                <div className="flex items-center space-x-reverse space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">
                      أ
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">
                      م
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">
                      ف
                    </div>
                  </div>
                  <span className="text-gray-600 font-semibold mr-3">+2,450 طالب نجح معنا</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="floating-animation">
                <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 rounded-3xl p-10 transform rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <div className="text-8xl mb-6 text-center">🧬</div>
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">ملخصات دروس</h3>
                    <p className="text-gray-600 text-center text-lg mb-6">تعلم بطريقة عملية وممتعة مع أحدث التقنيات</p>
                    <div className="flex justify-center">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-lg font-bold flex items-center">
                        <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
                        جاري البحث عن أفضل الملخصات...
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl animate-bounce shadow-lg">
                ⭐
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-xl animate-pulse shadow-lg">
                🎯
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-3 gradient-text">{stat.number}</h3>
                <p className="text-gray-700 font-bold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6 text-shadow">لماذا تختار ساينتي؟</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              نوفر لك أفضل تجربة تعليمية في علوم الأحياء مع أحدث الطرق والتقنيات التعليمية المبتكرة
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-4 card-hover border border-purple-100 hover:border-purple-300"
              >
                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6 text-shadow">دوراتنا المميزة</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              اختر من بين مجموعة واسعة من الدورات المصممة خصيصاً لطلاب البكالوريا مع أحدث المناهج
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-purple-100 hover:border-purple-300 card-hover"
              >
                <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="text-8xl mb-6 relative z-10">{course.image}</div>
                  <h3 className="text-2xl font-bold text-gray-900 relative z-10">{course.title}</h3>
                  <div className="mt-4 inline-block bg-white/90 text-purple-700 px-4 py-2 rounded-full text-sm font-bold relative z-10">
                    {course.level}
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">{course.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 ml-2 text-purple-600" />
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 ml-2 text-purple-600" />
                      <span className="font-semibold">{course.students} طالب</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Book className="w-5 h-5 ml-2 text-purple-600" />
                      <span className="font-semibold">{course.lessons} درس</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star className="w-5 h-5 ml-2 text-yellow-500 fill-current" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-3xl font-black gradient-text">{course.price}</div>
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                      متاح الآن
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-l from-purple-600 via-purple-700 to-purple-800 text-white py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    🎓 سجل الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6 text-shadow">قصص نجاح طلابنا</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              اكتشف كيف ساعدت ساينتي آلاف الطلاب في تحقيق أحلامهم والحصول على أفضل النتائج
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 card-hover border border-purple-100 hover:border-purple-300"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl ml-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-purple-600 font-semibold">{testimonial.grade}</p>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold mt-1 inline-block">
                      {testimonial.score}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg italic">"{testimonial.text}"</p>
                <div className="flex justify-center mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6 text-shadow">اختر الخطة التي تناسبك</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              نوفر لك خيارات متنوعة للتعلم حسب احتياجاتك وإمكانياتك مع ضمان أفضل جودة تعليمية
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-10 border-2 border-gray-200 hover:border-green-300 card-hover">
              <div className="text-center mb-10">
                <div className="bg-gradient-to-br from-green-100 via-green-200 to-green-300 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Zap className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">الخطة المجانية</h3>
                <div className="text-5xl font-black text-green-600 mb-4">مجاناً</div>
                <p className="text-gray-600 text-lg">ابدأ رحلتك التعليمية بلا تكلفة</p>
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">3 دروس مجانية في كل مادة</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">محتوى نظري أساسي</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">اختبارات قصيرة</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">دعم المجتمع</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">ملخصات أساسية</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-l from-green-500 via-green-600 to-green-700 text-white py-5 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                🚀 ابدأ مجاناً
              </button>
            </div>

            {/* Premium Tier */}
            <div className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-10 border-3 border-purple-300 relative overflow-hidden card-hover">
              {/* Premium Badge */}
              <div className="absolute top-0 left-0 bg-gradient-to-l from-purple-600 via-purple-700 to-purple-800 text-white px-8 py-4 rounded-br-3xl shadow-lg">
                <div className="flex items-center">
                  <Crown className="w-5 h-5 ml-2" />
                  <span className="font-bold text-lg">الأكثر شعبية</span>
                </div>
              </div>

              <div className="text-center mb-10 mt-8">
                <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg pulse-glow">
                  <Crown className="w-10 h-10 text-purple-700" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">الخطة المميزة</h3>
                <div className="text-5xl font-black gradient-text mb-4">
                  2,500 دج<span className="text-2xl text-gray-500">/شهر</span>
                </div>
                <p className="text-gray-600 text-lg">الحل الشامل لضمان نجاحك</p>
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-purple-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">جميع الدروس والمحاضرات</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-purple-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">فيديوهات تفاعلية عالية الجودة 4K</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-purple-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">اختبارات شاملة ومحاكاة امتحانات</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-purple-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">دعم مباشر من الأساتذة 24/7</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-purple-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">ملخصات مفصلة وخرائط ذهنية</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-purple-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">جلسات مراجعة مباشرة</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-purple-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">شهادة إتمام معتمدة</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-purple-500 ml-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg font-medium">تطبيق موبايل حصري</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-l from-purple-600 via-purple-700 to-purple-800 text-white py-5 rounded-2xl text-xl font-bold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 shadow-xl">
                👑 اشترك الآن
              </button>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center bg-green-50 text-green-700 px-8 py-4 rounded-full border-2 border-green-200 shadow-lg">
              <CheckCircle className="w-6 h-6 ml-3" />
              <span className="font-bold text-lg">ضمان استرداد المال خلال 30 يوم - بدون أسئلة</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 text-shadow">
            استعد لبكالوريا ناجحة في علوم الأحياء
          </h2>
          <p className="text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            انضم إلى آلاف الطلاب الذين حققوا النجاح معنا. ابدأ رحلتك اليوم واضمن مستقبلاً مشرقاً في عالم العلوم
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-purple-700 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              🎓 ابدأ التعلم مجاناً
            </button>
            <button className="border-3 border-white text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-purple-700 transition-all duration-300 shadow-xl">
              💬 تحدث مع مستشار
            </button>
          </div>
        </div>
      </section>

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
